
const { User, Chat, Message, Location } = require('./src/db.ts')

const {client} = require('./src/mongo')
import { createUser } from './src/services/users';


export async function getUsersByMoon(moon) {
    try {
        const users = await User.findAll({ where: { moon: moon }, include: Location });
        //console.log({"users": users});
        return users;
    } catch (e) {
        console.log("ERROR ON GET USERS BY MOON", e);
    }
}

export async function getUserbyId(userId) {
    try {
        const user = await User.findByPk(userId, { include: Location });
        //console.log({"user": user});
        return user;
    } catch (e) {   
        console.log("ERROR ON GET USER BY ID", e);
    }   
}

export async function getUserWithChats(userId) {
    try {
        const user = await User.findByPk(userId, { 
            include: [{
                model: Chat,
                through: { attributes: [] },
                include: {
                    model: Message,
                    attributes: ['content', 'createdAt', 'message_status'],
                }
            }, 
            {
                model: Location
            }
            ]
        });
        //console.log({"user": user});
        const {content, message_status, createdAt} = user.Chats[0].Messages[0];

        console.log("content", content);
        console.log("status", message_status);
        console.log("createdAt", createdAt);

        return user

    } catch (e) {
        console.log("ERROR ON GET USER WITH CHATS", e);
    }
}

export async function createChatWithUsers(users) {
    try {
        const chat = await Chat.create();
        await chat.addUsers(users);
        return chat;
    } catch (e) {
        console.log("ERROR ON CREATE CHAT WITH USERS", e);
    }
}


