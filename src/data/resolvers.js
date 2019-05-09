import { Company, Investor, Simulation } from './connectors';

const resolveFunctions = {
    RootQuery: {
        // author(_, { firstName, lastName }){
        //   let where = { firstName, lastName};
        //   if (!lastName){
        //     where = { firstName };
        //   }
        //   if (!firstName){
        //     where = { lastName };
        //   }
        //   return Author.find({ where });
        // },
        companies(_, { }){
            return Company.findAll();
        },
        investors(_, { }){
            return Investor.findAll();
        },
        simulations(_, { }){
            return Simulation.findAll();
        },
        /*shares(_, { }){
          return Share.findAll();
        },*/
    },
    RootMutation: {
        createSimulation: (root, args) => {
            console.log("args: ");
            console.log(args);
            let _simulation;
            // console.log("Companies: " + companies);
            // console.log("Investors: " + investors);
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
                console.log(_companies);

                return Company.bulkCreate(_companies);
            })
            .then(() => {
                return _simulation;
            })
        },
        /*createPost: (root, { authorId, tags, title, text }) => {
          return Author.findOne({ where: { id: authorId } }).then( (author) => {
            console.log('found', author);
            return author.createPost( { tags: tags.join(','), title, text });
          });
        },*/
    },
    Company: {
        shares(company){
            return company.getShares();
        },
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
    },
    Investor: {
        simulation(investor){
            return investor.getSimulation();
        }
    }
    // Post: {
    //   author(post){
    //     return post.getAuthor();
    //   },
    //   tags(post){
    //     return post.tags.split(',');
    //   },
    //   views(post){
    //     return new Promise((resolve, reject) => {
    //       setTimeout( () => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
    //       View.findOne({ postId: post.id }).then( (res) => resolve(res.views) );
    //     })
    //   }
    // }
}

export default resolveFunctions;
