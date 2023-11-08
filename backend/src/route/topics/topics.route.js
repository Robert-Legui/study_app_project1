const topicsController = require("../../controller/topics/topics.controller");
const authMiddleware = require("../../middleware/auth.controller");

module.exports = function (app) {
  app.get(
    "/topics/list/:theme_id/:theme_prop_id/:orden", authMiddleware.auth,topicsController.listar
  );
  app.get(
    "/topics/buscarPorCodigo/:id/:theme_id/:theme_prop_id",authMiddleware.auth,topicsController.busquedaPorCodigo
  );
  app.post(
    "/topics/update",  authMiddleware.auth, topicsController.actualizar
    );
  app.delete(
    "/topics/delete/:id/:theme_id/:theme_prop_id",authMiddleware.auth,topicsController.eliminar
  );
};
