import express, {Request, Response, NextFunction} from "express";
const userRoutes = require('../src/routes/users');

const server = express()

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));
server.use('/public', express.static(__dirname + '/public'));
server.use('/api/users', userRoutes)
server.get('/', async (req:Request, res:Response) => {
  
    
  res.send('Hola!')
})

/* server.post('/api/users', async (req:Request, res:Response) =>{

console.log("BODY : ", req.body);
res.send("ok")

}) */

module.exports = server