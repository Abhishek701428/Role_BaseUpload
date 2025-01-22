import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import connectToDatabase from './database/db';
import path from 'path';
import authRoutes from './modules/auth/authroutes'
import document from './modules/document/document-routes'
import * as dotenv from "dotenv";
dotenv.config();
connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hi, I am Hi Tech Project!</h1>`);
});
app.use('/auth', authRoutes);
app.use('/auth', document);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
