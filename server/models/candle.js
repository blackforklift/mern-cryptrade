import mongoose from "mongoose";

const CandlestickSchema = new mongoose.Schema({
    openTime: { type: Date},
    open: { type: Number},
    high: { type: Number},
    low: { type: Number},
    close: { type: Number},
    volume: { type: Number},
    closeTime: { type: Date},
    quoteVolume: { type: Number},
    numberOfTrades: { type: Number},
    takerBuyBaseVolume: { type: Number},
    takerBuyQuoteVolume: { type: Number },
    ignore: { type: Number}
  });
  
  const Candlestick = mongoose.model('Candlestick', CandlestickSchema)

  export default Candlestick;