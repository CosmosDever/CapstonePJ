import pandas as pd
import yfinance as yf
import numpy as np
import talib as ta
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import classification_report, mean_squared_error
from sklearn.impute import SimpleImputer
import sklearn.mixture as mix
from flask import Flask, jsonify
import datetime

import pandas as pd
import yfinance as yf
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import talib as ta
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
import graphviz
from sklearn.metrics import classification_report
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeRegressor
import sys
from sklearn import tree
import graphviz
import re
import datetime
import pandas_datareader as web
import sklearn.mixture as mix
import scipy.stats as scs
import datetime as dt
import matplotlib as mpl
from matplotlib import cm
import matplotlib.pyplot as plt
from matplotlib.dates import YearLocator, MonthLocator
import seaborn as sns
import warnings

from flask import Flask, jsonify
# Load and prepare data
def load_data_dt(ticker='BTC-USD'):
    df_dt = yf.Ticker(ticker).history(period="max")
    df_dt['Settle'] = (df_dt['High'] + df_dt['Low']) * 100
    return df_dt


def prepare_features(df_dt):
    # Define the time periods for the indicators
    time_periods = {
        'ATR': 14,
        'ADX': 14,
        'RSI': 14,
        'SMA': 30
    }
    # Create features using TA-Lib
    df_dt['ATR'] = ta.ATR(df_dt['High'].values, df_dt['Low'].values, df_dt['Settle'].values, timeperiod=time_periods['ATR'])
    df_dt['ADX'] = ta.ADX(df_dt['High'].values, df_dt['Low'].values, df_dt['Settle'].values, timeperiod=time_periods['ADX'])
    df_dt['RSI'] = ta.RSI(df_dt['Settle'].values, timeperiod=time_periods['RSI'])
    df_dt['SMA'] = ta.SMA(df_dt['Settle'].values, timeperiod=time_periods['SMA'])
    df_dt['EMA12'] = ta.EMA(df_dt['Settle'].values, timeperiod=12)
    df_dt['EMA26'] = ta.EMA(df_dt['Settle'].values, timeperiod=26)
    df_dt['MA12'] = ta.MA(df_dt['Settle'].values, timeperiod=12)
    df_dt['MA26'] = ta.MA(df_dt['Settle'].values, timeperiod=26)
    
    # Create target
    df_dt['Return'] = df_dt['Settle'].pct_change(1).shift(-1)
    df_dt['target_cls'] = np.where(df_dt['Return'] > 0, 1, -1)
    df_dt['target_rgs'] = df_dt['Return']

    macd, macdsignal, macdhist = ta.MACD(df_dt['Settle'].values, fastperiod=12, slowperiod=26, signalperiod=9)
    df_dt['MACD'] = macd
    df_dt['MACDsignal'] = macdsignal
    df_dt['MACDhist'] = macdhist
    df_dt['ClgtMA12'] = np.where(df_dt['Settle'] > df_dt['MA12'], 1, -1)
    df_dt['ClgtMA26'] = np.where(df_dt['Settle'] > df_dt['MA26'], 1, -1)
    df_dt['ClgtEMA12'] = np.where(df_dt['Settle'] > df_dt['EMA12'], 1, -1)
    df_dt['ClgtEMA26'] = np.where(df_dt['Settle'] > df_dt['EMA26'], 1, -1)
    df_dt['MACDSIGgtMACD'] = np.where(df_dt['MACDsignal'] > df_dt['MACD'], 1, -1)

    df_dt['Return'] = df_dt['Settle'].pct_change(1).shift(-1)
    df_dt['target_cls'] = np.where(df_dt.Return > 0, 1, -1)
    df_dt['target_rgs'] = df_dt['Return']
    return df_dt


