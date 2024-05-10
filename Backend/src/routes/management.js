// Import necessary modules and controllers
import express from 'express';
// import * as userController from '../controllers/userController.js';
// import { isAuthenticated } from '../middleware/authenticateToken.js';

const router = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

export default router;