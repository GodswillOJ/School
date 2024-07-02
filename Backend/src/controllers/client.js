import { Post, User } from '../models/User.js';
import { Product } from '../models/productSchema.js';
import { Order } from '../models/orderSchema.js';
import { Category, Message, MessageModel } from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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

export const placeOrder = async (req, res) => {
  const { userID, orderDetails, shippingAddress1, shippingAddress2, city, zip, country, phone } = req.body;

  console.log('Received request body:', req.body); // Log the entire request body
  if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
    return res.status(400).send({ message: 'Order details, items, productId, and quantity are required.' });
  }

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const order = new Order({
      userID: user._id,
      orderDetails,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone
    });

    const savedOrder = await order.save();
    user.orders.push(savedOrder._id);
    await user.save();

    // Create a transaction for the admin/seller
    const transaction = new Transaction({
      userID: user._id,
      productId: orderDetails.items.map(item => item.productId),  // Ensure this is an array of strings
      clientUsername: user.username,
      quantity: orderDetails.items.map(item => item.quantity).reduce((a, b) => a + b, 0),
      amount: orderDetails.totalPrice,
      dateOrdered: savedOrder.dateOrdered,
    });

    await transaction.save();
    console.log(transaction)

    res.status(201).send(savedOrder);
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
    const transactions = await Transaction.find().populate('userID', 'username');
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






