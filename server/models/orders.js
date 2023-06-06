import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  orderId: Number,
  symbol: String,
  status: String,
  clientOrderId: String,
  price: String,
  avgPrice: String,
  origQty: String,
  executedQty: String,
  activatePrice: String,
  priceRate: String,
  cumQuote: String,
  timeInForce: String,
  type: String,
  reduceOnly: Boolean,
  closePosition: Boolean,
  side: String,
  positionSide: String,
  stopPrice: String,
  workingType: String,
  priceProtect: Boolean,
  origType: String,
  time: Date,
  updateTime: Date
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