def train_decision_tree2(df_dt):
    predictors_list = ['ATR', 'ADX', 'RSI', 'ClgtEMA12', 'ClgtEMA26', 'MACDSIGgtMACD', 'MA12', 'MA26', 'SMA']
    tmp = df_dt[predictors_list]
    tmp = tmp.fillna(0)
    highest_non_inf = tmp.max().loc[lambda v: v<np.inf].max()
    tmp.replace(np.Inf, highest_non_inf)
    predictors_list = ['ATR', 'ADX', 'RSI', 'ClgtEMA12', 'ClgtEMA26', 'MACDSIGgtMACD', 'MA12', 'MA26', 'SMA']
    X = tmp[predictors_list]
    y_cls = df_dt.target_cls 
    y_rgs = df_dt.target_rgs
    y = y_cls
    X_cls_train, X_cls_test, y_cls_train, y_cls_test = train_test_split(X, y, test_size=0.3, random_state=432, stratify=y)
    train_length = int(len(df_dt)*0.70)
    X_rgs_train = X[:train_length]
    X_rgs_test = X[train_length:]
    y_rgs_train = y_rgs[:train_length]
    y_rgs_test = y_rgs[train_length:]
    
    clf = DecisionTreeClassifier(criterion='gini', max_depth=3, min_samples_leaf=6)

    clf = clf.fit(X_cls_train, y_cls_train)

    dot_data = tree.export_graphviz(clf, out_file=None, filled=True, feature_names=predictors_list)

    y_cls_pred = clf.predict(X_cls_test)

    report = classification_report(y_cls_test, y_cls_pred)

    my_imputer = SimpleImputer()
    X_rgs_train_with_imputed_values = my_imputer.fit_transform(X_rgs_train)
    X_rgs_train1=np.array(X_rgs_train)

    X_rgs_train.head()
    X_rgs_train.isin([np.inf, -np.inf]).values.any()

    dtr = DecisionTreeRegressor(min_samples_leaf = 200)

    np.all(X_rgs_train>sys.float_info.max)

    def limitcomma(value, limit=2):
       v = str(value).split(".")
       if len(v) > 1:
          return float(v[0] + "." + v[1][:limit])
       else:
          return float("0.0")

    y_rgs_train2 = y_rgs_train.copy()  # Create a copy to avoid modifying the original DataFrame
    for i in range(1780):
      y_rgs_train2.iloc[i] = limitcomma(y_rgs_train.iloc[i])

# Find indices of rows with finite values in both X_rgs_train and y_rgs_train2
    finite_indices = np.isfinite(X_rgs_train).all(axis=1) & np.isfinite(y_rgs_train2)

# Filter out rows with finite values
    X_rgs_train_filtered = X_rgs_train[finite_indices]
    y_rgs_train2_filtered = y_rgs_train2[finite_indices]

# Fit the model with the filtered data
    dtr.fit(X_rgs_train_filtered, y_rgs_train2_filtered)

    dot_data = tree.export_graphviz(dtr,
                  out_file=None,
                  filled=True,
                  feature_names=predictors_list)
    graphviz.Source(dot_data)
    return dot_data

def consider_dt(train_dt):
     # Define a regular expression pattern to extract the values
     pattern = r'(.+?) <= (.+?)",'

     # Find all matches of the pattern in the input DOT data
     matches = re.findall(pattern, train_dt)

     # Print the extracted values
     filtered_conditions = [matches for matches in matches if 'squared_error' not in matches]

     # Define a regular expression pattern to extract the values
     # Define a regular expression pattern to extract the values
     pattern = r'label="(.+?) <= (.+?)\\n'

     # Find all matches of the pattern in the input DOT data
     matches = re.findall(pattern, train_dt)

     # Initialize a dictionary to store the unique conditions and their corresponding values
     unique_conditions = {}

     # Iterate through the matches
     for match in matches:
          # Extract condition and value
          condition, value = match
          # Remove leading and trailing whitespace
          condition = condition.strip()
          value = value.strip()
          # Convert value to float
          value = float(value)
          # Update unique_conditions dictionary
          if condition not in unique_conditions:
               unique_conditions[condition] = value
          else:
               unique_conditions[condition] = min(unique_conditions[condition], value)

     # Convert the dictionary back to a list of conditions
     filtered_conditions = [f"{condition} <= {value}" for condition, value in unique_conditions.items()]
     return filtered_conditions

def find_lowest_value(conditions):
    # แยกค่าเงื่อนไข
    criteria = {}
    for condition in conditions:
        # แยก condition ตาม '<='
        indicator, value = condition.split(' <= ')
        criteria[indicator] = float(value)
    
    # หา indicator ที่มีค่าเกณฑ์น้อยที่สุด
    lowest_value_indicator = None
    lowest_value = float('inf')
    
    # ตรวจสอบค่าเงื่อนไขและหาค่าน้อยที่สุด
    for indicator, value in criteria.items():
        # เปรียบเทียบค่าและบันทึกค่าเกณฑ์น้อยที่สุด
        if value < lowest_value:
            lowest_value = value
            lowest_value_indicator = indicator
                
    return lowest_value_indicator, lowest_value

# print(load_data_dt())
# print(prepare_features(load_data_dt()))
train_dt = train_decision_tree2(prepare_features(load_data_dt()))
consider = consider_dt(train_dt)
print(find_lowest_value(consider))