import { config, dialect } from './config';
import { Sequelize } from 'sequelize';

export default new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect 
    }
);