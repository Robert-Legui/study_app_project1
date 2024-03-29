
const { sequelize } = require("../connection");
const { UserModel } = require("../model/ThemesProperties");
//const UserModel = require("../model/UserModel");

const listar = async function (textoBuscar) {
  console.log("listar usuarios");
  try {
    const users = await sequelize.query(`SELECT * 
      FROM users 
      WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`);
    //console.log(JSON.stringify(users[0]));
    if (users && users[0]) {
      return users[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (codigo) {
  console.log("consultar 1 usuario por codigo: "+codigo);
  try {
    const userModelResult = await UserModel.findByPk(codigo);
    if (userModelResult) {
      //console.log(`userModelResult: ${JSON.stringify(userModelResult)}`)
      return userModelResult;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (
  id,
  name,
  last_name,
  avatar,
  email,
  password,
  admin,
  deleted
) {
  console.log("actualizar usuarios");
  //Variables
  let userReturn = null; //guarda el user que se va a incluir o editar
  //const data = req.body; //se obtiene los datos e la peticion
  //const id = req.body.id;
  const data = { id, name, last_name, avatar, email, password, admin, deleted };

  try {
    let userExist = null;
    if (id) {
      userExist = await UserModel.findByPk(id);
    }
    if (userExist) {
      userReturn = await UserModel.update(data, { where: { id: id } });
      userReturn = data;
    } else {
      data.deleted = 0;
      data.id = null;
      userReturn = await UserModel.create(data);
      if(userReturn.id==1){
        await userReturn.update({admin:true})
      }
      //console.log(`userReturn: ${JSON.stringify(userReturn)}`)
    }
    return userReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (codigo) {
  console.log("eliminar usuarios");
  try {
    await sequelize.query("UPDATE users SET deleted=true WHERE id= " + codigo);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//lo que esta entre la llave es json
module.exports = {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
};
