import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import userRoutes from './routes/userRoute';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000');
});

export default app;
