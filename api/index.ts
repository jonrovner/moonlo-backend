require("dotenv").config();
const server = require("./src/app.ts");

server.listen(process.env.PORT, () => {

  console.log("listening 3001");
});