import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import reviewRoutes from './routes/review';
import mongoose from 'mongoose';
import { setupSwagger } from './swagger';


const app = express();

mongoose.connect(process.env.DB_URL as string);


app.use(cors());
app.use(bodyParser.json());


app.use('/reviews', reviewRoutes);
app.get('/', (req, res) => {

    res.status(200).json({ message: "Server is running" })
});

// Setup Swagger
setupSwagger(app);


export default app;
