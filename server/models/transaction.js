import mongoose from "mongoose";

const tranSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    incomehistories: [
      {
        symbol: {
          type: String,
          required: true,
        },
        incomeType: {
          type: String,
          required: true,
        },
        income: {
          type: Number,
          required: true,
        },
        asset: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          required: true,
        },
        info: {
          type: String,
        },
        tranId: {
          type: String,
          required: true,
        },
        tradeId: {
          type: String,
        },
        user: {
          type: mongoose.Types.ObjectId,
          ref: "Users",
          required: true,
        },
      },
    ],
  }, { timestamps: true });
  
  const Tran = mongoose.model('Tran', tranSchema);
  export default Tran;
  