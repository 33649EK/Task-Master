import React from 'react';
import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';


const FriendsTest = () => {
  const token = Auth.getProfile();
  console.log(JSON.stringify(token))

  const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { _id: token.data._id },
  });
  console.log(JSON.stringify(data))
  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>{error.message}</p>);

  const friends = data.singleProfile.friends;
  console.log(`Friends: ${JSON.stringify(friends)}`)
  if (data) return (
    <div>
      <h1>Friends List</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default FriendsTest;