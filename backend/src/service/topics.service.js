//const TopicsModel = require("../../models/TopicsModel");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../connection");
const { Topics } = require("../model/ThemesProperties");
const { Op } = require("sequelize");
//const { TopicsModel } = require("../model/TopicsModel");

const listar = async function (theme_id, theme_prop_id, userId,orden = 'desc') {
  console.log(`listar topicos - theme_id: ${theme_id} - theme_prop_id: ${theme_prop_id} - userId: ${userId}`);
  try {
    const query = 'select t.* from topics t left join "SharedTopics" st on st.theme_id = t.theme_id and st.theme_prop_id = t.theme_prop_id and st.topic_id = t.id where  (t.owner_user_id = '+userId+' or st.user_id = '+userId+') and t.theme_id = '+theme_id+' and t.theme_prop_id = '+theme_prop_id+ ' order by t.priority asc, t.create_date '+ orden
    console.log(query)
    const topics = await sequelize.query(query)
    // const topics = await Topics.findAll(
    //   {
    //     where:{
    //       theme_id,
    //       theme_prop_id,
    //       [
    //         Op.or]: [Sequelize.literal(`exists (select 1 from "SharedTopics" where theme_id = ${theme_id} and theme_prop_id = ${theme_prop_id} and topic_id = ${topics.topic_id} and user_id = ${userId})`),
    //         {owner_user_id: userId}
    //       ]
    //     },
    //     order: Sequelize.col('id')
    //   }
    // )
    //console.log(`topics: ${JSON.stringify(topics[0])}`)
    if (topics[0]) {
      return topics[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id, theme_id, theme_prop_id) {
  console.log("consultar 1 topico por codigo");
  try {
    const topicsModelResult = await Topics.findOne(
      {
        where:{
          id,
          theme_id,
          theme_prop_id
        },
        order: Sequelize.col('id')
      }
    );
    if (topicsModelResult) {
      return topicsModelResult;
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
  create_date,
  name,
  priority,
  color,
  prc_completed,
  owner_user_id,
  comment
) {
  console.log("actualizar topicos");

  let topicsReturn = null;
  let data = {
    id,
    theme_id,
    theme_prop_id,
    create_date,
    name,
    priority,
    color,
    prc_completed,
    owner_user_id,
    comment
  };

  try {
    let topicsExist = null;
    if (id) {
      topicsExist = await Topics.findOne(
        {
          where:{
            id, theme_id, theme_prop_id
          },
          order: Sequelize.col('id')
        }
      );
    }
    if (topicsExist) {
      topicsReturn = await Topics.update({
        id,
        theme_id,
        theme_prop_id,
        name,
        priority,
        color,
        prc_completed,
        comment
      }, { where: { id, theme_id, theme_prop_id } });
      topicsReturn = data;
    } else {
      let id2 = (await Topics.max('id',{
        where:{
          theme_id, theme_prop_id
        }
      }) ?? 0) + 1
      data = {  
        id:id2,
        theme_id,
        theme_prop_id,
        create_date,
        name,
        priority,
        color,
        prc_completed,
        owner_user_id,
        comment
      }
      topicsReturn = await Topics.create(data);
    }
    return topicsReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id, theme_id, theme_prop_id) {
  console.log("eliminar topicos");
  try {
    //pide tb poner topic_id (??)
    Topics.destroy(
      { where: { id, theme_id, theme_prop_id } },
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
  actualizar,
  eliminar,
};
