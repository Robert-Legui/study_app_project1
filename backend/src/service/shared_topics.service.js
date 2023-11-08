//const TopicsModel = require("../../models/TopicsModel");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../connection");
const { SharedTopics, UserModel } = require("../model/ThemesProperties");
//const { TopicsModel } = require("../model/TopicsModel");

const listar = async function (theme_id, theme_prop_id, topic_id) {
  console.log("listar topicos");
  try {
    const shared_topics = await SharedTopics.findAll(
      {
        where:{
          theme_id,
          theme_prop_id,
          topic_id
        },
        order: Sequelize.col('id')
      }
    )
    if (shared_topics) {
      return shared_topics;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const validaEmail = async function(theme_id, theme_prop_id, topic_id, email){
  console.log("Validar email de usuario");
  try {
    const userModelResult = await UserModel.findOne(
      {
        where:{
          email
        },
        order: Sequelize.col('id')
      }
    );
    if (userModelResult) {
      const shared_topicsModelResult = await SharedTopics.findAll({
        where: {
          theme_id,theme_prop_id,topic_id, user_id: userModelResult.id
        }
      })
      if(!shared_topicsModelResult[0]){
        return userModelResult;
      }else{
        throw 'Topico ya compartido con este usuario'
      }
    } else {
      //return [];
      throw 'No Existe usuario con ese email'
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const consultarPorCodigo = async function (id, theme_id, theme_prop_id,topic_id) {
  console.log("consultar 1 topico por codigo");
  try {
    const shared_topicsModelResult = await SharedTopics.findOne(
      {
        where:{
          id,
          theme_id,
          theme_prop_id,
          topic_id
        },
        order: Sequelize.col('id')
      }
    );
    if (shared_topicsModelResult) {
      return shared_topicsModelResult;
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
  theme_id,
  theme_prop_id,
  topic_id,
  user_id
) {
  console.log("actualizar topicos");

  let shared_topicsReturn = null;
  let data = {
    id,
    theme_id,
    theme_prop_id,
    topic_id,
    user_id
  };

  try {
    let shared_topicsExist = null;
    if (id) {
      shared_topicsExist = await SharedTopics.findOne(
        {
          where:{
            id, theme_id, theme_prop_id, topic_id
          },
          order: Sequelize.col('id')
        }
      );
    }
    if (shared_topicsExist) {
      shared_topicsReturn = await SharedTopics.update(data, { where: { id, theme_id, theme_prop_id, topic_id } });
      shared_topicsReturn = data;
    } else {
      let id2 = (await SharedTopics.max('id',{
        where:{
          theme_id, theme_prop_id, topic_id
        }
      }) ?? 0) + 1
    data = { id:id2,theme_id,theme_prop_id,topic_id,user_id}
      shared_topicsReturn = await SharedTopics.create(data);
    }
    return shared_topicsReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id, theme_id, theme_prop_id, topic_id) {
  console.log("eliminar topicos");
  try {
    //pide tb poner topic_id (??)
    SharedTopics.destroy(
      { where: { id, theme_id, theme_prop_id, topic_id } },
      { truncate: false }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  validaEmail,
  actualizar,
  eliminar,
};
