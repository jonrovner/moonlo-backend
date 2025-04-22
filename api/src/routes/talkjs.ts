const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

const { auth } = require('express-oauth2-jwt-bearer');

interface AuthRequest extends Request {
    auth?: {
        payload?: {
            sub: string;
        };
    };
}

const checkJwt = auth({
    audience: 'https://moonlo-api',
    issuerBaseURL: 'https://moonlo.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Generate TalkJS token
router.get('/token', checkJwt, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.auth?.payload?.sub; // Get user ID from Auth0 token
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const encoded_jwt = jwt.sign({ tokenType: 'user' },process.env.TALKJS_SECRET_KEY, {
            issuer: 'tsCGxV3Q',
            subject: userId,
            expiresIn: '1d',
          });

        // Generate TalkJS token
        const token = jwt.sign(
            {
                sub: userId,
                role: 'user',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
            },
            process.env.TALKJS_SECRET_KEY
        );

        res.status(200).json({ token: encoded_jwt });
    } catch (error) {
        console.error('Error generating TalkJS token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router; 