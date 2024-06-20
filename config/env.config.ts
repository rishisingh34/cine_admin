import dotenv from 'dotenv';
dotenv.config();

const PORT:string= process.env.PORT || '3000';
const DBURI:string= process.env.DBURI ;
const ACCESS_TOKEN_SECRET:string|undefined= process.env.ACCESS_TOKEN_SECRET;    

export {PORT,DBURI, ACCESS_TOKEN_SECRET};