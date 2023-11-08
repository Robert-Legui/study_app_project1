const {Sequelize} = require("sequelize");
//el sequileze que se recupera debe ser en minuscula, pq hay dos sequelize
                                //db, user, password
//const psw = process.env.DB_PASS;
const sequelize = new Sequelize("bd_study_app", 'postgres', 'admin', {
    host: 'localhost',
    port : 5432,
    dialect : 'postgres',
   logging: false,
});

const testConnection = function(){
    try {
        sequelize.authenticate();
        //sequelize.sync({ alter: true});
        //sequelize.sync({ force: true});
        console.log("Conexion con exito");
    } catch (error) {
        console.log("Error de conexion", error);
    }
};

//testConnection();

module.exports = {
   sequelize
};