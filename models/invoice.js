const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true }, // Add invoiceId field
    customerName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    // Add more fields as needed
});

module.exports = mongoose.model('Invoice', invoiceSchema);
