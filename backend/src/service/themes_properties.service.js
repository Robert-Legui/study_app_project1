//const ThemesPropertiesModel = require("../../models/ThemesPropertiesModel");
const { Sequelize, where } = require("sequelize");
const { sequelize } = require("../connection");
const { ThemesProperties } = require("../model/ThemesProperties");
//const ThemesPropertiesModel = require("../model/ThemesPropertiesModel");
//const { ThemesPropertiesModel } = require("../model/themes.model");

const listar = async function (textoBuscar) {
  console.log("listar propiedades de temas");
  try {
    const themes_properties = await sequelize.query(`SELECT * 
      FROM public."ThemesProperties"
      WHERE 1=1
        AND UPPER(property_name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY id`);
    if (themes_properties && themes_properties[0]) {
      return themes_properties;
    } else { 
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (theme_id, id) {
  console.log("consultar 1 propiedad de tema por codigo");
  try {
    let data = {theme_id:theme_id}
    if(id>0){
      data = {id:id,theme_id:theme_id}
    }
    const themesPropertiesModelResult = await ThemesProperties.findAll({
      where: data
    });
    if (themesPropertiesModelResult) {
      return themesPropertiesModelResult;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigoTheme = async function (codigo) {
  console.log("consultar propiedad de tema por codigo del tema");
  try {
    // const themes_properties = await sequelize.query(`SELECT * 
    //                                                 FROM ThemesProperties
    //                                                 WHERE theme_id=${codigo}
    //                                                 ORDER BY id`);
    const themes_properties = await ThemesProperties.findAll({
      where: {
        theme_id: codigo
      },
      order: Sequelize.col('id')
    })
    if (themes_properties && themes_properties[0]) {
      return themes_properties;
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
  property_name,
  property_value
) {
  console.log("actualizar propiedad de tema");
  let themesPropertiesReturn = null;
  let data = { id, theme_id, property_name, property_value };
  try {
    let themesPropertiesExist = null;
    if (id) {
      themesPropertiesExist = await ThemesProperties.findOne({
        where:{id,theme_id}
      });
    }
    if (themesPropertiesExist) {
      themesPropertiesReturn = await ThemesProperties.update(data, {
        where: {id,theme_id}
      });
      themesPropertiesReturn = data;
    } else {
        let id2 = (await ThemesProperties.max('id',{
          where:{
            theme_id
          }
        }) ?? 0) + 1
      data = { id:id2, theme_id, property_name, property_value };
      themesPropertiesReturn = await ThemesProperties.create(data);
    }
    return themesPropertiesReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (codigo,idTema) {
  console.log("eliminar propiedad de tema");
  try {
    ThemesProperties.destroy(
      { where: { id: codigo, theme_id:idTema } },
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
  consultarPorCodigoTheme,
};
