// This is all untouched from source code
import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      friends
      todos [{
        _id
        text
        isCompleted
      }]
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      friends
      todos [{
        _id
        text
        isCompleted
      }]
    }
  }
`;

export const QUERY_ME = gql`
  query me($profileId: ID!) {
    me(profileId: $profileId) {
      _id
      name
      friends
      todos [{
        _id
        text
        isCompleted
      }]
    }
  }
`;
