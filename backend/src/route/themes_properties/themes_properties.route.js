const themesPropertiesController = require('../../controller/themes_properties/themes_properties.controller')

module.exports = function(app){
    app.get("/themeproperties/list", themesPropertiesController.listar);
    app.get("/themeproperties/buscarPorCodigo/:idTema/:id", themesPropertiesController.busquedaPorCodigo);
    app.get("/themeproperties/buscarPorTema/:filtro", themesPropertiesController.consultarPorCodigoTheme);
    app.post("/themeproperties/update", themesPropertiesController.actualizar);
    app.delete("/themeproperties/delete/:idTema/:id", themesPropertiesController.eliminar);
}