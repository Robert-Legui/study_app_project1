const topicsController = require("../../controller/topics/topics.controller");
const authMiddleware = require("../../middleware/auth.controller");

module.exports = function (app) {
  app.get(
    "/topics/list", authMiddleware.auth,topicsController.listar
  );
  app.get(
    "/topics/buscarPorCodigo/:filtro",authMiddleware.auth,topicsController.busquedaPorCodigo
  );
  app.post(
    "/topics/update",  authMiddleware.auth, topicsController.actualizar
    );
  app.delete(
    "/topics/delete/:filtro",authMiddleware.auth,topicsController.eliminar
  );
};
