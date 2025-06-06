import express, {Request, Response, NextFunction} from "express";
const { auth } = require('express-oauth2-jwt-bearer');
const userRoutes = require('../src/routes/users');
const talkjsRoutes = require('../src/routes/talkjs');
var morgan = require('morgan')
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

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
server.use('/api/talkjs', talkjsRoutes)

server.get('/', async (req:Request, res:Response) => {
  res.send('Hola!')
})

// Handle 404 routes
server.use(notFoundHandler);

// Global error handler
server.use(errorHandler);

module.exports = server