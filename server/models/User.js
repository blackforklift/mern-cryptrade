import mongoose, { ObjectId } from "mongoose"

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  incomeHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IncomeHistory",
    },
  ],
});

export const Users = mongoose.model("User", userSchema);
