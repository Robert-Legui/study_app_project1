//const { sequelize } = require("../../connection");
//const { TopicsModel } = require("../../model/topics.model");
const topicsService = require("../../service/topics.service");

const listar = async function (req, res) {
  console.log("listar topicos controller");
  try {
    const topics = await topicsService.listar(req.params.theme_id, req.params.theme_prop_id, res.locals.userId, req.params.orden);
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
    const {id, theme_id, theme_prop_id} = req.params
    const topicsModelResult = await topicsService.busquedaPorCodigo(id, theme_id, theme_prop_id);
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
      req.body.theme_id,
      req.body.theme_prop_id,
      req.body.create_date,
      req.body.name,
      req.body.priority,
      req.body.color,
      req.body.prc_completed,
      req.body.owner_user_id,
      req.body.comment
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
    const {id, theme_id, theme_prop_id} = req.params
    await topicsService.eliminar(id, theme_id, theme_prop_id);
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
