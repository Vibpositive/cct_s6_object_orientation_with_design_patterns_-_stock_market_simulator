const dotenv = require("dotenv");

let path;

switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../.env.test`;
        break;
    case "production":
        path = `${__dirname}/../.env.production`;
        break;
    default:
        path = `${__dirname}/../.env`;
}

dotenv.config({
    path: path
});

module.exports.OODWDP_DATABASE = process.env.OODWDP_DATABASE;
module.exports.OODWDP_DATABASE_ROOTPASSWORD = process.env.OODWDP_DATABASE_ROOTPASSWORD;
module.exports.OODWDP_MARIADB_DATA = process.env.OODWDP_MARIADB_DATA;
module.exports.OODWDP_MARIADB_DUMP = process.env.OODWDP_MARIADB_DUMP;
module.exports.OODWDP_MARIADB_HOST = process.env.OODWDP_MARIADB_HOST;
module.exports.OODWDP_DATABASE_USER = process.env.OODWDP_DATABASE_USER;
module.exports.OODWDP_MARIADB_PORT = process.env.OODWDP_MARIADB_PORT;
module.exports.OODWDP_MYSQL_DATA = process.env.OODWDP_MYSQL_DATA;
module.exports.OODWDP_MYSQL_DUMP = process.env.OODWDP_MYSQL_DUMP;
module.exports.OODWDP_MYSQL_HOST = process.env.OODWDP_MYSQL_HOST;
module.exports.OODWDP_MYSQL_PORT = process.env.OODWDP_MYSQL_PORT;
module.exports.OODWDP_WEB_PASSWORD = process.env.OODWDP_WEB_PASSWORD;
module.exports.OODWDP_WEB_PORT = process.env.OODWDP_WEB_PORT;
module.exports.OODWDP_WEB_MAIN_VOLUME = process.env.OODWDP_WEB_MAIN_VOLUME;