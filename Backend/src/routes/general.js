
import express from 'express';
import { 
    insertUser, 
    LoginVerify, 
    userVerify_Mail 
} from '../controllers/general.js';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/registerUser', insertUser);
router.post('/loginUser', LoginVerify);
router.get('/userVerifyMail/:id', userVerify_Mail);

export default router;
