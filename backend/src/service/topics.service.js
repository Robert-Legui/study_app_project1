const { sequelize } = require("../connection");
const { TopicsModel } = require("../model/topics.model");

const listar = async function (textoBuscar) {
  console.log("listar topicos");
  try {
    const topics = await sequelize.query(`SELECT * 
      FROM topics
      WHERE 1=1
        AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`);
    if (topics && topics[0]) {
      return topics[0];
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (codigo) {
  console.log("consultar 1 topico por codigo");
  try {
    const topicsModelResult = await TopicsModel.findByPk(codigo);
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
  create_date,
  name,
  topic_id,
  order,
  priority,
  color,
  owner_user_id
) {
  console.log("actualizar topicos");

  let topicsReturn = null;
  const data = {
    id,
    create_date,
    name,
    topic_id,
    order,
    priority,
    color,
    owner_user_id,
  };

  try {
    let topicsExist = null;
    if (id) {
      topicsExist = await TopicsModel.findByPk(id);
    }
    if (topicsExist) {
      topicsReturn = await TopicsModel.update(data, { where: { id: id } });
      topicsReturn = data;
    } else {
      topicsReturn = await TopicsModel.create(data);
    }
    return topicsReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (codigo) {
  console.log("eliminar topicos");
  try {
    //pide tb poner topic_id (??)
    TopicsModel.destroy(
      { where: { id: codigo } },
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
