const express = require('express');
const router = express.Router();
const { getInvoices, getInvoiceById, createInvoice, deleteInvoice } = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').get(getInvoiceById).delete(deleteInvoice);

module.exports = router;
