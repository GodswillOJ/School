import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser'
import Client from './src/routes/client.js'
import General from './src/routes/general.js'
import Management from './src/routes/management.js'
import Sales from './src/routes/sales.js'

dotenv.config();

const __dirname = path.resolve(); // Define __dirname manually for ES modules

// ... (existing imports)

const app = express();
const PORT = process.env.PORT || 3400;

// Enable CORS and allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', Client);
app.use('/api', Management);
app.use('/api', Sales);
app.use('/api', General);

mongoose.connect(process.env.MONGODB_URl, {
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
