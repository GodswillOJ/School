import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import Client from './src/routes/client.js';
import General from './src/routes/general.js';
import Management from './src/routes/management.js';
import Sales from './src/routes/sales.js';

dotenv.config();

const __dirname = path.resolve(); // Define __dirname manually for ES modules

const app = express();
const PORT = process.env.PORT || 3400;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://gotech-blog.onrender.com', 'http://localhost:3000'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', Client);
app.use('/api', Management);
app.use('/api', Sales);
app.use('/api', General);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
