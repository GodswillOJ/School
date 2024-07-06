import express from 'express';
import { getOverallStats, addOverallStat } from '../controllers/sales.js';

const router = express.Router();

router.get('/overall_stats', getOverallStats);
router.post('/add_stat', addOverallStat);
router.post('/overview', addOverallStat);

export default router;
