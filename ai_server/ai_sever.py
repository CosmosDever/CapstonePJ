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
from flask import Flask, jsonify , request
import requests
import time


# Load data
ticker = "BTC-USD"
df = yf.Ticker(ticker).history(period="max")

# Create target
df['Settle'] = (df['High'] + df['Low']) * 100

# Define the time periods for the indicators
time_period_ATR = 14
time_period_ADX = 14
time_period_RSI = 14
time_period_SMA = 30



# Create features
df['EMA12'] = ta.EMA(df['Settle'].values, timeperiod=12)
df['EMA26'] = ta.EMA(df['Settle'].values, timeperiod=26)
df['MA12'] = ta.MA(df['Settle'].values, timeperiod=12)
df['MA26'] = ta.MA(df['Settle'].values, timeperiod=26)
df['ATR'] = ta.ATR(df['High'].values, df['Low'].values, df['Settle'].values, timeperiod=time_period_ATR) # 1
df['ADX'] = ta.ADX(df['High'].values, df['Low'].values, df['Settle'].values, timeperiod=time_period_ADX) # 2
df['RSI'] = ta.RSI(df['Settle'].values, timeperiod=time_period_ADX) # 3
df['SMA'] = ta.SMA(df['Settle'].values, timeperiod=time_period_SMA) # 4
macd, macdsignal, macdhist = ta.MACD(df['Settle'].values, fastperiod=12, slowperiod=26, signalperiod=9)
df['MACD'] = macd
df['MACDsignal'] = macdsignal
df['MACDhist'] = macdhist
df['ClgtMA12'] = np.where(df['Settle'] > df['MA12'], 1, -1)
df['ClgtMA26'] = np.where(df['Settle'] > df['MA26'], 1, -1)
df['ClgtEMA12'] = np.where(df['Settle'] > df['EMA12'], 1, -1)
df['ClgtEMA26'] = np.where(df['Settle'] > df['EMA26'], 1, -1)
df['MACDSIGgtMACD'] = np.where(df['MACDsignal'] > df['MACD'], 1, -1)

# Create target
df['Return'] = df['Settle'].pct_change(1).shift(-1)
df['target_cls'] = np.where(df.Return > 0, 1, -1)
df['target_rgs'] = df['Return']

# Split data
predictors_list = ['ATR', 'ADX', 'RSI', 'ClgtEMA12', 'ClgtEMA26', 'MACDSIGgtMACD', 'MA12', 'MA26', 'SMA']
tmp = df[predictors_list]
tmp = tmp.fillna(0)
highest_non_inf = tmp.max().loc[lambda v: v<np.inf].max()
tmp.replace(np.Inf, highest_non_inf)

predictors_list = ['ATR', 'ADX', 'RSI', 'ClgtEMA12', 'ClgtEMA26', 'MACDSIGgtMACD', 'MA12', 'MA26', 'SMA']
X = tmp[predictors_list]

y_cls = df.target_cls 
y_rgs = df.target_rgs

y = y_cls
X_cls_train, X_cls_test, y_cls_train, y_cls_test = train_test_split(X, y, test_size=0.3, random_state=432, stratify=y)

train_length = int(len(df)*0.70)
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

############################################################################################################

#print(dot_data)


# Define a regular expression pattern to extract the values
pattern = r'(.+?) <= (.+?)",'

# Find all matches of the pattern in the input DOT data
matches = re.findall(pattern, dot_data)

# Print the extracted values
filtered_conditions = [matches for matches in matches if 'squared_error' not in matches]

# Define a regular expression pattern to extract the values
# Define a regular expression pattern to extract the values
pattern = r'label="(.+?) <= (.+?)\\n'

# Find all matches of the pattern in the input DOT data
matches = re.findall(pattern, dot_data)

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

# Print the filtered list
# print(filtered_conditions)
criteria = {}
for condition in filtered_conditions:
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

# กำหนด filtered_conditions ตามค่าเกณฑ์น้อยที่สุดที่พบ
filtered_conditions = [f"{lowest_value_indicator} <= {lowest_value:.2f}"]

# แสดงผลตัวบ่งชี้และค่าเกณฑ์น้อยที่สุด
# print("filtered_conditions:", filtered_conditions)

df_filtered = df[df.eval('|'.join(filtered_conditions))]

# # แสดง DataFrame ที่ผ่านการกรอง
# print(df_filtered)

############################################################################################################
#
df["Returns"] = df["Close"].pct_change()
df["range"] = (df["High"]/df["Low"])-1
df = df.dropna()

#create train and test sets
#this methodology will randomly select 80% of our data

msk = np.random.rand(len(df)) < 0.8
train = df[msk]
test = df[~msk]

X_train = train[[ "Returns", "range", "Close"]]
X_test = test[[ "Returns", "range", "Close"]]

model = mix.GaussianMixture(n_components=3, 
                            covariance_type="full", 
                            n_init=100, 
                            random_state=7).fit(X_train)

