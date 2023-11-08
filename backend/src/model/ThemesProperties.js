const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../connection");
//const UserModel = require("./UserModel");
//const ThemesModel = require("./Themes");
//const Themes = require("./Themes");
// module.exports = (sequelize, DataTypes) => {
const Themes = sequelize.define("Themes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: 'Themes',
  timestamps: false
});

// ThemesModel.associate = models => {
//   ThemesModel.hasMany(models.ThemesProperties, {
//     as: 'ThemesProperties', // Asegúrate de que coincida con el alias en la definición de la asociación en ThemesPropertiesModel
//     foreignKey: 'theme_id'
//   });
// };


const ThemesProperties = sequelize.define("ThemesProperties", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  theme_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true
  },
  property_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  property_value: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'ThemesProperties',
  timestamps: false,

});

const Topics = sequelize.define("Topics", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  theme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  theme_prop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  priority: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  prc_completed: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  comment: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
}, {
  tableName: 'topics',
  timestamps: false
});

const SharedTopics = sequelize.define("SharedTopics", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  theme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  theme_prop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'SharedTopics',
  timestamps: false
});

const UserModel = sequelize.define('users',{
  //Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  last_name:{
    type: DataTypes.STRING,
    allowNull:true
  },
  avatar:{
    type: DataTypes.STRING,
    allowNull:true
  },
  email:{
    type: DataTypes.STRING,
    allowNull:true,
    unique: true
  },
  password:{
    type: DataTypes.STRING,
    allowNull:true
  },
  token:{
    type: DataTypes.STRING,
    allowNull:true
  },
  deleted:{
    type: DataTypes.BOOLEAN,
    default:false
  },
  admin:{
    type: DataTypes.BOOLEAN,
    default:false
  },
},{
    //Other model options go here
    //  sequelize,
    //  modelName: 'users',
    tableName: 'users',
    timestamps: false
});

// ThemesPropertiesModel.associate = models => {
//   ThemesPropertiesModel.belongsTo(models.Themes, {
//     foreignKey: 'theme_id'
//   });
// };


Themes.hasMany(ThemesProperties, {
  foreignKey: 'theme_id'
});

ThemesProperties.belongsTo(Themes);

ThemesProperties.hasMany(Topics, {
  foreignKey: ['theme_id', 'theme_prop_id']
})

Topics.hasMany(SharedTopics, {
  foreignKey:['theme_id', 'theme_prop_id', 'topic_id']
})

SharedTopics.hasOne(UserModel, {
  foreignKey: 'user_id'
})


//   return ThemesPropertiesModel;
// };
module.exports = {
  Themes,
  ThemesProperties,
  Topics,
  SharedTopics,
  UserModel
}