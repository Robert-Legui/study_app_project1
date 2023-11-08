const shared_topicsService = require("../../service/shared_topics.service");

const listar = async function (req, res) {
  console.log("listar topicos controller");
  try {
    const shared_topics = await shared_topicsService.listar(
      req.params.theme_id, 
      req.params.theme_prop_id,
      req.params.topic_id
    );
    if (shared_topics) {
      res.json({
        success: true,
        topicos: shared_topics,
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

const validaEmail = async function(req, res) {
  console.log("consultar 1 topico por codigo controller");
  try {
    const {theme_id, theme_prop_id, topic_id, email} = req.params
    const userModelResult = await shared_topicsService.validaEmail( 
                                                                    theme_id, 
                                                                    theme_prop_id,
                                                                    topic_id,
                                                                    email
                                                                  );
    if (userModelResult) {
      res.json({
        success: true,
        user: userModelResult,
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
      error: error,
    });
  }
}

const consultarPorCodigo = async function (req, res) {
  console.log("consultar 1 topico por codigo controller");
  try {
    const {id, theme_id, theme_prop_id, topic_id} = req.params
    const shared_topicsModelResult = await shared_topicsService.busquedaPorCodigo(
                                                                      id, 
                                                                      theme_id, 
                                                                      theme_prop_id,
                                                                      topic_id
                                                                      );
    if (shared_topicsModelResult) {
      res.json({
        success: true,
        topic: shared_topicsModelResult,
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

  let shared_topicsReturn = null;

  try {
    shared_topicsReturn = await shared_topicsService.actualizar(
      req.body.id,
      req.body.theme_id,
      req.body.theme_prop_id,
      req.body.topic_id,
      req.body.user_id
    );
    res.json({
      success: true,
      topic: shared_topicsReturn,
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
    const {id, theme_id, theme_prop_id, topic_id} = req.params
    await shared_topicsService.eliminar(id, theme_id, theme_prop_id, topic_id);
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
  validaEmail,
  actualizar,
  eliminar,
};
