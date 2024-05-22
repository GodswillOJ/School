import express from 'express';
import { 
    fetchUserData,
    insertUser, 
    LoginVerify, 
    userVerify_Mail 
} from '../controllers/general.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// setting up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// storage of image
const upload = multer({ storage: storage });

router.post('/registerUser', upload.single('image'), insertUser);
router.post('/loginUser', LoginVerify);
router.get('/user/:id', fetchUserData);
router.get('/userVerifyMail/:id', userVerify_Mail);

export default router;
