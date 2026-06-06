const express = require('express');
const router = express.Router();
const {
  getCustomers, getCustomerById, createCustomer,
  updateCustomer, deleteCustomer, getStats
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All customer routes are protected

router.get('/stats', getStats);
router.route('/').get(getCustomers).post(createCustomer);
router.route('/:id').get(getCustomerById).put(updateCustomer).delete(deleteCustomer);

module.exports = router;
