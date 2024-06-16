import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  fetchUserData,
  insertUser,
  insertAdmin,
  LoginVerify,
  LoginVerifyUser,
  userVerify_Mail,
  clientVerify_Mail,
  NewProduct,
} from '../controllers/general.js';
import {
  Products
} from '../controllers/client.js';

const router = express.Router();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Serve static files from the "public" directory
router.use('/public', express.static('public'));

// Setting up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    console.log(`Saving file as: ${filename}`);
    cb(null, filename);
  }
});

// Storage of image
const upload = multer({ storage: storage });

router.post('/register', upload.single('file'), insertAdmin);
router.post('/registerClient', upload.single('file'), insertUser);
router.post('/login', LoginVerifyUser);
router.post('/loginUser', LoginVerify);
router.get('/user/:id', fetchUserData);
router.get('/userVerifyMail/:id', userVerify_Mail);
router.get('/clientVerifyMail/:id', clientVerify_Mail);

// Change the following line to use POST instead of GET
router.post('/add_product', upload.single('file'), NewProduct);




export default router;
