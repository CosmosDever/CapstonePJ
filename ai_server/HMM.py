import pandas as pd
import numpy as np
import pandas_datareader as web
import datetime
import sklearn.mixture as mix
import scipy.stats as scs
import datetime as dt
import matplotlib as mpl
from matplotlib import cm
import matplotlib.pyplot as plt
from matplotlib.dates import YearLocator, MonthLocator
import seaborn as sns
import yfinance as yf
import warnings

df = yf.Ticker("BTC-USD")

# get stock info
df.info

# get historical market data
df = df.history(period="max")
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

print("Means and vars of each hidden state")
for i in range(model.n_components):
    print("{0}th hidden state".format(i))
    print("mean = ", model.means_[i])
    print("var = ", np.diag(model.covariances_[i]))
    print()

sns.set(font_scale=1.25)
style_kwds = {'xtick.major.size': 3, 'ytick.major.size': 4,
              'font.family':u'courier prime code', 'legend.frameon': True}
sns.set_style('white', style_kwds)

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

sns.set_style("white", style_kwds)
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


# ตรวจสอบว่าวันนี้อยู่ใน filtered_states หรือไม่
today = pd.Timestamp.today().date()
is_today_in_states = today in filtered_states['Date'].values

# หากวันนี้อยู่ใน filtered_states แสดงว่าควรขาย ไม่อยู่ในแสดงว่าควรรอขาย
if is_today_in_states:
    print("ควรขาย")
else:
    print("ควรรอขาย")