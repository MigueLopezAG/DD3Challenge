import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import { jwtKey } from "../config/config";
import Word, {WordMap} from '../models/wordUsedModel'
import User, {UserMap} from '../models/userModel'
import database from "../config/database";
import fs from 'fs'; 

export const generateWord = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const data = fs.readFileSync('./src/config/words.txt', 'utf8');
        res.clearCookie('data');
        //const re = /([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{5})(?:\n|$)/;
        const wordList = data.split('\n');
        const wordListFiltred = wordList.filter((word:string) =>{
            return word.length === 5
        })
        let findWord, randomWord: String;
       do{
            const randomIndex = Math.floor(Math.random() * wordListFiltred.length);
            randomWord = wordListFiltred[randomIndex];
            WordMap(database)
            findWord = await Word.findAll({
                where: {
                    word:{
                        [Op.eq]: findWord
                    }
                }
            })
        } while (findWord.length !== 0)

        let saveWord = {
            word: randomWord.toUpperCase(),
            attemnts: 0,
            isDiscovered: false
        }

        const result = await Word.create(saveWord);

        const userId: number = req.cookies.user.user.id;
        const findUser = await User.findOne({ where: { id: userId } })
        await findUser?.increment('games', { by: 1 });
        
        saveWord = result.dataValues as Word;
        res.status(200).json({ message: 'Palabra generada correctamente' });
        next();
    } catch (error:any) {
        res.status(500).send({ success: false, message: error.message })
    }
}

export const validateWord = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const userWord : string = req.body.userWord.toUpperCase();
        const validateWord: string = req.cookies.data.word.toUpperCase();
        if(userWord === validateWord){ 

            const userId: number = req.cookies.user.user.id;
            const findUser = await User.findOne({ where: { id: userId } })
            await findUser?.increment('victories', { by: 1 });

            await Word.update({isDiscovered: true},{
                where: {
                    word:{
                        [Op.eq]: validateWord
                    }
                }
            })

            res.status(200).send({message: "Felicidades acertaste la palabra!!"});
        } else {
            let response:{letter: string, value: number}[] = [];
            for (let i = 0; i < validateWord.length; i++) {
                if(userWord.charAt(i) === validateWord.charAt(i)){
                    response.push({
                        letter: userWord.charAt(i),
                        value: 1
                    })
                } else if (validateWord.indexOf(userWord.charAt(i)) !== -1) {
                    response.push({
                        letter: userWord.charAt(i),
                        value: 2
                    })
                } else {
                    response.push({
                        letter: userWord.charAt(i),
                        value: 3
                    })
                }
            }
            WordMap(database)
            const findWord = await Word.findOne({
                where: {
                    word:{
                        [Op.eq]: validateWord
                    }
                }
            })
            const incrementResult = await findWord?.increment('attemnts', { by: 1 });

            if(incrementResult?.attemnts || 0 >= 5){
                generateWord(req, res, next);
                res.status(201).send({success: false, message: "se ha superado el numero maximo de intentos para adivinar la palabra!!"});
            }
            res.status(200).send(response);
        }
    } catch (error:any) {
        res.status(500).send({ success: false, message: error.message })
    }
}

export const getBestResults = async (req: Request, res: Response) => {
    try{
        WordMap(database)
        const bestResults = await Word.findAll({
            where: {isDiscovered: true},
            order: [['attemnts', 'ASC']]
        })
        console.log("bestResults", bestResults)
        res.status(200).json(bestResults)
    } catch(err:any){
        res.status(500).send({ success: false, message: err.message })
    }
}