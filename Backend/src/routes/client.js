import express from 'express';
import {
  Products,
  Products_Showcase,
  getCustomers,
  addToCart,
  removeFromCart,
  clearCart,
  placeOrder,
  fetchOrders,
  fetchAllTransactions
} from '../controllers/client.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/user/products', Products);
router.get('/user/home', Products_Showcase);
router.get('/user/customers', getCustomers);
router.post('/user/addCart', addToCart);
router.post('/user/removeFromCart', removeFromCart);
router.post('/user/clearCart', clearCart);
router.post('/user/order_new', placeOrder);
router.get('/user/view_order/:userID', fetchOrders); // Change to GET method
// server-side code (e.g., in routes/client.js)
router.get('/user/view_transactions', fetchAllTransactions);


export default router;