export async function populateDB() {
    
    try{
        const users_created = await User.bulkCreate([
            { email: "user1@thingemail.com", name: "Pedro", moon: "aries" },
            { email: "user2@thingemail.com", name: "Juan", moon: "aries" },
            { email: "user3@thingemail.com", name: "Maria", moon: "aries" }
        ], { returning: true });
        
        const users = await User.findAll({ order: [['createdAt', 'ASC']] });
        
        const location1 = await Location.create({ latitude: "-36.7793", longitude: "-59.8606", user_id:users[0].id })
        const location2 = await Location.create({ latitude: "-36.7911", longitude: "-59.8595", user_id:users[1].id })
        const location3 = await Location.create({ latitude: "-36.7836", longitude: "-59.8658", user_id:users[2].id })   
        
        await users[0].addLocation(location1);
        await users[1].addLocation(location2);
        await users[2].addLocation(location3);    

        const chats = await Chat.bulkCreate([
            { },
            { },
            { }
        ], { returning: true });

       // console.log("chats created", chats);
        
        await chats[0].addUsers([users[0], users[1]]);
        await chats[1].addUsers([users[0], users[2]]);
        await chats[2].addUsers([users[1], users[2]]);

        
        const messages = await Message.bulkCreate([
            { chat_id: chats[0].id, sender_id: users[0].id, content: "Hola Juan" , location_id: location1.id},
            { chat_id: chats[0].id, sender_id: users[1].id, content: "Hola Pedro", location_id: location2.id },
            { chat_id: chats[1].id, sender_id: users[0].id, content: "Hola Maria", location_id: location1.id }, 
            { chat_id: chats[1].id, sender_id: users[2].id, content: "Hola Pedro", location_id: location3.id },
            { chat_id: chats[2].id, sender_id: users[1].id, content: "Hola Maria", location_id: location2.id },
            { chat_id: chats[2].id, sender_id: users[2].id, content: "Hola Juan", location_id: location3.id }
        ]);
           
        
        const userOne = await User.findAll({ 
            where: { id: users[0].id }, 
            include: [{
                model: Chat,
                through: { attributes: [] },
                include: {
                    model: Message,
                    attributes: ['content', 'createdAt'],
                    order: [['createdAt', 'DSC']],
                    include: {
                        model: Location
                    }
                }
            }, 
            {
                model: Location
            }
            ]
        });
        
        const {content, createdAt} = userOne[0].Chats[0].Messages[0];

        console.log("content", content);    
        console.log("createdAt", createdAt.toLocaleString());
        console.log("location", userOne[0].Chats[0].Messages[0].Location.latitude);
        /* let user_chats = await userOne[0].getChats();
        console.log("user_chats", user_chats);
        
        user_chats.forEach( async chat => { 
            const mesages = await chat.getMessages()
            messages.forEach( message => {
            console.log("message from chat ", chat.id, message.content);
            });
            
        }); */
       // console.log("user_chats", user_chats);

    
        
    }catch(e){
        console.log("ERROR ON POPULATE", e);
        
    }
}
const users = [
    {
      auth0_id: "auth0|001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      location: { latitude: "40.7128", longitude: "-74.0060" },
      city: "New York",
      movies: ["Inception", "Interstellar", "The Matrix"],
      books: ["1984", "To Kill a Mockingbird", "Dune"],
      music: ["Pop", "Rock", "Classical"],
      yearOfBirth: "1990",
      aboutMe: "Tech enthusiast and bookworm.",
      gender: "Female",
      sun: "Leo",
      moon: "Virgo",
      asc: "Libra",
    },
    {
      auth0_id: "auth0|002",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      location: { latitude: "34.0522", longitude: "-118.2437" },
      city: "Los Angeles",
      movies: ["Fight Club", "Pulp Fiction", "The Dark Knight"],
      books: ["Brave New World", "Moby Dick", "The Hobbit"],
      music: ["Hip Hop", "Jazz", "Rock"],
      yearOfBirth: "1985",
      aboutMe: "Music producer and movie buff.",
      gender: "Male",
      sun: "Sagittarius",
      moon: "Scorpio",
      asc: "Aries",
    },
    {
      auth0_id: "auth0|003",
      name: "Charlie Davis",
      email: "charlie.davis@email.com",
      location: { latitude: "51.5074", longitude: "-0.1278" },
      city: "London",
      movies: ["Harry Potter", "Sherlock Holmes", "The King's Speech"],
      books: ["Pride and Prejudice", "Great Expectations", "Jane Eyre"],
      music: ["Indie", "Classical", "Alternative"],
      yearOfBirth: "1992",
      aboutMe: "Avid reader and tea lover.",
      gender: "Non-binary",
      sun: "Taurus",
      moon: "Pisces",
      asc: "Gemini",
    },
    {
      auth0_id: "auth0|004",
      name: "Diana Lee",
      email: "diana.lee@email.com",
      location: { latitude: "37.7749", longitude: "-122.4194" },
      city: "San Francisco",
      movies: ["Blade Runner", "Ex Machina", "Her"],
      books: ["Neuromancer", "Snow Crash", "The Road"],
      music: ["Electronic", "Ambient", "Experimental"],
      yearOfBirth: "1988",
      aboutMe: "Tech geek exploring AI ethics.",
      gender: "Female",
      sun: "Aquarius",
      moon: "Libra",
      asc: "Sagittarius",
    },
    {
      auth0_id: "auth0|005",
      name: "Ethan Carter",
      email: "ethan.carter@email.com",
      location: { latitude: "48.8566", longitude: "2.3522" },
      city: "Paris",
      movies: ["Amélie", "Midnight in Paris", "Blue Is the Warmest Color"],
      books: ["Les Misérables", "The Stranger", "Madame Bovary"],
      music: ["Jazz", "Blues", "Classical"],
      yearOfBirth: "1995",
      aboutMe: "Art lover and history enthusiast.",
      gender: "Male",
      sun: "Pisces",
      moon: "Cancer",
      asc: "Virgo",
    },
    {
      auth0_id: "auth0|006",
      name: "Fiona Garcia",
      email: "fiona.garcia@email.com",
      location: { latitude: "19.4326", longitude: "-99.1332" },
      city: "Mexico City",
      movies: ["Coco", "Roma", "Pan's Labyrinth"],
      books: ["One Hundred Years of Solitude", "The Alchemist", "Like Water for Chocolate"],
      music: ["Folk", "Latin", "Pop"],
      yearOfBirth: "1993",
      aboutMe: "Creative soul and food lover.",
      gender: "Female",
      sun: "Cancer",
      moon: "Leo",
      asc: "Scorpio",
    },
    {
      auth0_id: "auth0|007",
      name: "George Miller",
      email: "george.miller@email.com",
      location: { latitude: "52.5200", longitude: "13.4050" },
      city: "Berlin",
      movies: ["Run Lola Run", "Good Bye Lenin!", "Metropolis"],
      books: ["The Trial", "Steppenwolf", "Berlin Alexanderplatz"],
      music: ["Techno", "Electronic", "Rock"],
      yearOfBirth: "1984",
      aboutMe: "DJ and nightlife explorer.",
      gender: "Male",
      sun: "Capricorn",
      moon: "Aquarius",
      asc: "Taurus",
    },
    {
      auth0_id: "auth0|008",
      name: "Hanna Schmidt",
      email: "hanna.schmidt@email.com",
      location: { latitude: "55.7558", longitude: "37.6173" },
      city: "Moscow",
      movies: ["Solaris", "Stalker", "Leviathan"],
      books: ["War and Peace", "Crime and Punishment", "Anna Karenina"],
      music: ["Classical", "Folk", "Jazz"],
      yearOfBirth: "1991",
      aboutMe: "Philosophy student and classic literature lover.",
      gender: "Female",
      sun: "Virgo",
      moon: "Taurus",
      asc: "Cancer",
    },
    {
      auth0_id: "auth0|009",
      name: "Isaac Kim",
      email: "isaac.kim@email.com",
      location: { latitude: "37.5665", longitude: "126.9780" },
      city: "Seoul",
      movies: ["Parasite", "Oldboy", "The Handmaiden"],
      books: ["Norwegian Wood", "Kafka on the Shore", "1Q84"],
      music: ["K-Pop", "Jazz", "Hip Hop"],
      yearOfBirth: "1994",
      aboutMe: "Musician and language learner.",
      gender: "Male",
      sun: "Scorpio",
      moon: "Aries",
      asc: "Leo",
    },
  ];
  
  async function insertUsers(users) {
    try {
      await client.connect();
      const database = client.db("moonlo");
      const collection = database.collection("users");
      await collection.deleteMany({})
  
      const result = await collection.insertMany(users);
      console.log(`${result.insertedCount} users inserted successfully.`);
    } catch (error) {
      console.error("Error inserting users:", error);
    } finally {
      await client.close();
    }
  }
  
export async function populateMongo(){
    
    await insertUsers(users)
    
}