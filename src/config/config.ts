import dotenv from 'dotenv'; 
dotenv.config();

export const config: {env: string, port: number, dbUser: string, dbPassword: string, dbHost: string, dbName: string, dbPort: string} = {
  env: process.env.NODE_ENV || 'dev',
  port: Number(process.env.PORT) || 3000,
  dbUser:  process.env.DB_USER || '',
  dbPassword:  process.env.DB_PASSWORD || '',
  dbHost:  process.env.DB_HOST || '',
  dbName:  process.env.DB_NAME || '',
  dbPort:  process.env.DB_PORT || ''
}

export const dialect = "postgres";

export const jwtKey = process.env.JWT_SECRET || '';