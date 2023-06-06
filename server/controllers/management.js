import Candlestick from "../models/candle.js";

export const getOhlc = async (req, res) => {
    try {
      const ohlchistory = await Candlestick.find(); // tüm veriler
      console.log(ohlchistory)
      res.status(200).json({ohlchistory});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  