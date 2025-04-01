import express, {Request, Response, NextFunction} from "express";
const userRoutes = require('../src/routes/users');
var morgan = require('morgan')

const server = express()

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }))
server.use(morgan('tiny'))
server.use('/public', express.static(__dirname + '/public'));
server.use('/api/users', userRoutes)

server.get('/', async (req:Request, res:Response) => {
  res.send('Hola!')
})
module.exports = server