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
module.exports.OODWDP_DATABASE_USER = process.env.OODWDP_DATABASE_USER;
module.exports.OODWDP_POSTGRES_HOST = process.env.OODWDP_POSTGRES_HOST;
module.exports.OODWDP_POSTGRES_PORT = process.env.OODWDP_POSTGRES_PORT;