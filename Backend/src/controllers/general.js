import { Post, User } from '../models/User.js';
import { Product } from '../models/productSchema.js';
import { Category, Message, MessageModel } from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const JWT_Phrase = process.env.JWT;

export const insertUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const user = await User.findOne({ username });
  console.log(req.file)

  if (user) {
    return res.status(400).json({ error: 'User already exists on the site' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const image = req.file.filename

  const newUser = new User({ username, email, image: image, password: hashedPassword, role: 'user' });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      // Call sendVerifyMail function with user details
      sendVerifyMail(savedUser.username, savedUser.email, savedUser._id);
      console.log(savedUser);

      res.json(savedUser);
    } else {
      res.status(500).json({ error: 'Error in verifying user' });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// inserting Admin
export const insertAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const user = await User.findOne({ username });
  console.log(req.file)

  if (user) {
    return res.status(400).json({ error: 'User already exists on the site' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const image = req.file.filename

  const newUser = new User({ username, email, image: image, password: hashedPassword, role: 'admin' });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      // Call sendVerifyMail function with user details
      sendAdminVerifyMail(savedUser.username, savedUser.email, savedUser._id);
      console.log(savedUser);
      res.json(savedUser);
    } else {
      res.status(500).json({ error: 'Error in verifying admin' });
    }
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// user login
export const LoginVerifyUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const role = user.role;

    if (role !== 'user') {
      return res.status(403).json({ error: 'Access forbidden for admin users' });
    }

    const token = jwt.sign({ userId: user._id, role }, JWT_Phrase, { expiresIn: '1d' });
    console.log(user);

    res.json({ access_token: token, userID: user._id, userData: user });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// admin login
export const LoginVerify = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const role = user.role;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden for admin users' });
    }

    const token = jwt.sign({ userId: user._id, role }, JWT_Phrase, { expiresIn: '1d' });
    console.log(user);

    res.json({ access_token: token, userID: user._id, userData: user });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// client and admin verifications.
export const userVerify_Mail = async (req, res) => {
  try {
    const { id } = req.params;
    const updateInfo = await User.updateOne({ _id: id }, { $set: { is_verified: 1 } });
    console.log(updateInfo);

    res.json({ message: 'Your mail has been verified', userID: updateInfo._id });
  } catch (error) {
    console.error('Mail Verification error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const clientVerify_Mail = async (req, res) => {
  try {
    const { id } = req.params;
    const updateInfo = await User.updateOne({ _id: id }, { $set: { is_verified: 0 } });
    console.log(updateInfo);

    res.json({ message: 'Your mail has been verified', userID: updateInfo._id });
  } catch (error) {
    console.error('Mail Verification error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// admin logi verify
export const AdminLoginVerify = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Retrieve user's role from the database
    const role = user.role;

    // Check if the user's role is "admin"
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden for non-admin users' });
    }

    // Generate JWT token with user's role
    const token = jwt.sign({ userId: user._id, role }, JWT_Phrase, { expiresIn: '1d' });

    res.json({ access_token: token, userID: user._id });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
export const Home = async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.user) {
      // Fetch user data here
      const userData = await User.findById(req.user.userId); // Assuming you have a User model
      res.json({ message: 'Welcome home!', userData });
    } else {
      res.json({ message: 'Welcome home!' }); // For unauthorized users
    }
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const NewProduct = async (req, res) => {
  const { name, title, detail, price, author } = req.body;

  // validate inputs
  if (!name || !title || !detail || !price || !author) {
    return res.status(400).json({ error: 'Name, Title, details, price, and author are required' });
  }
  const image = req.file.filename;

  const newProduct = new Product({ name, image: image, title, price, details: detail, author });

  try {
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      console.log(savedProduct);
      res.json(savedProduct);
    } else {
      res.status(500).json({ error: 'error in adding Product' });
    }
  } catch (error) {
    console.log('Error adding Product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Controller function to fetch user data for the dashboard
export const InsertCatData = async (req, res) => {
  try {
    // Fetch user data
    // const userData = await Category.findById(req.user.userId); 
    // console.log(userData)
    // res.json(userData);
    console.log(req.body)
    let category = new Category({
      name: req.body.name,
      tags: req.body.tags,
      description: req.body.description
    })
      category = await category.save()
      console.log(category)

    if (category) {
      res.json(category);
    } else {
      console.error('Error is setting up category')
      res.status(500).json({error: 'Error in adding category'})
    }
  } catch (error) {
    console.error('Error at backend Server category controller:', error);
    res.status(500).json({ error: 'Internal Server Error Category Controller' });
  }
};

export const fetchSingleCatData = async (req, res) => {
  try {
    // Fetch all categories{

    const id = req.params.id
    const categories = await Category.find({_id: id});
    const categoryCat = await Category.find();

    // Check if there are categories
    if (categories) {
      console.log('Categories found:', categories);
      // Send the categories array back as the response
      res.json(categories, categoryCat);
    } else {
      console.error('No categories found');
      res.status(404).json({ error: 'No categories found' });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const fetchCatData = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // Check if there are categories
    if (categories.length > 0) {
      console.log('Categories found:', categories);
      // Send the categories array back as the response
      res.json(categories);
    } else {
      console.error('No categories found');
      res.status(404).json({ error: 'No categories found' });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// For verify mail
const port = process.env.PORT
const emailUser = process.env.EmailUser
const emailPassword = process.env.EmailPassword

export const sendVerifyMail = async(username, email, userId)=> {
  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          requireTLS: true,
          auth: {
              user: emailUser,
              pass: emailPassword
          }
      });

      const VerifyLink = `https://gotech-blog.onrender.com/userVerifyMail/${userId}`;

      const mailOptions = {
        from: emailUser,
        to: email,
        subject: 'Verify Mail Link',
        html: `<p>Hi ${username},<br/>Please click <a href="${VerifyLink}">here</a> to verify your mail</p>`
      };

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error)
          } else {
              console.log('Email has been sent:-', info.response)
          }
      })
  } catch (error) {
      console.log(error.message)
  }
}

export const sendAdminVerifyMail = async(username, email, userId)=> {
  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          requireTLS: true,
          auth: {
              user: emailUser,
              pass: emailPassword
          }
      });

      const VerifyLink = `https://gotech-blog.onrender.com/clientVerifyMail/${userId}`;

      const mailOptions = {
        from: emailUser,
        to: email,
        subject: 'Verify Mail Link',
        html: `<p>Hi ${username},<br/>Please click <a href="${VerifyLink}">here</a> to verify your mail</p>`
      };

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error)
          } else {
              console.log('Email has been sent:-', info.response)
          }
      })
  } catch (error) {
      console.log(error.message)
  }
}



