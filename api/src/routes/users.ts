const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
const {createUser, getUsersByMoon, getUserById, getUsers} = require('../services/users')

router.get('/', async function (req:Request, res:Response){

    const users = await getUsers()
   
    res.status(200).json(users)

})


router.post('/', async function (req:Request, res:Response){
    
    try {
        const result = await createUser(req.body)
        if (result.acknowledged){
            res.status(201).json({new_user: result.insertedId})
        }
        console.log("result", result);
        
    } catch(e){
        console.log("error creating user", e);        
    }   
})

router.get('/moon/:moon', async function (req:Request, res:Response) {

    console.log('req params', req.params);
    

    const {moon} = req.params
    
    try {
        const users:any = await getUsersByMoon(moon)
        res.json(users)
        

    } catch(e){

        console.log("GET USERS ERROR", e);
        
    }
    
})

router.get('/:id', async function (req:Request, res:Response) {


    const {id} = req.params
    
    const profile = await getUserById(id)
    if (profile){
        
        res.status(200).json(profile)
    }
    else {
        res.send("no profile")
    }
    


})

module.exports = router;