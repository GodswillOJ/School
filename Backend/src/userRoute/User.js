// Import necessary modules and controllers
import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authenticateToken.js';

const userRouter = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

// Define routes

// Users Routes
userRouter.post('/registerUser', userController.insertUser);
userRouter.post('/courseInformation', isAuthenticated, userController.insertCourseInformation);
userRouter.post('/bookOnsite', isAuthenticated, userController.insertOrderInformation, userController.fetchCatData);
userRouter.post('/bookSite', isAuthenticated, userController.insertOrderInformation, userController.fetchCatData);
userRouter.post('/sendAdmin_Inquiry', isAuthenticated, userController.insertOrderInformation, userController.fetchCatData);
userRouter.get('/messages', isAuthenticated, userController.fetchMessages, userController.fetchCatData);
userRouter.post('/messageUser', userController.messageUserInformation, isAuthenticated, userController.fetchCatData);
userRouter.get('/adminMessages', userController.adminMail, isAuthenticated, userController.fetchCatData); //admin messages
userRouter.post('/login', userController.LoginVerify);
userRouter.post('/forget-password', userController.forgetPassword);
userRouter.post('/reset-password/:id/:token', userController.resetPassword); // New route for resetting password
userRouter.post('/userMailVerify/:id', userController.resetPassword); // New route for verify email
userRouter.get('/dashboard', isAuthenticated, userController.fetchUserData);
userRouter.post('/addCategory', isAuthenticated, userController.InsertCatData);
userRouter.get('/all_courses', userController.fetchCatData);
userRouter.post('/bookOnline', isAuthenticated, userController.insertOrderInformation, userController.fetchCatData);
userRouter.get('/web_development/:id', isAuthenticated, userController.fetchSingleCatData);
userRouter.get('/data_analysis/:id', isAuthenticated, userController.fetchSingleCatData);
userRouter.get('/machine_learning/:id', isAuthenticated, userController.fetchSingleCatData);
userRouter.get('/deep_learning/:id', isAuthenticated, userController.fetchSingleCatData);
userRouter.get('/artificial_intelligence/:id', isAuthenticated, userController.fetchSingleCatData);
userRouter.get('/', isAuthenticated, userController.fetchUserData);

// Admin Routes
userRouter.post('/registerAdmin', userController.insertAdmin);
userRouter.post('/loginAdmin', userController.AdminLoginVerify);
userRouter.post('/adminForget-password', userController.forgetPassword);
userRouter.post('adminReset-password/:id/:token', userController.resetPassword); // New route for resetting password
userRouter.post('/adminMailVerify/:id', userController.resetPassword); // New route for verify email
userRouter.get('/dashboardAdmin', isAuthenticated, userController.fetchUserData);

// Export the router
export { userRouter };
