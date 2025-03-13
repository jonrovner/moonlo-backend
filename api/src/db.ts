
const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../../config/config.js')['development']
//console.log("CONFIG ", config);

const db:any = {}

let sequelize = new Sequelize(config.database, config.username, config.password, config)

// Model definitions

const User = sequelize.define(
  'User',
  {
    email: {type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull:{msg: "No empty email"},
        isEmail: {msg: "must be valid email"}           
      }
      
    },
    about_me: {type: DataTypes.TEXT},
    movies: {type: DataTypes.STRING},
    music: {type: DataTypes.STRING},
    books: {type: DataTypes.STRING},
    profile_pic: {type: DataTypes.STRING},
    auth0_id: {type: DataTypes.STRING},
    email_verified: {type: DataTypes.BOOLEAN},
    moon: {type: DataTypes.STRING},
    dealbreakers: {type: DataTypes.STRING},
    looking_for: {type: DataTypes.STRING},
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    is_blocked: {type: DataTypes.BOOLEAN, defaultValue: false}
  }
)

const Chat = sequelize.define("Chat", {
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  }
});

// ChatUser (Join Table)
const ChatUser = sequelize.define("ChatUser", {
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
  userId: {
      type: DataTypes.UUID,
      references: { model: "Users", key: "id" }
  },
  chatId: {
      type: DataTypes.UUID,
      references: { model: "Chats", key: "id" }
  }
});

const Location = sequelize.define(
  'Location',
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    latitude:{
      type:DataTypes.STRING
    },
    longitude:{
      type:DataTypes.STRING
    },
    user_id:{
      type:DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      }  
  }
  })  


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
    },
    location_id:{
      type: DataTypes.UUID,
      references: {
        model:Location,
        key:'id'
      }
    },
    message_status:{
      type:DataTypes.STRING,
      defaultValue:'sent'
    }
  },
  {
    sequelize,
    modelName: 'Message'
  }
)


User.belongsToMany(Chat, { through: ChatUser });
Chat.belongsToMany(User, { through: ChatUser });

User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

User.hasMany(Location, { foreignKey: 'user_id' });
Location.belongsTo(User, { foreignKey: 'user_id' });

Message.belongsTo(Location, { foreignKey: 'location_id' });

db.User = User;
db.Chat = Chat;
db.ChatUser = ChatUser;
db.Message = Message;
db.Location = Location;
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db
