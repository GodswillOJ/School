import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: [String], required: true },  // Updated to an array of strings
  clientUsername: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  dateOrdered: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
