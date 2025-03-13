const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
const {createUser, getUsersByMoon} = require('../services/users')

router.post('/', async function (req:Request, res:Response){
    
    try {
        const result = await createUser(req.body)
        console.log("result", result);
        
    } catch(e){
        console.log("error creating user", e);        
    }   
})

router.get('/:moon', async function (req:Request, res:Response) {

    const {moon} = req.params
    
    try {
        const users:any = await getUsersByMoon(moon)
        res.json(users)
        

    } catch(e){

        console.log("GET USERS ERROR", e);
        
    }
    


})

module.exports = router;