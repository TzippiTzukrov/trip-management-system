import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js';
import { verifyTeacherToken } from './src/middleware/verifyTeacher.js';


import teachersRoutes from './src/routes/teachersRoutes.js';
import studentsRoutes from './src/routes/studentsRoutes.js';
import locationsRoutes from './src/routes/locationsRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.use((socket, next) => {
  try {
    verifyTeacherToken(socket.handshake.auth?.token);
    socket.join('teachers');
    next();
  } catch (err) {
    next(new Error(err.message));
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/teachers', teachersRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT;

try {
  await connectDB();
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
  console.error(err);
  process.exit(1);
}
