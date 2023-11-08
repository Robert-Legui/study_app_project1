const shared_topicsController = require("../../controller/shared_topics/shared_topics.controller");
const authMiddleware = require("../../middleware/auth.controller");

module.exports = function (app) {
  app.get(
    "/shared_topics/list/:theme_id/:theme_prop_id/:topic_id", authMiddleware.auth, shared_topicsController.listar
  );
  app.get(
    "/shared_topics/validar_email/:theme_id/:theme_prop_id/:topic_id/:email", authMiddleware.auth, shared_topicsController.validaEmail
  );
  app.get(
    "/shared_topics/buscarPorCodigo/:id/:theme_id/:theme_prop_id/:topic_id", authMiddleware.auth, shared_topicsController.busquedaPorCodigo
  );
  app.post(
    "/shared_topics/update", authMiddleware.auth, shared_topicsController.actualizar
  );
  app.delete(
    "/shared_topics/delete/:id/:theme_id/:theme_prop_id/:topic_id", authMiddleware.auth, shared_topicsController.eliminar
  );
};
