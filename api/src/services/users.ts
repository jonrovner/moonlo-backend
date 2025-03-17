const {client} = require('../mongo')

interface User {
    auth0_id:string
    name:string
    email:string
    location:string
    city:string
    movies:string[]
    books:string[]
    music:string[]
    yearOfBirth:string
    aboutMe:string
    gender:string
    sun:string
    moon:string
    asc:string
}

async function createUser(user:User){

    try {
        await client.connect()
        const db = client.db("moonlo")
        const users = db.collection("users")
        const result = await users.insertOne(user)
        return result
    } catch(e){
        console.log('ERROR CREATING USER', e)
    }finally{
        client.close()
    }
}

async function getUsersByMoon(moon:string){

    try {
        await client.connect()
        const db = client.db("moonlo")
        const users = db.collection("users")
        const query = { moon: moon };
        const usersWithMoon = await users.find(query).toArray()
        return usersWithMoon
        

    } catch(e) {

        console.log("ERROR GETTING USERS", e);
        
    } finally {
        client.close()
    }
}

async function getUserById(id:string){

    try{
        await client.connect()
        const db = client.db("moonlo")
        const users = db.collection("users")
        const query = { auth0_id: id };
        const userFromDB = await users.findOne(query)
        return userFromDB
    } catch(e) {

        console.log("ERROR GETTING USERS", e);
        
    } finally {
        client.close()
    }


}

async function getUsers() {
    try{
        await client.connect()
        const db = client.db("moonlo")
        const users = db.collection("users")

        const result = users.find().toArray()
        return result

    }catch(e){
        console.log("error getting users", e);
        

    }finally{
        //client.close()
    }
}

module.exports = {
    createUser, 
    getUsersByMoon, 
    getUserById,
    getUsers
}