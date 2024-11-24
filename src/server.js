import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';


dotenv.config();

export async function startServer() {
  try {
    const app = express();
    const PORT = Number(env('PORT', '3031'));
    app.use(express.json());
    app.use(cors());

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/', (req, res) => {
      res.json({
        message: 'Hello world',
      });
    });

    app.get('/students', async (req, res) => {
      const students = await getAllStudents();
      res.status(200).json({
        status: 200,
        message: 'Successfully found students!',
        data: students,
      });
    });

    app.get('/students/:studentId', async (req, res) => {
      const { studentId } = req.params;
      const student = await getStudentById(studentId);

      if (!student) {
        res.status(404).json({
          message: 'Student not found',
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found student with id ${studentId}!`,
        data: student,
      });
    });

    app.use('*', (req, res) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    app.use((error, req, res) => {
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
