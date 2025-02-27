import express, {Request, Response, NextFunction} from "express";


const {User} = require("../src/db.ts")

console.log("user ", User);


const server = express()


server.get('/', async (req:Request, res:Response) => {
  
  
    
  
  res.send('Hola!')
})

module.exports = server