import  express, { Application } from "express";
import {dictionaryRouter} from './dictionaryRoutes'
import { userRouter } from "./userRoutes";

export function routerApi(app: Application) {
  const router = express.Router();
  app.use('/api/v1', router); 
  router.use('/dictionary', dictionaryRouter);
  router.use('/user', userRouter);
}