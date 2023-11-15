import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User, {UserMap} from '../models/userModel'
import database from "../config/database";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv'; 
dotenv.config();

export const validateUser = async ( req: Request, res: Response) => {
    try{
        const userName : string = req.body.userName.toUpperCase();
        const password : string = req.body.password
        UserMap(database)
        const findUser = await User.findOne({
            where: {
                userName:{
                    [Op.eq]: userName
                }
            }
        })
        if(findUser === null){
            let saveUser = {
                userName,
                password: await bcrypt.hash(password, 15),
                victories: 0,
                games: 0
            }
            const result: User = await User.create(saveUser);

            const token = jwt.sign(
                {user: result}, 
                process.env.JWT_SECRET || '',
                {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: '15m', //15 mins
                }
            );
       
            res.status(200).send({
                id: result.id,
                name: result.userName,
                victories: result.victories,
                accessToken: token,
            });
        } else {
            const passwordValid = await bcrypt.compare(password, findUser.password);
            if (!passwordValid) {
                return res.status(404).json('El nomrbe de usuario o contraseña no coinciden');
            }
            const token = jwt.sign(
                { user: findUser }, 
                process.env.JWT_SECRET || '',
                {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: '15m', //15 mins
                }
            );
       
            res.status(200).send({
                id: findUser.id,
                name: findUser.userName,
                victories: findUser.victories,
                accessToken: token,
            });
        }
    } catch (error:any) {
        res.status(500).send({ success: false, message: error.message })
    }
}

export const getInfoUser = async ( req: Request, res: Response) =>{
    try{
        
        UserMap(database)
        const userId: number = req.cookies.user.user.id;
        const findUser = await User.findOne({ where: { id: userId } })
        res.status(200).json({infoUser:{games: findUser?.games, victories: findUser?.victories}})
    } catch(err:any){
        res.status(500).send({ success: false, message: err.message })
    }
}

export const getTopTenUsers = async ( req: Request, res: Response) =>{
    try{
        UserMap(database)
        const bestPlayers = await User.findAll({
            order: [['victories', 'DESC']], 
            limit: 10
        })
        res.status(200).json(bestPlayers)
    } catch(err:any){
        res.status(500).send({ success: false, message: err.message })
    }
}
