// Import necessary modules and controllers
import express from 'express';
import { 
    insertUser, 
    LoginVerify, 
    userVerify_Mail
 } from '../controllers/general.js';

const router = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Route to create a new user
router.post('/registerUser', insertUser);
router.post('/loginUser', LoginVerify);
router.post('/userVerifyMail/:id', LoginVerify, userVerify_Mail);

// Export the router
export default router;
