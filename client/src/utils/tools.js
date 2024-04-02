import { useQuery, useMutation } from '@apollo/client';
import Auth from './auth';
import { QUERY_PROFILES, QUERY_SINGLE_PROFILE, QUERY_ME } from './queries';
import { ADD_PROFILE, ADD_TODO, LOGIN_USER, REMOVE_TODO } from './mutations';
const [allProfiles] = useQuery(QUERY_PROFILES);
const [singleProfile] = useQuery(QUERY_SINGLE_PROFILE);
const [me] = useQuery(QUERY_ME);

// Get all profiles (Likely unnecessary for our app)
const getProfiles = () => {
  return allProfiles();
};

// Get a single profile by ID (Possibly useful for finding other users)
const getProfile = (profileId) => {
  return singleProfile({ variables: { profileId } });
};

// Grab the logged in user's profile data
const getCurrentProfile = () => {
  const token = Auth.getProfile();
  return me({ variables: { profileId: token.data._id } });
};

const [addProfile] = useMutation(ADD_PROFILE);
const [addTodo] = useMutation(ADD_TODO);
const [login] = useMutation(LOGIN_USER);
const [removeTodo] = useMutation(REMOVE_TODO);

// Add a new profile to the database
// Name, email, and password are required
const createUser = async (profileData) => {
  const { data } = await addProfile({
    variables: {
      name: profileData.name,
      email: profileData.email,
      password: profileData.password,
    },
  });

  Auth.login(data.token);
};

// Log in an existing user
// Email and password are required
const loginUser = async (profileData) => {
  const { data } = await login({
    variables: {
      email: profileData.email,
      password: profileData.password,
    },
  });
  
  Auth.login(data.token);
};

// Add a new todo to the logged in user's profile
// Text is required, isCompleted defaults to false
const addNewTodo = async (todoData) => {
  const token = Auth.getProfile();
  const { data } = await addTodo({
    variables: {
      profileId: token.data._id,
    },
  });

  if (!data) {
    throw new Error('Todo addition failed!');
  }

  return data;
};

// Remove a todo from the logged in user's profile
// The todo's id is required
const removeUserTodo = async (todoId) => {
  const token = Auth.getProfile();
  const { data } = await removeTodo({
    userId: token.data._id,
    variables: {
      _id: todoId,
    },
  });

  if (!data) {
    throw new Error('User todo removal failed!');
  }

  return data;
};

export {
  getProfiles,
  getProfile,
  getCurrentProfile,
  createUser,
  loginUser,
  addNewTodo,
  removeUserTodo,
};
