const { User, Chat, Message } = require('./src/db.ts')

for (let key in User){
    console.log(key, User[key]);
    
}
export async function populateDB() {
    
    try{

        const user = await User.create({
            email:"some@thingemail.com",
            name: "PIrulito",
            moon:"aries"
        })


    }catch(e){
        console.log("ERROR ON POPULATE", e);
        
    }
}



