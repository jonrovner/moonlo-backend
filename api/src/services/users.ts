const {client} = require('../mongo')

interface User {
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
    lookingFor:string
    smoking:boolean
    drink:boolean
    kids:boolean
    minAge:string
    maxAge:string
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
        console.log('RESULT', result);
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
        console.log("Found", usersWithMoon);
        return usersWithMoon
        

}catch(e){
    
    console.log("ERROR GETTING USERS", e);
    
}finally{
    client.close()
}
}

module.exports = {createUser, getUsersByMoon}