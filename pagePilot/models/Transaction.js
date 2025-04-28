
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  studentRollNo: { type: String, required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true},
  returnDate: { type: Date, default: null },
  fine: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);

