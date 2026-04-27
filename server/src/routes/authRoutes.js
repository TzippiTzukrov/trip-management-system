import express from 'express';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const teacher = await Teacher.findOne({ id });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    const token = jwt.sign({ id: teacher.id, role: 'Teacher' }, process.env.JWT_SECRET);
    res.json({ token, teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
