import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
    fetchUserData,
    insertUser,
    LoginVerify,
    userVerify_Mail
} from '../controllers/general.js';

const router = express.Router();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use('/public', express.static(path.join(__dirname, '../../public/images')));

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const frontendPublicPath = path.join(__dirname, '../../public/images');
        cb(null, frontendPublicPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON and urlencoded form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Serve static files (optional if needed for other purposes)

// Example route for handling image uploads

router.post('/registerUser', upload.single('image'), insertUser);
router.post('/loginUser', LoginVerify);
router.get('/user/:id', fetchUserData);
router.get('/userVerifyMail/:id', userVerify_Mail);



export default router;
