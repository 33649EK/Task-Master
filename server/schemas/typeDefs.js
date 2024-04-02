const typeDefs = `
  type Profile {
    _id: ID!
    name: String!
    email: String!
    password: String!
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    text: String!
    isCompleted: Boolean!
  }

  type Project {
    _id: ID!
    members: [Profile]!
    todos: [Todo]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  input AddTodoInput {
    text: String!
    isCompleted: Boolean = false
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(profileId: ID!, todos: AddTodoInput!): Profile
    removeProfile: Profile
    removeTodo(todos: String!): Profile
  }
`;

module.exports = typeDefs;
