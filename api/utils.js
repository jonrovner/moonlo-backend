import { where } from 'sequelize';

const { User, Chat, Message, Location } = require('./src/db.ts')


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