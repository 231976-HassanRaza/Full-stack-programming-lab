const Customer = require('../models/Customer');

// @desc    Get all customers (with search & filter)
// @route   GET /api/customers
const getCustomers = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (status && ['Lead', 'Active', 'Inactive'].includes(status)) {
      query.status = status;
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create customer
// @route   POST /api/customers
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, address, notes, totalRevenue } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    const customer = await Customer.create({
      name, email, phone, company, status, address, notes,
      totalRevenue: totalRevenue || 0,
      createdBy: req.user._id,
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get stats
// @route   GET /api/customers/stats
const getStats = async (req, res) => {
  try {
    const total = await Customer.countDocuments();
    const active = await Customer.countDocuments({ status: 'Active' });
    const leads = await Customer.countDocuments({ status: 'Lead' });
    const inactive = await Customer.countDocuments({ status: 'Inactive' });
    const revenueData = await Customer.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalRevenue' } } }
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({ total, active, leads, inactive, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, getStats };
