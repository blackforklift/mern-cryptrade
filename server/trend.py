import numpy as np
from matplotlib import pyplot
from pymongo import MongoClient
import pandas as pd
import mplfinance as mpf

# Connect to MongoDB
MONGO_URL = "mongodb+srv://dln:123@mycoinsdb.dkun73y.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URL)
print("Connected to MongoDB")

db = client['test']  # Replace 'your_database_name' with your actual database name
collection = db['candlesticks']
# Retrieve all documents from the collection
documents = collection.find()

# Print out the contents of each document
# for document in documents:
#     print(document)

backcandles = 50
candles_in_box = 5
ref_candle = 499

maxim = np.array([])
minim = np.array([])
xxmin = np.array([])
xxmax = np.array([])

candle_data = collection.find().skip(ref_candle - backcandles).limit(backcandles + 1)
candle_df = pd.DataFrame(list(candle_data))
candle_df.set_index('openTime', inplace=True)  # Set 'date' column as the index and convert it to a DatetimeIndex

for i in range(ref_candle - backcandles, ref_candle + 1, candles_in_box):
    # Retrieve candlestick data from MongoDB
    candle_data = collection.find().skip(i).limit(candles_in_box)
    candle_df = pd.DataFrame(list(candle_data))
    # print(candle_df.head())
    minim = np.append(minim, candle_df['low'].min())
    xxmin = np.append(xxmin, candle_df['low'].idxmin())
    
    maxim = np.append(maxim, candle_df['high'].max())
    xxmax = np.append(xxmax, candle_df['high'].idxmax())

slmin, intercmin = np.polyfit(xxmin, minim, 1)
slmax, intercmax = np.polyfit(xxmax, maxim, 1)
print(xxmax)
# hist_dfpl = candle_df  # Use the retrieved candlestick data instead of hist_df
# mpf.plot(hist_dfpl, type='candle', style='charles')  # Plot the candlestick chart using mplfinance

# pyplot.plot(xxmin, slmin*xxmin + intercmin, label='min slope')
# pyplot.plot(xxmax, slmax*xxmax + intercmax, label='max slope')
# pyplot.legend()

# pyplot.show()
