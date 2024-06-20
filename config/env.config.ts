import dotenv from 'dotenv';
dotenv.config();

const PORT:string= process.env.PORT || '3000';
const DBURI:string= process.env.DBURI || "mongodb://localhost:27017/studentDb" ;
const ACCESS_TOKEN_SECRET:string|undefined= process.env.ACCESS_TOKEN_SECRET;    
const EMAIL:string | undefined=process.env.EMAIL; 
const PASS:string |undefined = process.env.PASS;


export {PORT,DBURI, ACCESS_TOKEN_SECRET, EMAIL, PASS};