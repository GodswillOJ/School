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

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Serve static files from the "public" directory
router.use('/public/images', express.static(path.join(__dirname, '../../public/images')));

// Setting up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        console.log(`Saving file as: ${filename}`);
        cb(null, filename);
    }
});

// Storage of image
const upload = multer({ storage: storage });

router.post('/registerUser', upload.single('file'), insertUser);
router.post('/loginUser', LoginVerify);
router.get('/user/:id', fetchUserData);
router.get('/userVerifyMail/:id', userVerify_Mail);

export default router;
