import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from backtesting import Backtest, Strategy
from sklearn.mixture import GaussianMixture
import talib as ta


# รับข้อมูลประวัติของ BTC-USD
data = yf.download('BTC-USD', start='2015-01-01', end='2023-01-01')

# สร้างคอลัมน์ 'Returns' และ 'Range'
data['Returns'] = data['Close'].pct_change()
data['Range'] = (data['High'] - data['Low']) / data['Low']
data.dropna(inplace=True)

# แบ่งข้อมูลเป็นชุดการฝึกอบรมและทดสอบ
train_data = data.iloc[:int(len(data) * 0.8)]
test_data = data.iloc[int(len(data) * 0.2):]

# สร้างโมเดล Gaussian Mixture Model (GMM) ด้วย n_components = 3
gmm = GaussianMixture(n_components=3, random_state=42)
gmm.fit(train_data[['Returns', 'Range']])

# ทำการคาดการณ์ hidden states จากชุดทดสอบ
test_data.loc[:, 'hidden_state'] = gmm.predict(test_data[['Returns', 'Range']])

# เพิ่มเงินสดเริ่มต้นเป็น 100000 USD
initial_cash = 100000  # ใช้เงินสดเริ่มต้นที่เพิ่มขึ้น

# สร้างกลยุทธ์รวมที่อ้างอิงถึงผลลัพธ์ของ GMM และ ADX
class CombinedStrategy(Strategy):
    def init(self):
        # คำนวณ ADX ด้วย TA-Lib
        self.adx = self.I(ta.ADX, self.data.High, self.data.Low, self.data.Close, timeperiod=14)
    
    def next(self):
        if  self.adx > 14:
            self.buy(size=0.1)
        
        elif self.data.hidden_state == 2 :
            self.sell(size=0.1)

# สร้างการ backtest ด้วยกลยุทธ์รวมและข้อมูลชุดทดสอบ
bt = Backtest(test_data, CombinedStrategy, cash=initial_cash, commission=0.001)

# รันการ backtest และพิมพ์สถิติ
stats = bt.run()
print(stats)

# แสดงผลการ backtest
bt.plot()
plt.show()
