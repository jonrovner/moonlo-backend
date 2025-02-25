import express, {Request, Response, NextFunction} from "express";

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const routes = require('./routes/index.ts');

//require('./db.ts');
//require('dotenv').config()


const server = express()


server.get('/', async (req, res) => {
  
  
    
  
  res.send('Hola!')
})

 export default server