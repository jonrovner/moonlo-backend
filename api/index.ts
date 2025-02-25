
require("dotenv").config();
//console.log("ENVIRONMENT ", process.env);

const db_module:any = require('./src/db.ts');
const server = require("./src/app.ts");


// Syncing all the models at once.

db_module.sequelize.sync({ force: true }).then(() => {
  

  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001");
  });
}).catch((e:any) => { console.log("ERROR FROM SEQUELIZE");
});