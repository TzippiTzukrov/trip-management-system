import jwt from 'jsonwebtoken';

export function verifyTeacherToken(token) {
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== 'Teacher') throw new Error('Access denied');
  return decoded;
}

export default function verifyTeacher(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = verifyTeacherToken(token);
    next();
  } catch (err) {
    const status = err.message === 'Access denied' ? 403 : 401;
    res.status(status).json({ error: err.message });
  }
}
