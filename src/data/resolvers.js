import { Company, Investor, Simulation, Share } from './connectors';

const resolveFunctions = {
    RootQuery: {
        simulations(_, { id }){
            let where = { id };
            return Simulation.findAll({
                /**/
                where: where,
                /*
                include: {
                    Investor
                }*/
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
    },
    Company: {
        /*shares(company){
            return company.getShares();
        },*/
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
        /*shares(investor){
            return investor.getShares();
        },*/
        simulation(investor){
            return investor.getSimulation();
        }
    }
};

export default resolveFunctions;
