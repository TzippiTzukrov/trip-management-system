import express from 'express';
import Student from '../models/student.js';
import verifyTeacher from '../middleware/verifyTeacher.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, firstName, lastName, className } = req.body;
    
    if (!id || !firstName || !lastName || !className) {
      return res.status(400).json({ error: 'id, firstName, lastName and className are required' });
    }

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Student with this ID already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', verifyTeacher, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', verifyTeacher, async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;