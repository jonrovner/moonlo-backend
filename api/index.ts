require("dotenv").config();
const server = require("./src/app.ts");
//const database = require("./src/db.ts");
//const firebaseAdmin = require("../firbase-config")

//const {client} = require('./src/mongo')

//import { populateMongo } from "./utils";
//const {createUser} = require('./src/users')
//console.log("create user", createUser);
/* 
async function run() {
  try {
   const result = await createUser({
      name:"pirulo",
      email:"pirulo@mail",
      location:"string",
      city:"string",
      movies:["string"],
      books:["string"],
      music:["string"],
      yearOfBirth:"string",
      aboutMe:"string",
      gender:"string",
      lookingFor:"string",
      smoking:true,
      drink:false,
      kids:true,
      minAge:"string",
      maxAge:"string",
      sun:"string",
      moon:"string",
      asc:"string"
      })
    // Connect the client to the server (optional starting in v4.7)
  //  await populateMongo()

    
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("finally");
    
  }
}
try{
  run().catch(console.dir);;
}catch (e){
  console.log("MONGO ERROR", e);
  
} */
import { populateDB, getUserWithChats, getUsersByMoon } from "./utils";
 
  //database.sequelize.sync({ force: true }).then( async () => {
    
    /* await populateDB();
    
    const users = await getUsersByMoon("aries"); 
    console.log("USERS ", users.map((u:any) => u.name));
    console.log("Location Pedro ", users[0].Locations[0].latitude, users[0].Locations[0].longitude);
    
    console.log("firebase", firebaseAdmin);
     */

    //const user = await getUserWithChats(users[0].id);
    //console.log("USER WITH CHATS", user);

    

 /* 
}).catch((e) => { console.log("ERROR FROM SEQUELIZE", e);
});


/* server.listen(process.env.PORT, () => {
  console.log("%s listening at 3001");
}); */

server.listen(process.env.PORT, () => {

  console.log("listening 3001");
});