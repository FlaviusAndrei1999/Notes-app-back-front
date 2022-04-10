const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/BazaDateArticole.db"
});

sequelize.sync({alter:true}).then(()=>{
    console.log("BD sincronizata");
})

module.exports = sequelize;
