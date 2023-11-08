
const { Sequelize } = require("sequelize");
const { sequelize } = require("../connection");
//const Themes = require("../model/Themes");
const { consultarPorCodigoTheme } = require("./themes_properties.service");
const {ThemesProperties, Themes, Topics } = require("../model/ThemesProperties");
//const { ThemesModel } = require("../model/themes.model");

const listar = async function (textoBuscar,res) {
  console.log("listar temas");
  console.log(`res.locals.userId: ${res.locals.userId}`)
  try {
    // const themes = await sequelize.query(`SELECT * 
    //   FROM Themes
    //   WHERE 1=1
    //     AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
    //   ORDER BY id`);
    textoBuscar = `%${textoBuscar}%`
    const themes = await Themes.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: textoBuscar
        }
      },
      include: {
        model: ThemesProperties,
        include: [{
          model: Topics,
          // where: {
          //   owner_user_id: res.locals.userId
          // }
        }]
      },
      order: Sequelize.col('id')
    })
    if (themes && themes[0]) {
      //console.log(themes)
      return themes;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const listarByUser = async function (req, res) {
  console.log("listar temas por usuarios");
  //console.log(`res.locals.userId: ${res.locals.userId}`)
  const { userId} = req.body;
  //const userId = res.locals.userId
  try {
    // const themes = await sequelize.query(`SELECT * 
    //   FROM Themes
    //   WHERE 1=1
    //     AND UPPER(name) LIKE UPPER('%${textoBuscar}%')
    //   ORDER BY id`);
    //var textoBuscar2 = `%${textoBuscar ?? " "}%`
    let themes = await Themes.findAll({
      where: {
        owner_user_id: userId
        // name: {
        //   [Sequelize.Op.iLike]: textoBuscar2
        // }
      },
      include: {
        model: ThemesProperties,
        include: [{
          model: Topics,
          where: {
            owner_user_id: res.locals.userId
          }
        }]
      },
      order: Sequelize.col('id')
    })
    if (themes && themes[0]) {
      // let themes2 = []
      // console.log(themes)
      // themes.forEach(async theme => {
      //   console.log(`theme: ${JSON.stringify(theme)}`)
      //   let themesProperties = await consultarPorCodigoTheme(theme.id)
      //   if(themesProperties){
      //     theme.themesProperties = themesProperties
      //   }
      //   themes2.push(theme)
      // });

      //let themes2 = await cargaThemes(themes);
      //console.log(`theme: ${JSON.stringify(themes)}`)
      return themes
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function cargaThemes (data) {
      let themes2 = []
      let cont = 0
      return new Promise(async function (resolve, reject) {
        //console.log(`data.length: ${data.length}`)
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              let theme = data[key];
              cont = cont+1
              //console.log(`theme: ${JSON.stringify(theme)}`)
              let themesProperties = []
              themesProperties = await consultarPorCodigoTheme(theme.id)
              //console.log(`themesProperties: ${JSON.stringify(themesProperties)}`)
              //if(themesProperties){
                theme['themesProperties'] = themesProperties
              //}
              themes2.push(theme)
              //console.log(`themes2: ${JSON.stringify(themes2)}`)
              //console.log(`data.length: ${data.length} - cont: ${cont}`)
              if(cont==data.length)resolve(themes2)
            }
          }
          // data.forEach(async function (theme) {
          //     // cont = cont+1
          //     // console.log(`theme: ${JSON.stringify(theme)}`)
          //     // let themesProperties = await consultarPorCodigoTheme(theme.id)
          //     // if(themesProperties){
          //     //   theme.themesProperties = themesProperties
          //     // }
          //     // themes2.push(theme)
          //     // console.log(`data.length: ${data.length} - cont: ${cont}`)
          //     // resolve(themes2)
          // });
          //resolve(false);
      });
    }

const consultarPorCodigo = async function (codigo) {
  console.log("consultar 1 tema por codigo");
  try {
    const themesModelResult = await Themes.findByPk(codigo);
    if (themesModelResult) {
      return themesModelResult;
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
  description,
  keywords,
  owner_user_id
) {
  console.log("actualizar temas");
  let themesReturn = null;
  //const data = req.body;
  //const id = req.body.id;
  const data = { id, create_date, name, description, keywords, owner_user_id };
  try {
    let themesExist = null;
    if (id) {
      themesExist = await Themes.findByPk(id);
    }
    if (themesExist) {
      themesReturn = await Themes.update(data, { where: { id: id } });
      themesReturn = data;
    } else {
      themesReturn = await Themes.create(data);
    }
    return themesReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (codigo) {
  console.log("eliminar temas");
  try {
    Themes.destroy({ where: { id: codigo } }, { truncate: false });
    // await sequelize.query("UPDATE themes SET deleted=true WHERE id= " + codigo);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listar,
  listarByUser,
  busquedaPorCodigo: consultarPorCodigo,
  actualizar,
  eliminar,
};
