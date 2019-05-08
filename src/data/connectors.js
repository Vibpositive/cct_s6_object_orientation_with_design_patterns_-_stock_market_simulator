import Sequelize from 'sequelize';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('stockmarket', null, null, {
  dialect: 'sqlite',
  storage: './stockmarket.sqlite'
});

db.sync();

// const db = new Sequelize('stockmarket', "postgres", "postgres", {
//   dialect: 'postgres' 
// });

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
  /*numShares: {
    type: Sequelize.INTEGER,
  },
  sharesSold: {
    type: Sequelize.INTEGER,
  },*/
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

// casual.seed(123);
// db.sync({ force: true }).then(()=> {
  
//   _.times(100, ()=> {
//     return CompanyModel.create({
//       name: casual.company_name,
//       numShares: casual.integer(0, 1000),
//       sharesSold: 0
//     })
//     .then((company) => {
//       return ShareModel.create({
//         price: casual.double(0, 100),
//         companyId: company.dataValues.id
//       })
//     })
//     .then(() => {
//       return InvestorModel.create({
//         name: casual.first_name + " " + casual.last_name,
//         budget: casual.double(0, 100),
//         sharesBought: 0,
//       })
//     })
//   });
  
// });

// const Author = db.models.author;
// const Post = db.models.post;
const Company = db.models.company;
const Investor = db.models.investor;
const Simulation = db.models.simulation;
// const Share = db.models.share;

export { Company, Investor,  Simulation};
