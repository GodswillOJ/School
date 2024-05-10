// Import necessary modules and controllers
import express from 'express';
import { insertUser } from '../controllers/general.js';

const router = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Route to create a new user
router.post('/users', insertUser);

// Export the router
export default router;
