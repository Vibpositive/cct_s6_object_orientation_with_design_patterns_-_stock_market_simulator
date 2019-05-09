import { Company, Investor, Simulation, Share } from './connectors';

const resolveFunctions = {
    RootQuery: {
        simulation(_, { id }){
            let where = { id };
            return Simulation.findOne({
                where: where,
            });
        },
        getAllSimulations(_, {  }){
            // let where = { id };
            return Simulation.findAll({
            });
        },
    },
    RootMutation: {
        createSimulation: (root, args) => {
            let _simulation;

            return Simulation.create(args)
            .then((simulation) =>{
                _simulation = simulation;
                return _simulation;
            })
            .then(() =>{
                let _investors =  args.investors.map(function (investor) {
                    investor.simulationId = _simulation.dataValues.id;
                    return investor;
                });
                return Investor.bulkCreate(_investors);
            })
            .then(() =>{
                let _companies =  args.companies.map(function (company) {
                    company.simulationId = _simulation.dataValues.id;
                    return company;
                });

                return Company.bulkCreate(_companies);
            })
            .then(() =>{
                let _shares =  args.shares.map(function (share) {
                    share.simulationId = _simulation.dataValues.id;
                    return share;
                });

                return Share.bulkCreate(_shares);
            })
            .then(() => {
                return _simulation;
            });
        },
        deleteSimulation: (root, { id }) => {
            let where = { id };
            return Simulation.destroy({where: where})
                .then((numDestroyd) => {
                    return numDestroyd === 1;
                })
        },
        deleteAllSimulations: (root, args ) => {
            return Simulation.destroy({where: {}})
                .then((numDestroyed) => {
                    return numDestroyed;
                })
        },
    },
    Company: {
        simulation(company){
            return company.getSimulation();
        },
    },
    Simulation: {
        investors(simulation){
            return simulation.getInvestors();
        },
        companies(simulation){
            return simulation.getCompanies();
        },
        shares(simulation){
            return simulation.getShares();
        },
    },
    Investor: {
        simulation(investor){
            return investor.getSimulation();
        }
    }
};

export default resolveFunctions;
