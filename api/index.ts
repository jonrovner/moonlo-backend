require("dotenv").config();

const server = require("./src/app.ts");
//const database = require("./src/db.ts");
//const firebaseAdmin = require("../firbase-config")

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