# Predict the optimal sequence of internal hidden state
hidden_states = model.predict(X_test)

# print("Means and vars of each hidden state")
# for i in range(model.n_components):
#     print("{0}th hidden state".format(i))
#     print("mean = ", model.means_[i])
#     print("var = ", np.diag(model.covariances_[i]))
#     print()

sns.set(font_scale=1.25)
# style_kwds = {'xtick.major.size': 3, 'ytick.major.size': 4,
#               'font.family':u'courier prime code', 'legend.frameon': True}
# sns.set_style('white', style_kwds)

fig, axs = plt.subplots(model.n_components, sharex=True, sharey=True, figsize=(12,9))
colors = cm.rainbow(np.linspace(0, 1, model.n_components))

for i, (ax, color) in enumerate(zip(axs, colors)):
    # Use fancy indexing to plot data in each state.
    mask = hidden_states == i
    ax.plot_date(X_test.index.values[mask],
                 X_test["Close"].values[mask],
                 ".-", c=color)
    ax.set_title("{0}th hidden state".format(i), fontsize=16, fontweight='demi')

    # Format the ticks.
    ax.xaxis.set_major_locator(YearLocator())
    ax.xaxis.set_minor_locator(MonthLocator())
    sns.despine(offset=10)

sns.set(font_scale=1.5)
states = (pd.DataFrame(hidden_states, columns=['states'], index=X_test.index)
          .join(X_test, how='inner')
          .reset_index(drop=False)
          .rename(columns={'index':'Date'}))
states.head()
#suppressing warnings because of some issues with the font package
#in general, would not rec turning off warnings.
warnings.filterwarnings("ignore")

# sns.set_style("white", style_kwds)
order = [0, 1, 2]
fg = sns.FacetGrid(data=states, hue='states', hue_order=order,
                   palette=colors, aspect=1.31, height=12)
fg.map(plt.scatter, 'Date', "Close", alpha=0.8).add_legend()
sns.despine(offset=10)

# กรองข้อมูล states เฉพาะที่มีค่า states เป็น 2
filtered_states = states[states['states'] == 2]

# สร้างกราฟ FacetGrid โดยใช้ข้อมูลที่ผ่านการกรองแล้ว
fg = sns.FacetGrid(data=filtered_states, hue='states', hue_order=[2],
                   palette=colors, aspect=1.31, height=12)
fg.map(plt.scatter, 'Date', "Close", alpha=0.8).add_legend()
sns.despine(offset=10)
#

# ตรวจสอบว่าวันนี้เป็นวันสุดท้ายใน df_filtered หรือไม่
# today = datetime.datetime.today().date()
# last_date_in_df_filtered = df_filtered.index[-1].date()

# # ตรวจสอบว่าวันนี้อยู่ใน filtered_states หรือไม่
# today = pd.Timestamp.today().date()
# is_today_in_states = today in filtered_states['Date'].values

# if today == last_date_in_df_filtered:
#     print("ควรซื้อ")
#         # หากวันนี้อยู่ใน filtered_states แสดงว่าควรขาย ไม่อยู่ในแสดงว่าควรรอขาย
#     if is_today_in_states:
#         print("ควรขาย")
#     else:
#         print("ควรรอขาย")
# else:
#     print("ควรรอการตัดสินใจ")

# app = Flask(__name__)

# @app.route('http://localhost:3605/BuySell/BuySellOrder', methods=['GET','POST'])

# def recommendation():
#     if request.method == 'POST':
#         data = request.get_json()
#         time_period_ADX = data.get('time_period_ADX')
#         time_period_RSI = data.get('time_period_RSI')
#         time_period_SMA = data.get('time_period_SMA')
#         time_period_ATR = data.get('time_period_ATR')
#     else:
#         time_period_ADX = 14
#         time_period_RSI = 14
#         time_period_SMA = 50
#         time_period_ATR = 14

#     # ตรวจสอบว่าวันนี้เป็นวันสุดท้ายใน df_filtered หรือไม่
#     today = datetime.datetime.today().date()
#     last_date_in_df_filtered = df_filtered.index[-1].date()

#     # ตรวจสอบว่าวันนี้อยู่ใน filtered_states หรือไม่
#     is_today_in_states = today in filtered_states['Date'].values

#     # กำหนดคำแนะนำตามเงื่อนไขที่คุณให้มา
#     if today == last_date_in_df_filtered:
#         recommendation = "buy"
#         if is_today_in_states:
#             recommendation = "sell"
#         else:
#             recommendation = "wait"
#     else:
#         recommendation = "wait"

#     # ส่งคำแนะนำกลับในรูปแบบ JSON
#     return jsonify({
#         'date': str(today),
#         'recommendation': recommendation
#     })

