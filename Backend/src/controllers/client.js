import { Post, User } from '../models/User.js';
import { Product } from '../models/productSchema.js';
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


