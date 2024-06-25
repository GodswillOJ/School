import express from 'express';
import { Products, Products_Showcase, getCustomers, addToCart, removeFromCart, clearCart } from '../controllers/client.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/user/products', Products);
router.get('/user/home', Products_Showcase);
router.get('/user/customers', getCustomers);
router.post('/user/addCart', addToCart);
router.post('/user/removeFromCart', removeFromCart);
router.post('/user/clearCart', clearCart);

export default router;
