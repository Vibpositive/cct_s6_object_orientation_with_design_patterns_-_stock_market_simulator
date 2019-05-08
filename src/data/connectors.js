import Sequelize from 'sequelize';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('stockmarket', null, null, {
  dialect: 'sqlite',
  storage: './stockmarket.sqlite'
});

db.sync();

const CompanyModel = db.define('company', {
  name: {
    type: Sequelize.STRING,
  },
  numShares: {
    type: Sequelize.INTEGER,
  },
  sharesSold: {
    type: Sequelize.INTEGER,
  },
});

const SimulationModel = db.define('simulation', {
  name: {
    type: Sequelize.STRING,
  },
});

const InvestorModel = db.define('investor', {
  name: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.INTEGER,
  },
  sharesBought: {
    type: Sequelize.DOUBLE,
  },
});

const ShareModel = db.define('share', {
  price: {
    type: Sequelize.DOUBLE,
  },
});

CompanyModel.hasMany(ShareModel);
ShareModel.belongsTo(CompanyModel);

SimulationModel
    .hasMany(CompanyModel,{'as':'company'});

SimulationModel
    .hasMany(InvestorModel,{'as':'investor'});

InvestorModel
    .belongsTo(SimulationModel);

CompanyModel
    .belongsTo(SimulationModel);

const Company = db.models.company;
const Investor = db.models.investor;
const Simulation = db.models.simulation;

export { Company, Investor,  Simulation};
