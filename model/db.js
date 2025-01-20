const Sequelize = require("sequelize");
require("dotenv").config();
const SecretPhrase2Model = require("./SecretPhrase2");


var sequelize;
if (!sequelize) {
  let dbName = process.env.DB_NAME;
  let dbUserName = process.env.DB_USER;
  let dbPassword = process.env.DB_PASSWORD;
  let dbHost = process.env.DB_HOST_READER;
  // let dbHost2 = vars.DB_HOST_READER2
  // let dbHost3 = vars.DB_HOST_READER3
  // let dbHost4 = vars.DB_HOST_READER4
  let dbWriter = process.env.DB_HOST;
  let dbPort = process.env.DB_PORT;
  let dbDialect = process.env.DB_DIALECT;
  let dbAccquire = process.env.DB_ACCQUIRE;
  let dbIdle = process.env.DB_IDLE;
  let pool = process.env.POOL;

  sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    dialect: dbDialect,
    port: dbPort,
    pool: pool,
    logging: false,
    replication: {
      read: [
        { host: dbHost, username: dbUserName, password: dbPassword },
        // { host: dbHost2, username: dbUserName, password: dbPassword },
        // { host: dbHost3, username: dbUserName, password: dbPassword },
        // { host: dbHost4, username: dbUserName, password: dbPassword}
      ],
      write: { host: dbWriter, username: dbUserName, password: dbPassword },
    },
    pool: {
      acquire: dbAccquire,
      idle: dbIdle,
    },
  });
}
const SecretPhrase2 = SecretPhrase2Model(sequelize);



sequelize
  .authenticate()
  .then(async () => {
    

    await sequelize.sync();
  })
  .catch((error) => {
    console.log("Database connection Error: ", error);
  });

module.exports = {
  sequelize,
  Sequelize,
  SecretPhrase2,
};
