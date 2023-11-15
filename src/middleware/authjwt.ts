import { Request, Response, NextFunction } from "express";
import { jwtKey } from "../config/config";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = String(req.headers["x-access-token"]);
    if (!token) {
        return res.status(403).send({
            message: "No se encontro el token!"
        });
    }

    jwt.verify(
        token,
        jwtKey,
        async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "el token ha expirado, favor de iniciar sesion!",
                });
            }
            res.cookie('user', decoded);
            next();
        }
    );
};