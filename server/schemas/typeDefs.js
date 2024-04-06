const typeDefs = `
  type Profile {
    _id: ID!
    name: String!
    email: String!
    password: String!
    friends: [Profile]
    currentTask: String
    todos: [Todo]
    projects: [Project]
  }

  type Todo {
    _id: ID!
    text: String!
    isCompleted: Boolean!
  }

  type Project {
    _id: ID!
    name: String!
    members: [Profile]!
    todos: [Todo]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    singleProfile(_id: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    todos(profileId: ID!): [Todo]
    currentTask(profileId: ID!): String
  }

  input AddTodoInput {
    text: String!
    isCompleted: Boolean
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
  }

  extend type Mutation {
    addTodo(profileId: ID!, todo: String!): Profile
    removeTodo(todos: String!): Profile
    updateCurrentTask(profileId: ID!, currentTask: String!): Profile
    setCompleted(profileId: ID!, todoId: ID!): Profile
  }

  extend type Mutation {
    addProject(name: String!, members: [ID]!): Project
    removeProject(projectId: ID!): Profile
    addMember(projectId: ID!, memberId: ID!): Project
    removeMember(projectId: ID!, memberId: ID!): Project
    addTask(projectId: ID!, task: AddTodoInput!): Project
    removeTask(projectId: ID!, taskId: ID!): Project
  }

  extend type Mutation {
    addFriend(profileId: ID!, friendName: String!): Profile
    removeFriend(profileId: ID!, friendName: String!): Profile
  }
`;

module.exports = typeDefs;
