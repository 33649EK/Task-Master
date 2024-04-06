const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    singleProfile: async (parent, profileId) => {
      console.log('Function is firing!');
      console.log(`Profile ID: ${JSON.stringify(profileId)}`);
      const profile = await Profile.findOne({ _id: profileId }).populate(
        'friends'
      );
      console.log(`Profile: ${profile}`);
      return profile;
    },
    // By adding context to our query, we can retrieve the logged
    // in user without specifically searching for them
    me: async (parent, args) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    todos: async (parent, { profileId }) => {
      const profile = await Profile.findOne({ _id: profileId });

      return profile.todos;
    },

    currentTask: async (parent, { profileId }) => {
      const profile = await Profile.findOne({ _id: profileId });

      return profile.currentTask;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      console.log('Function is firing!');
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addTodo: async (parent, { profileId, todo }) => {
      // If context has a `user` property, that means the user executing this
      // mutation has a valid JWT and is logged in
      console.log('Function is firing!');
      const newTodo = await Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { todos: { text: todo } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return newTodo;
    },
    // Set up mutation so a logged in user can only remove their profile and
    // no one else's
    removeProfile: async (parent, args) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a skill from their own
    // profile
    removeTodo: async (parent, { profileId, todoId }) => {
      const newProfile = await Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { todos: { _id: todoId } } },
        { new: true }
      );
      return newProfile;

    },

    addFriend: async (parent, { profileId, friendName }) => {
      if (context.user) {
        // Find the friend's profile based on provided name
        const friend = await Profile.findOne({ name: friendName });

        if (!friend) {
          throw new Error('No profile with this name found!');
        } else if (profileId === friend._id) {
          throw new Error('Why would you add yourself as a friend?');
        }

        // Update the friend's profile to include the current user as a friend
        await Profile.findOneAndUpdate(
          { _id: friend._id },
          { $addToSet: { friends: profileId } },
          { new: true }
        );

        // Update the current user's profile to include the friend
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { friends: friend._id } },
          { new: true }
        );
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    removeFriend: async (parent, { profileId, friendName }) => {
      if (context.user) {
        // Find the friend's profile based on provided name
        const friend = await Profile.findOne({ name: friendName });

        if (!friend) {
          throw new Error('No profile with this name found!');
        }

        // Update the friend's profile to remove the current user as a friend
        await Profile.findOneAndUpdate(
          { _id: friend._id },
          { $pull: { friends: profileId } },
          { new: true }
        );

        // Update the current user's profile to remove the friend
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $pull: { friends: friend._id } },
          { new: true }
        );
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },

    updateCurrentTask: async (parent, { profileId, currentTask }) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { currentTask: currentTask },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    setCompleted: async (parent, { profileId, todoId }) => {
        return Profile.findOneAndUpdate(
          { _id: profileId, 'todos._id': todoId },
          { 'todos.$.isCompleted': true },
          { new: true }
        );
    },
  },
};

module.exports = resolvers;
