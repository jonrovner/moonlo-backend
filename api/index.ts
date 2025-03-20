require("dotenv").config();
const server = require("./src/app.ts");
import { populateMongo } from "./utils";

server.listen(process.env.PORT, async () => {
  await populateMongo()
  console.log("listening 3001");
});