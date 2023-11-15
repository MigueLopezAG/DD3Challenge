import express from 'express'
import {generateWord, getBestResults, validateWord} from '../controllers/dictionaryController'
import { verifyToken } from '../middleware/authjwt';
export const dictionaryRouter = express.Router();

dictionaryRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


dictionaryRouter.get('/', verifyToken, generateWord)
dictionaryRouter.post('/validate-word', verifyToken,validateWord)
dictionaryRouter.get('/best-results', getBestResults)