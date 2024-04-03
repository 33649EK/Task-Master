import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      friends {
        _id
        name
      }
      todos {
        _id
        text
        isCompleted
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($_id: ID!) {
    singleProfile(_id: $_id) {
      _id
      name
      friends {
        _id
        name
      }
      todos {
        _id
        text
        isCompleted
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me($profileId: ID!) {
    me(profileId: $profileId) {
      _id
      name
      friends {
        _id
      }
      todos {
        _id
        text
        isCompleted
      }
    }
  }
`;
