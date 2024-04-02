import { useQuery, useMutation } from '@apollo/client';
import Auth from './auth';
import { QUERY_PROFILES, QUERY_SINGLE_PROFILE, QUERY_ME } from './queries';
import { ADD_PROFILE, ADD_TODO, LOGIN_USER, REMOVE_TODO } from './mutations';
const [allProfiles] = useQuery(QUERY_PROFILES);
const [singleProfile] = useQuery(QUERY_SINGLE_PROFILE);
const [me] = useQuery(QUERY_ME);

// Get all profiles (Likely unnecessary for our app)
const getProfiles = async () => {
  try {
    const { data } = await allProfiles();

    return data;
  } catch (err) {
    console.error(err);
  }
};

// Get a single profile by ID (Possibly useful for finding other users)
const getProfile = async (profileId) => {
  try {
    const { data } = await singleProfile({ variables: { profileId } });

    return data;
  } catch (err) {
    console.error(err);
  }
};

// Grab the logged in user's profile data
const getCurrentProfile = async () => {
  try {
    const token = Auth.getProfile();
    const { data } = await me({ variables: { profileId: token.data._id } });

    return data;
  } catch (err) {
    console.error(err);
  }
};

const [addProfile] = useMutation(ADD_PROFILE);
const [addTodo] = useMutation(ADD_TODO);
const [login] = useMutation(LOGIN_USER);
const [removeTodo] = useMutation(REMOVE_TODO);

// Add a new profile to the database
// Name, email, and password are required
const createUser = async (profileData) => {
  try {
    const { data } = await addProfile({
      variables: {
        name: profileData.name,
        email: profileData.email,
        password: profileData.password,
      },
    });

    if (!data) {
      throw new Error('Profile creation failed!');
    }

    Auth.login(data.token);
  } catch (err) {
    console.error(err);
  }
};

// Log in an existing user
// Email and password are required
const loginUser = async (profileData) => {
  try {
    const { data } = await login({
      variables: {
        email: profileData.email,
        password: profileData.password,
      },
    });

    if (!data) {
      throw new Error('Login failed!');
    }

    Auth.login(data.token);
  } catch (err) {
    console.error(err);
  }
};

// Add a new todo to the logged in user's profile
// Text is required, isCompleted defaults to false
const addNewTodo = async (todoData) => {
  try {
    const token = await Auth.getProfile();
    const { data } = await addTodo({
      variables: {
        profileId: token.data._id,
        todos: todoData,
      },
    });

    if (!data) {
      throw new Error('Todo addition failed!');
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

// Remove a todo from the logged in user's profile
// The todo's id is required
const removeUserTodo = async (todoId) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
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
