import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  moon: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    moon!: string;
    
   /*  static associate(models: any) {
      // define association here   
       User.hasMany(models.Chat);
    } */
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {               
        len: {
          args: [2, 30],
          msg: "El nombre debe tener mas de 2 caracteres"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull:{msg: "No puede estar vacio"},
        isEmail: {msg: "Debe ser un email valido"}           
      }
    },
    moon: {
      type: DataTypes.STRING,        
    }
    
   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};