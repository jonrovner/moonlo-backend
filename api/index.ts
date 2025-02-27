require("dotenv").config();


const server = require("./src/app.ts");
const database = require("./src/db.ts");
import { populateDB } from "./utils";
 
  database.sequelize.sync({ force: false }).then(() => {
    
    populateDB();

    server.listen(process.env.PORT, () => {
      console.log("%s listening at 3001");
    });
  });
 /* 
}).catch((e) => { console.log("ERROR FROM SEQUELIZE", e);
});


/* server.listen(process.env.PORT, () => {
  console.log("%s listening at 3001");
}); */