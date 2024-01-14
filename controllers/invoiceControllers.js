// controllers/invoiceController.js
const Invoice = require('../models/invoice');
const { v4: uuidv4 } = require('uuid');


exports.getAllInvoices = async (req, res) => {
    try {
        const allInvoices = await Invoice.find();
        res.status(200).json(allInvoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInvoice = async (req, res) => {
    const { customerName, totalAmount, items } = req.body;
    try {
        // Generate a unique invoiceId using uuid
        const invoiceId = uuidv4();

        const newInvoice = await Invoice.create({
            invoiceId,
            customerName,
            totalAmount,
        });

        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { customerName, totalAmount, items } = req.body;
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            { customerName, totalAmount, items },
            { new: true }
        );
        if (!updatedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
