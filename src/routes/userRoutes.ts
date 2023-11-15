import express from 'express'
import {validateUser, getInfoUser, getTopTenUsers} from '../controllers/userController'
import { verifyToken } from '../middleware/authjwt';

export const userRouter = express.Router();

userRouter.post('/', validateUser)
userRouter.get('/', verifyToken, getInfoUser)
userRouter.get('/best-players', getTopTenUsers)