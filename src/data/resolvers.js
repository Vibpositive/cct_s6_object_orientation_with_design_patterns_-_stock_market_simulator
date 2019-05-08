import { Company, Investor, Share } from './connectors';

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
    /*shares(_, { }){
      return Share.findAll();
    },*/
  },
  // RootMutation: {
  //   createAuthor: (root, args) => { return Author.create(args); },
  //   createPost: (root, { authorId, tags, title, text }) => {
  //     return Author.findOne({ where: { id: authorId } }).then( (author) => {
  //       console.log('found', author);
  //       return author.createPost( { tags: tags.join(','), title, text });
  //     });
  //   },
  // },
  Company: {
    shares(company){
      return company.getShares();
    },
  },
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
