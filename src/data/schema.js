const typeDefinitions = `
# type Author {
#   id: Int! # the ! means that every author object _must_ have an id
#   firstName: String
#   lastName: String
#   posts: [Post] # the list of Posts by this author
# }

type Company {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  numShares: Int
  sharesSold: Int # the list of Posts by this author
  shares: [Share]
  simulation: SimpleSimulation
}

type SimpleSimulation{
  id: Int! # the ! means that every author object _must_ have an id
  name: String
}

type Investor {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  budget: Float
  sharesBought: Int # the list of Posts by this author
  simulation: SimpleSimulation
}

type Share {
  id: Int! # the ! means that every author object _must_ have an id
  price: Float
}

type Simulation {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  investors: [Investor]
  companies: [Company]
}

# type Post {
#   id: Int!
#   tags: [String]
#   title: String
#   text: String
#   views: Int
#   author: Author
# }

# the schema allows the following two queries:
type RootQuery {
  # author(firstName: String, lastName: String): Author
  # authors: [Author]
  companies : [Company]
  investors : [Investor]
  simulations: [Simulation]
#  shares : [Share]
}

# this schema allows the following two mutations:
# type RootMutation {
  # createAuthor(
  #   firstName: String!
  #   lastName: String!
  # ): Author

  # createPost(
  #   tags: [String!]!
  #   title: String!
  #   text: String!
  #   authorId: Int!
  # ): Post
  # }

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
}
`;
// # mutation: RootMutation

export default [typeDefinitions];
