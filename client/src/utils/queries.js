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
      email
      friends {
        _id
        name
      }
      currentTask
      todos {
        _id
        text
        isCompleted
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_TODOS = gql`
  query todos($profileId: ID!) {
    todos(profileId: $profileId) {
      _id
      text
      isCompleted
    }
  }
`;

export const QUERY_CURRENT_TASK = gql`
  query currentTask($profileId: ID!) {
    currentTask(profileId: $profileId){
      _id
      currentTask
    }
  }
`;