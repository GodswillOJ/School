// Import necessary modules and controllers
import express from 'express';
import {
Products,
getCustomers
} from '../controllers/client.js';

const router = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/user/products', Products)
router.get('/user/customers', getCustomers)

export default router;