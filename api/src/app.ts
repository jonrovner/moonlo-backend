import express, {Request, Response, NextFunction} from "express";
const { auth } = require('express-oauth2-jwt-bearer');
const userRoutes = require('../src/routes/users');
var morgan = require('morgan')

const jwtCheck = auth({
  audience: 'https://moonlo-api',
  issuerBaseURL: 'https://moonlo.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const server = express()

//server.use(jwtCheck);
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }))
server.use(morgan('tiny'))
server.use('/public', express.static(__dirname + '/public'));
server.use('/api/users', userRoutes)

server.get('/', async (req:Request, res:Response) => {
  res.send('Hola!')
})
module.exports = server