
const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../../config/config.js')['development']
console.log("CONFIG ", config);
const db:any = {}
let sequelize = new Sequelize(config.database, config.username, config.password, config)

const User = sequelize.define(
  'User',
  {
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull:{msg: "No empty email"},
        isEmail: {msg: "must be valid email"}           
      }
      
    },
    moon: {type: DataTypes.STRING},
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  }
)

console.log(User === sequelize.models.User);

const Chat = sequelize.define(
  'Chat',
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    user1:{
      type:DataTypes.STRING
    },
    user2:{
      type:DataTypes.STRING
    }

  }
)
console.log(Chat === sequelize.models.Chat);

class Message extends Model {}

Message.init(
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  
    },
    content:{
      type:DataTypes.STRING,
      allowNull:false
  
    },
    date: {
      type:DataTypes.DATE
  
    },
    sender_id:{
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      }
    },
    chat_id: {
      type: DataTypes.UUID,
      references: {
        model:Chat,
        key:'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Message'
  }
)

console.log(Message === sequelize.models.Message);

for (let key in User) {

  //console.log(key, User[key]);
  if(User.hasMany){

    User.hasMany(Chat)

  }
  if(Chat.hasMany){
    Chat.hasMany(Message)
  }
}

//User.hasMany(Chat);
//Chat.hasMany(Message)

db.User = User;
db.Chat = Chat;
db.Message = Message;

db.sequelize = sequelize;
db.Sequelize = Sequelize;



//sequelize.models.User.hasMany(sequelize.models.Chat)
//Chat.hasMany(User)
//Chat.hasMany(Message)
/* 
(async () => {
  await sequelize.sync({ force: true });
  
  console.log("sequelized");
  // Code here
})(); */

module.exports = db
