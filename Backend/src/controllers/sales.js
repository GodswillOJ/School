import OverallStat from '../models/OverallStat.js';

export const getOverallStats = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addOverallStat = async (req, res) => {
    const newStat = new OverallStat(req.body);
    try {
        await newStat.save();
        res.status(201).json(newStat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
