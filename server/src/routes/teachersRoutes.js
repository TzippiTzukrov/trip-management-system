import express from 'express';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';
import Student from '../models/student.js';
import verifyTeacher from '../middleware/verifyTeacher.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    const token = jwt.sign({ id: teacher.id, role: 'Teacher' }, process.env.JWT_SECRET);
    res.status(201).json({ teacher, token });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Teacher with this ID already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', verifyTeacher, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', verifyTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.params.id });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/students', verifyTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.params.id });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    const students = await Student.find({ className: teacher.className });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;