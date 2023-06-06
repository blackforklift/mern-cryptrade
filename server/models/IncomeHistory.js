import mongoose from "mongoose";

const incomeHistorySchema = new mongoose.Schema({
  symbol: {
    type: String,
   
  },
  incomeType: {
    type: String,
   
  },
  income: {
    type: Number,
   
  },
  asset: {
    type: String,
    
  },
  time: {
    type: Date,
    
  },
  info: {
    type: String,
    
  },
  tranId: {
    type: Number,
    
  },
  tradeId: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  }
});

const IncomeHistory= mongoose.model('IncomeHistory', incomeHistorySchema);
export default IncomeHistory;