// MessageAdmin
export const insertOrderInformation = async (req, res) => {
  const { fullName, userEmail, description } = req.body;
  console.log(req.body)
  if (!fullName || !userEmail || !description) {
    return res.status(400).json({ error: 'Full name, email, and description are required' });
  }

  try {
    const message = new Message({ fullName: fullName, userEmail: userEmail, description: description });
    console.log(message)
    const OrderMessage = await message.save();
    console.log(message)
    // Assuming sendOrderVerifyMail sends confirmation email to user
    sendOrderVerifyMail(fullName, userEmail, description);
    console.log(OrderMessage);
    res.json(OrderMessage);
  } catch (error) {
    console.error('Error in order detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Sending Public Messages
export const messageUserInformation = async (req, res) => {
  const { fullName, userEmail, description } = req.body;
  console.log(req.body)
  if (!fullName || !userEmail || !description) {
    return res.status(400).json({ error: 'Full name, email, and description are required' });
  }

  try {
    const message = new MessageModel({ fullName: fullName, userEmail: userEmail, description: description });
    console.log(message)
    const OrderMessage = await message.save();
    console.log(message)
    // Assuming sendOrderVerifyMail sends confirmation email to user
    sendUser_MessageMail(fullName, userEmail, description);
    console.log(OrderMessage);
    res.json(OrderMessage);
  } catch (error) {
    console.error('Error in order detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller functions...

// Sending Admin messages

export const sendOrderVerifyMail = async (fullName, userEmail, description) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: 'Admin GO_TECH new notification/inquiry',
        html: `<p>Hi admin am ${fullName},<br/> Inquiry. Below are the details: <br/><br/>Order Description: ${description}<br/><br/>Ref user_mail: ${userEmail}</p>`
      };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending order confirmation email:', error);
      } else {
        console.log('Order confirmation email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

// Sending Users Messages
export const sendUser_MessageMail = async (fullName, userEmail, description) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: emailUser,
      to: userEmail,
      subject: 'New Mail/Message from admin GO_TECH: Response to your Inquiry ',
        html: `<p>Hi ${fullName},<br/>Thank you for your reaching out to admin. Admin:<br/><br/>Message Description: ${description}<br/><br/>Ref mail: ${emailUser}</p>`
      };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending order confirmation email:', error);
      } else {
        console.log('Order confirmation email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

//Reset Password 
const JWT_SECRET = process.env.JWT_SECRET;

// other controller functions...

// Forget Password

export const getResetPassword = async (req, res) => {
  try {
    res.json({message : 'Reset password'});
  } catch (error) {
    console.error('Error loading forget password page:', error);
    res.status(500).json({ error: 'Forget Password Internal Server Error' });
  }
}

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send({ error: 'User not found' });
    }

    // Generate a unique token using JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Save the token to the user document
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    var userId = user._id;

    // Send reset password email
    await sendResetPasswordMail(user.username, userId, user.email, token);

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error in forget password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const sendResetPasswordMail = async (username, userId, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    const resetLink = `https://personal-site-static.onrender.com/reset-password/${userId}/${token}`;

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Reset Password',
      html: `<p>Hi ${username},<br/>Please click <a href="${resetLink}">here</a> to reset your password</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending password reset email:', error);
      } else {
        console.log('Password reset email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Decode the token to get user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the user with the new password
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Users messages

export const fetchMessages = async (req, res) => {
  try {
    // Assuming your User and Message models are correctly imported
    const userData = await User.findById(req.user.userId);
    const userEmail = userData.email;
    
    // Assuming your Message model is correctly imported
    const messages = await MessageModel.find({ userEmail: userEmail });
    console.log(messages)
    res.status(200).json({ messages, userData });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Admin messages

export const adminMail = async (req, res) => {
  try {
    // Assuming you have a function to fetch messages from your database
    const userData = await User.findById(req.user.userId);
    const userEmail = userData.email;
    const messages = await MessageModel.find({userEmail: userEmail}); // Example usage, replace with your actual implementation

    res.status(200).json({messages, userData});
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};