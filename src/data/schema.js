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
  simulation: Simulation
  # shares: [Share]
}

type Investor {
  id: Int! # the ! means that every author object _must_ have an id
  name: String
  budget: Float
  sharesBought: Int # the list of Posts by this author
  simulation: Simulation
  # shares: [Share]
}

input InvestorInput {
  name: String
  budget: Float
  sharesBought: Int # the list of Posts by this author
}
input CompanyInput {
  name: String
  numShares: Int
  sharesSold: Int # the list of Posts by this author
}

input ShareInput {
    sharesTraded: Int
    companyId: Int
    investorId: Int
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
  # author(firstName: String, lastName: String): Author
  # authors: [Author]
  # companies : [Company]
  # investors : [Investor]
  simulations(id: Int!): [Simulation]
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
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default [typeDefinitions];
