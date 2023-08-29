import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes imports:


app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}`);
})
