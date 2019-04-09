const {
  OODWDP_POSTGRES_PORT,
  // OODWDP_POSTGRES_HOST,
  OODWDP_DATABASE,
  OODWDP_DATABASE_USER,
  OODWDP_DATABASE_ROOTPASSWORD
} = require("./utils/config")

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: OODWDP_POSTGRES_PORT,
      user: OODWDP_DATABASE_USER,
      password: OODWDP_DATABASE_ROOTPASSWORD,
      database: OODWDP_DATABASE,
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },
};