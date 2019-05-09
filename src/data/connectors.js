import Sequelize from 'sequelize';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('stockmarket', null, null, {
  dialect: 'sqlite',
  storage: './stockmarket.sqlite'
});

const CompanyModel = db.define('company', {
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
  sharesTraded: {
    type: Sequelize.INTEGER,
  },
});
ShareModel.removeAttribute('id');

CompanyModel.hasMany(ShareModel);

ShareModel.belongsTo(CompanyModel);
ShareModel.belongsTo(InvestorModel);
SimulationModel
    // .hasMany(CompanyModel,{'as':'company'});
    .hasMany(CompanyModel);

SimulationModel
    // .hasMany(InvestorModel,{'as':'investor'});
    .hasMany(InvestorModel);
SimulationModel
    .hasMany(ShareModel);


InvestorModel
    .belongsTo(SimulationModel);

CompanyModel
    .belongsTo(SimulationModel);

const Company = db.models.company;

const Investor = db.models.investor;
const Simulation = db.models.simulation;
const Share = db.models.share;

db.sync();

export { Company, Investor,  Simulation, Share };
