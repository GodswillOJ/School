import { Post, User } from '../models/User.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
import { Category, Message, MessageModel } from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import getCountryIso3 from 'country-iso-2-to-3';
import Flutterwave from 'flutterwave-node-v3';

dotenv.config();

const JWT_Phrase = process.env.JWT;

// fetch inserted product
export const Products = async(req, res) => {
    try {
      const products = await Product.find()
  
      return res.json(products)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }
// fetch customers
export const getCustomers = async(req, res) => {
    try {
      const users = await User.find({ role: "user"}).select("-password");
  
      return res.status(200).json(users)
    } catch ( error) {
      res.status(404).json({ message: error.message })
    }
  }

export const Products_Showcase = async (req, res) => {
    try {
      const products = await Product.find().select("title image rating price"); // Select only the necessary fields
      return res.json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });  
    }
}

// add to cart
export const addToCart = async (req, res) => {
  const { userID, productId } = req.body;

  console.log('Request body:', req.body);

  if (!userID || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    const user = await User.findById(userID);
    const product = await Product.findById(productId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingCartItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingCartItemIndex >= 0) {
      user.cart.items[existingCartItemIndex].quantity += 1;
    } else {
      user.cart.items.push({
        name: product.title,
        productId: product._id,
        quantity: 1,
        price: product.price,
        image: product.image,
      });
    }

    user.cart.totalPrice = user.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Remove a product from the cart
export const removeFromCart = async (req, res) => {
  const { userID, productId } = req.body;

  if (!userID || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.items = user.cart.items.filter(item => item.productId.toString() !== productId);

    user.cart.totalPrice = user.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await user.save();

    res.status(200).json({ message: 'Product removed from cart successfully', cart: user.cart });
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart.items = [];
    user.cart.totalPrice = 0;

    await user.save();

    res.status(200).json({ message: 'Cart cleared successfully', cart: user.cart });
  } catch (error) {
    console.error('Error in clearCart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


import Transaction from '../models/transactions.js';

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const {
    userID,
    orderDetails,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    transactionId,
  } = req.body;

  console.log('Received request body:', req.body);

  // Ensure order details are present
  if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
    return res.status(400).send({ message: 'Order details, items, productId, and quantity are required.' });
  }

  try {
    // Step 1: Verify payment using Flutterwave's API
    const paymentVerification = await flw.Transaction.verify({ id: transactionId });

    // Check payment status and match the amount and currency
    if (paymentVerification.status !== 'successful' || 
        paymentVerification.data.amount !== orderDetails.totalPrice || 
        paymentVerification.data.currency !== 'USD') {
      return res.status(400).send({ message: 'Payment verification failed or payment mismatch.' });
    }

    // Step 2: Proceed with order creation once payment is verified
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Create the order
    const order = new Order({
      userID: user._id,
      orderDetails,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
    });

    // Save the order
    const savedOrder = await order.save();
    user.orders.push(savedOrder._id); // Associate order with user
    await user.save();

    // Step 3: Create a transaction record
    const transaction = new Transaction({
      userID: user._id,
      productId: orderDetails.items.map(item => item.productId), // Array of product IDs
      clientUsername: user.username,
      quantity: orderDetails.items.reduce((total, item) => total + item.quantity, 0), // Total quantity
      amount: orderDetails.totalPrice,
      dateOrdered: new Date(), // Set current date as order date
    });

    // Save the transaction
    await transaction.save();
    console.log('Transaction saved:', transaction);

    // Step 4: Return success response
    res.status(201).send({ order: savedOrder, transaction });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send({ message: 'Failed to create order', error });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const { userID } = req.params;
    const orders = await Order.find({ userID });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server-side code (e.g., in controllers/client.js)
export const fetchAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortField = 'dateOrdered', sortOrder = 'desc' } = req.query;

    const transactions = await Transaction.find()
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments();

    res.json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    if (!users || users.length === 0) {
      return res.status(200).json([]); // Return an empty array if no users found
    }

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({
        id: country,
        value: count
      })
    );    

    res.status(200).json(formattedLocations);
  } catch (error) {
    console.error('Error fetching geography data:', error);
    res.status(404).json({ message: error.message });
  }
};


// Payments







