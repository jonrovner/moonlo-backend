import { where } from 'sequelize';

const { User, Chat, Message } = require('./src/db.ts')


export async function populateDB() {
    
    try{

        const users_created = await User.bulkCreate([
            { email: "user1@thingemail.com", name: "Pedro", moon: "aries" },
            { email: "user2@thingemail.com", name: "Juan", moon: "aries" },
            { email: "user3@thingemail.com", name: "Maria", moon: "aries" }
        ], { returning: true });
        
        const users = await User.findAll({ order: [['createdAt', 'ASC']] });
        
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
            { chat_id: chats[0].id, sender_id: users[0].id, content: "Hola Juan" },
            { chat_id: chats[0].id, sender_id: users[1].id, content: "Hola Pedro" },
            { chat_id: chats[1].id, sender_id: users[0].id, content: "Hola Maria" },
            { chat_id: chats[1].id, sender_id: users[2].id, content: "Hola Pedro" },
            { chat_id: chats[2].id, sender_id: users[1].id, content: "Hola Maria" },
            { chat_id: chats[2].id, sender_id: users[2].id, content: "Hola Juan" }
        ]);
        
        const userOne = await User.findAll({ 
            where: { id: users[0].id }, 
            include: {
                model: Chat,
                through: { attributes: [] },
                include: {
                    model: Message,
                    attributes: ['content', 'createdAt'],
                }
            }
        });
        console.log("userOne", userOne[0].Chats[0].Messages[0].content);

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