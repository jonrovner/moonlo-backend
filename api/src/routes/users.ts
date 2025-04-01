const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

const {createUser, getUsersByMoon, getUserById, getUsers, addToFavs} = require('../services/users')
const {getImageURL} = require('../services/pictures')

//get all users
router.get('/', async function (req:Request, res:Response){
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

//create a user
router.post('/', async function (req:Request, res:Response){
    
    try {
        const { encodedImage, ...userData } = req.body;
        if (!encodedImage) {
            return res.status(400).json({ error: "Missing encodedImage" });
        }
        const picture_url = await getImageURL(encodedImage);
        const newUser = {
            ...userData,
            picture_url,
            favs: [],
        };
        const result = await createUser(newUser)
        if (result.acknowledged){
            res.status(201).json({new_user: result.insertedId})
        }
        res.status(500).json({ error: "Failed to create user" });
        
    } catch(e){
        console.error("Error creating user:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }   
})

//get users by moon

router.get('/moon/:moon', async function (req:Request, res:Response) {
    try {
        const { moon } = req.params;
        const users = await getUsersByMoon(moon);

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found for this moon sign" });
        }
        res.json(users);

    } catch (error) {
        console.error("Error fetching users by moon sign:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

//get user by id
router.get('/:id', async function (req:Request, res:Response) {
    console.log("HEADERS : ", req.headers );
    

    try {
        const { id } = req.params;
        const profile = await getUserById(id);

        if (!profile) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//add user to user's favs
router.post('/:id/favs', async function (req:Request, res:Response) {

    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "Missing user_id" });
        }

        const result = await addToFavs(id, user_id);
        if (!result) {
            return res.status(500).json({ error: "Failed to add to favorites" });
        }

        res.status(200).json({ message: "User added to favorites" });
    } catch (error) {
        console.error("Error adding user to favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;