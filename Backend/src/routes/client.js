import express from 'express';
import {
  Products,
  Products_Showcase,
  getCustomers,
  addToCart,
} from '../controllers/client.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/user/products', Products);
router.get('/user/home', Products_Showcase);
router.get('/user/customers', getCustomers);
router.post('/user/addCart', (req, res, next) => {
    console.log('Received POST /user/addCart:', req.body); // Log request body for debugging
    next();
  }, addToCart);

export default router;
