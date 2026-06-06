const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// @desc    Get all invoices
// @route   GET /api/invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer', 'name email company')
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('customer', 'name email phone company address');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create invoice
// @route   POST /api/invoices
const createInvoice = async (req, res) => {
  try {
    const { customerId, items, tax, dueDate, notes } = req.body;

    if (!customerId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Customer and at least one item are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Calculate totals
    const processedItems = items.map(item => ({
      ...item,
      total: item.quantity * item.unitPrice,
    }));
    const subtotal = processedItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * (tax || 0)) / 100;
    const total = subtotal + taxAmount;

    // Generate invoice number
    const count = await Invoice.countDocuments();
    const invoiceNumber = `INV-${String(count + 1).padStart(4, '0')}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      customer: customerId,
      items: processedItems,
      subtotal,
      tax: taxAmount,
      total,
      dueDate,
      notes,
      createdBy: req.user._id,
    });

    // Update customer revenue
    await Customer.findByIdAndUpdate(customerId, {
      $inc: { totalRevenue: total },
    });

    const populated = await Invoice.findById(invoice._id)
      .populate('customer', 'name email phone company address');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInvoices, getInvoiceById, createInvoice, deleteInvoice };
