const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';
const {createUser, getUsersByMoon, getUserById, getUsers} = require('../services/users')
const {getImageURL} = require('../services/pictures')

router.get('/', async function (req:Request, res:Response){

    const users = await getUsers()
   
    res.status(200).json(users)

})


router.post('/', async function (req:Request, res:Response){
    
    
    try {
        
        const picture_url = await getImageURL(req.body.encodedImage)

        const user_data = {
            auth0_id:req.body.auth0_id,
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
            city:req.body.city,
            movies:req.body.movies,
            books:req.body.books,
            music:req.body.music,
            yearOfBirth:req.body.yearOfBirth,
            aboutMe:req.body.aboutMe,
            gender:req.body.gender,
            sun:req.body.sun,
            moon:req.body.moon,
            asc:req.body.asc,
            picture_url:picture_url
            
        }

        const result = await createUser(user_data)
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