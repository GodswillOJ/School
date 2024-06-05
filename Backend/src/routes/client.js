// Import necessary modules and controllers
import express from 'express';
import {
Products,
} from '../controllers/client.js';

const router = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/user/products', Products)

export default router;