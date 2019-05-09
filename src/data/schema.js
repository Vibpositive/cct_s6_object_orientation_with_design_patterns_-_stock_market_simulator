const typeDefinitions = `
# type Author {
#   id: Int! # the ! means that every author object _must_ have an id
#   firstName: String
#   lastName: String
#   posts: [Post]
# }

type Company {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  numShares: Int
  sharesSold: Int
  simulation: Simulation
  price: Float
}

type Investor {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  budget: Float
  sharesBought: Int
  simulation: Simulation
  # shares: [Share]
}

input InvestorInput {
  id: Int!
  name: String!
  budget: Float!
  sharesBought: Int!
}
input CompanyInput {
    id: Int!
    name: String!
    numShares: Int!
    sharesSold: Int!
    price: Float!
}

input ShareInput {
    sharesTraded: Int!
    companyId: Int!
    investorId: Int!
}

type Share {
  # id: Int! # the ! means that every author object _must_ have an id
  sharesTraded: Int
  companyId: Int
  investorId: Int
}

type Simulation {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  investors: [Investor]
  companies: [Company]
  shares: [Share]
}

# the schema allows the following two queries:
type RootQuery {
  # companies : [Company]
  # investors : [Investor]
  simulation(id: Int!): Simulation
  getAllSimulations: [Simulation]
#  shares : [Share]
}

# this schema allows the following two mutations:
type RootMutation {
  createSimulation(
    name: String!
    investors: [InvestorInput]
    companies: [CompanyInput]
    shares: [ShareInput]
  ): Simulation
  deleteSimulation(
    id: Int!
  ): Int
  deleteAllSimulations: Int
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default [typeDefinitions];
