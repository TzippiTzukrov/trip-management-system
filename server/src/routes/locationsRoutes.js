import express from 'express';
import Location from '../models/location.js';
import Student from '../models/student.js';
import Teacher from '../models/teacher.js';
import verifyTeacher from '../middleware/verifyTeacher.js';
import { io } from '../../index.js';

function dmsToDecimal(degrees, minutes, seconds) {
  return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
}

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { ID, Coordinates, Time } = req.body;

    if (!ID || !Coordinates || !Time) {
      return res.status(400).json({ error: 'ID, Coordinates and Time are required' });
    }
    
    const [student] = await Student.find({ id: String(ID) });
    const [teacher] = await Teacher.find({ id: String(ID) });
    if (!student && !teacher) return res.status(404).json({ error: 'Student or teacher not found' });

    const lat = dmsToDecimal(
      Coordinates.Latitude.Degrees,
      Coordinates.Latitude.Minutes,
      Coordinates.Latitude.Seconds
    );
    const lng = dmsToDecimal(
      Coordinates.Longitude.Degrees,
      Coordinates.Longitude.Minutes,
      Coordinates.Longitude.Seconds
    );

    const location = await Location.findOneAndUpdate(
      { id: String(ID) },
      { id: String(ID), lat, lng, time: new Date(Time) },
      { upsert: true, new: true }
    );

    io.to('teachers').emit('locationUpdated', {
      ...location.toObject(),
      name: student ? `${student.firstName} ${student.lastName}` : `${teacher.firstName} ${teacher.lastName}`,
      className: student?.className,
    });

    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', verifyTeacher, async (req, res) => {
  try {
    const locations = await Location.find();
    const [students, teachers] = await Promise.all([Student.find(), Teacher.find()]);
    const locationsWithNames = locations.map((loc) => {
      const person = students.find((s) => s.id === loc.id) || teachers.find((t) => t.id === loc.id);
      return {
        ...loc.toObject(),
        name: person ? `${person.firstName} ${person.lastName}` : 'Unknown',
        className: person?.className,
      };
    });
    res.json(locationsWithNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;