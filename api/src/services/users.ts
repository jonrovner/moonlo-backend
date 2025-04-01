const { client } = require("../mongo");

interface User {
    auth0_id: string;
    name: string;
    email: string;
    location: string;
    city: string;
    movies: string[];
    books: string[];
    music: string[];
    yearOfBirth: string;
    aboutMe: string;
    gender: string;
    sun: string;
    moon: string;
    asc: string;
    picture_url: string;
    favs:string[]
}

// Ensure MongoDB client is connected only once
async function getDb() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db("moonlo");
}

async function createUser(user: User) {
    try {
        const db = await getDb();
        const users = db.collection("users");
        let existing = await users.findOne({email: user.email})
        if (existing) {
            return {error: "existing user"}
        }
        const result = await users.insertOne(user);
        return result;
    } catch (e) {
        console.error("ERROR CREATING USER", e);
    }
}

async function getUsersByMoon(moon: string) {
    try {
        const db = await getDb();
        const users = db.collection("users");
        return await users.find({ moon }).toArray();
    } catch (e) {
        console.error("ERROR GETTING USERS BY MOON", e);
    }
}

async function getUserById(id: string) {
    try {
        const db = await getDb();
        const users = db.collection("users");
        return await users.findOne({ auth0_id: id });
    } catch (e) {
        console.error("ERROR GETTING USER BY ID", e);
    }
}

async function getUsers() {
    try {
        const db = await getDb();
        console.log("GOT A DB");
        
        const users = db.collection("users");
        return await users.find().toArray();
    } catch (e) {
        console.error("ERROR GETTING USERS", e);
    }
}

async function addToFavs(my_id:string, user_id:string) {
    try {
        const db = await getDb();
        const users = db.collection('users')

        const result = await users.updateOne(
            { auth0_id: my_id },
            { $push: { favs: user_id } }
        );
        if (result.modifiedCount === 0) {
            console.log("No document updated. User might not exist.");
            return false
        } else {
            console.log("Successfully added to favs.");
            return true
        }



} catch(e){
    console.log("ERROR ADDING TO FAVS");
    
}
}

module.exports = {
    createUser,
    getUsersByMoon,
    getUserById,
    getUsers,
    addToFavs
};
