import yfinance as yf
from backtesting import Backtest, Strategy
import talib as ta
import matplotlib.pyplot as plt



# Define a new Strategy class called 'ADXStrategy'
class ADXStrategy(Strategy):
    def init(self):
        # Calculate ADX using high, low, and close prices with a time period of 14
        self.adx = self.I(ta.ADX, self.data.High, self.data.Low, self.data.Close, timeperiod=14)
    
    def next(self):
        # Buy rule: when ADX is greater than 25 (indicating a strong trend)
        if self.adx > 14:
            self.buy(size=0.1)
        # Sell rule: when ADX is less than or equal to 25 (indicating a weaker trend)
        elif self.adx <= 14:
            self.sell(size=0.1)

# Download historical data of BTC-USD from 1 January 2015 to 1 January 2023
df = yf.download('BTC-USD', start='2015-01-01', end='2023-01-01')

# Create a Backtest using the data 'df' and strategy 'ADXStrategy' with initial cash $10,000 and commission 0.001
bt = Backtest(df, ADXStrategy, cash=10000, commission=0.001)

# Run the backtest and store the results
stats = bt.run()

# Print the statistics
print(stats)

# Plot the backtest results
bt.plot()
plt.show()
