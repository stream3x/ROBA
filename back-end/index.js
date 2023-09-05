import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './routes/usersRoutes.js'
import robaRoute from './routes/robaRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
app.use(cors());

// Routes imports:
app.use('/users', usersRoute);
app.use('/roba', robaRoute);


// Server MongoDB connect
mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'))
db.once('open', () => {
  console.log('Database MongoDB connesso!');
  app.listen(PORT, () => {
    console.log(`Il server è in ascolto sulla porta ${PORT}`);
  })
})
