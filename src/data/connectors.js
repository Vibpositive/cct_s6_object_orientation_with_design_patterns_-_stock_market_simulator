import Sequelize from 'sequelize';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';
require('dotenv').config()

const db = new Sequelize(
  process.env.CLEARDB_DATABASE_URL
);

const CompanyModel = db.define('company', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
  },
  numShares: {
    type: Sequelize.INTEGER,
  },
  sharesSold: {
    type: Sequelize.INTEGER,
  },
  simulationId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
});

const SimulationModel = db.define('simulation', {
  name: {
    type: Sequelize.STRING,
  },
});

const InvestorModel = db.define('investor', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.INTEGER,
  },
  sharesBought: {
    type: Sequelize.DOUBLE,
  },
  simulationId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
});

const ShareModel = db.define('share', {
  sharesTraded: {
    type: Sequelize.INTEGER,
  },
  companyId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
  investorId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
  simulationId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
});

// ShareModel.removeAttribute('id');

// CompanyModel.hasMany(ShareModel);

/*ShareModel.belongsTo(CompanyModel);
ShareModel.belongsTo(InvestorModel);*/

CompanyModel.hasMany(ShareModel);
InvestorModel.hasMany(ShareModel);

// ShareModel.belongsToMany(CompanyModel, {through: 'ShareCompanyInvestor'});
// ShareModel.belongsToMany(InvestorModel, {through: 'ShareCompanyInvestor'});

SimulationModel.hasMany(CompanyModel);
SimulationModel.hasMany(InvestorModel);
SimulationModel.hasMany(ShareModel);

InvestorModel.belongsTo(SimulationModel);

CompanyModel.belongsTo(SimulationModel);

const Company = db.models.company;

const Investor = db.models.investor;
const Simulation = db.models.simulation;
const Share = db.models.share;

db.sync();

export { Company, Investor,  Simulation, Share };