# @app.route('http://localhost:3605/Account/setindicator', methods=['POST'])
# def set_parameters():
#     data = request.get_json()
#     time_period_ATR = data.get('time_period_ATR')
#     time_period_ADX = data.get('time_period_ADX')
#     time_period_RSI = data.get('time_period_RSI')
#     time_period_SMA = data.get('time_period_SMA')

#     # print(f"time_period_ATR: {time_period_ATR}")
#     # print(f"time_period_ADX: {time_period_ADX}")
#     # print(f"time_period_RSI: {time_period_RSI}")
#     # print(f"time_period_SMA: {time_period_SMA}")
#     # คุณสามารถใช้ค่าพารามิเตอร์เหล่านี้อัปเดตการคำนวณของคุณ
#     # เช่นอัปเดต time_period_ADX, time_period_RSI, time_period_SMA, time_period_ATR

#     return jsonify({'message': 'Parameters set successfully!'})

# # รันแอป Flask
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=9090)

# Define the URL
# url_get = "http://localhost:3605/Account/getindicator"

# # Define the JSON body
# json_body = {
#     "username": "test"
# }

# # Send a GET request
# response = requests.get(url_get, json=json_body)

# # Check if the request was successful (status code 200)
# if response.status_code == 200:
#     # Parse the JSON response
#     response_data = response.json()
    
#     # Extract the "indicator" object
#     indicator = response_data.get('accsetting', {}).get('indicator', None)
#     time_period_ADX = indicator.get('time_period_ADX')
#     time_period_RSI = indicator.get('time_period_RSI')
#     time_period_SMA = indicator.get('time_period_SMA')
#     time_period_ATR = indicator.get('time_period_ATR')
    
#     # Check if the "indicator" object was found
#     if indicator :
#         # Print the "indicator" object
#         print(indicator)
        
#         # Assuming you have dataframes `df_filtered` and `filtered_states` defined elsewhere
#         today = datetime.datetime.today().date()
#         last_date_in_df_filtered = df_filtered.index[-1].date()
#         is_today_in_states = today in filtered_states['Date'].values
        
#         # Determine the recommendation based on the date and conditions
#         if today == last_date_in_df_filtered:
#             recommendation = "buy"
#             if is_today_in_states:
#                 recommendation = "sell"
#             else:
#                 recommendation = "wait"
#         else:
#             recommendation = "wait"
        
#         # Send a POST request to the "BuySell/BuySellOrder" URL with the recommendation
#         url_post = "http://localhost:3605/BuySell/BuySellOrder"
#         json_body = {
#             "recommendation": recommendation
#         }
#         response = requests.post(url_post, json=json_body)

#         # Check if the request was successful (status code 200)
#         print(f"Request successful with status code: {response.status_code}")
        
        
#     else:
#         print("Indicator data not found in the response.")
# else:
#     # Handle request failure
#     print(f"Request failed with status code: {response.status_code}")
#     print(f"Reason: {response.reason}")

# Define the URLs
url_get = "http://localhost:3605/Account/getindicator"
url_post = "http://localhost:3605/BuySell/BuySellOrder"

# Define the JSON body for GET request
json_body_get = {
    "username": "test"
}

while True:
    try:
        # Send a GET request
        response = requests.get(url_get, json=json_body_get)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            response_data = response.json()
            
            # Extract the "indicator" object
            indicator = response_data.get('accsetting', {}).get('indicator', None)
            
            # Check if the "indicator" object was found
            if indicator:
                # Extract time periods from the indicator
                time_period_ADX = indicator.get('time_period_ADX')
                time_period_RSI = indicator.get('time_period_RSI')
                time_period_SMA = indicator.get('time_period_SMA')
                time_period_ATR = indicator.get('time_period_ATR')
                
                # Assuming you have dataframes `df_filtered` and `filtered_states` defined elsewhere
                today = datetime.datetime.today().date()
                last_date_in_df_filtered = df_filtered.index[-1].date()
                is_today_in_states = today in filtered_states['Date'].values
                
                # Determine the recommendation based on the date and conditions
                if today == last_date_in_df_filtered:
                    recommendation = "buy"
                    if is_today_in_states:
                        recommendation = "sell"
                    else:
                        recommendation = "wait"
                else:
                    recommendation = "wait"
                
                # Define the JSON body for POST request
                json_body_post = {
                    "recommendation": recommendation
                }
                
                # Send a POST request to the "BuySell/BuySellOrder" URL with the recommendation
                response_post = requests.post(url_post, json=json_body_post)

                # Check if the request was successful (status code 200)
                print(f"POST request successful with status code: {response_post.status_code}")
            
            else:
                print("Indicator data not found in the response.")
        else:
            # Handle request failure
            print(f"GET request failed with status code: {response.status_code}")
            print(f"Reason: {response.reason}")

    except Exception as e:
        print(f"An error occurred: {e}")

    # Delay for a certain amount of time before repeating the loop
    time.sleep(10)  # Adjust the sleep time as needed
