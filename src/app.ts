import http from 'http';
import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import {routerApi} from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();
export const app = express(); 

const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(cookieParser());

// cron.schedule('*/5 * * * *', () => generateWord)

routerApi(app);
 
const server = http.createServer(app);
  
server.listen(port,()=>{
    console.log("Port ==> ", port);
});