const dbCOnfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbCOnfig.DB,
    dbCOnfig.USER,
    dbCOnfig.PASSWORD,
    {
        host: dbCOnfig.HOST,
        dialect: dbCOnfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbCOnfig.pool.max,
            min: dbCOnfig.pool.min,
            acquire: dbCOnfig.pool.acquire,
            idle: dbCOnfig.pool.idle

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected....')
    }).catch(err => {
        console.log('error' + err)
    })

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes)
db.category = require('./categoryModel.js')(sequelize, DataTypes);
db.sub_category=require('./sub_categoryModel.js')(sequelize,DataTypes);
Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });
db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!')
}).catch(err => {
    console.log("error")
})

module.exports = db;
