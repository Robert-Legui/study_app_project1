const { sequelize } = require("../../connection");
const { TopicsModel } = require("../../model/topics.model");
const topicsService = require("../../service/topics.service");

const listar = async function (req, res) {
  console.log("listar topicos controller");
  try {
    const topics = await topicsService.listar(req.query.filtro || "");
    if (topics) {
      res.json({
        success: true,
        topicos: topics,
      });
    } else {
      res.json({
        success: true,
        topicos: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      sucess: false,
      error: error.message,
    });
  }
};

const consultarPorCodigo = async function (req, res) {
  console.log("consultar 1 topico por codigo controller");
  try {
    const topicsModelResult = await topicsService.busquedaPorCodigo(
      req.params.filtro || ""
    );
    if (topicsModelResult) {
      res.json({
        success: true,
        topic: topicsModelResult,
      });
    } else {
      res.json({
        success: true,
        topic: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const actualizar = async function (req, res) {
  console.log("actualizar topicos controller");

  let topicsReturn = null;

  try {
    topicsReturn = await topicsService.actualizar(
      req.body.id,
      req.body.create_date,
      req.body.name,
      req.body.topic_id,
      req.body.order,
      req.body.priority,
      req.body.color,
      req.body.owner_user_id
    );
    res.json({
      success: true,
      topic: topicsReturn,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar topicos controller");
  try {
    await topicsService.eliminar(req.params.filtro || "");
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  listar,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
};
