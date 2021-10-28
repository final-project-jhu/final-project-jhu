import { gql } from '@apollo/client';


export const GET_ME = gql `
    query me {
    me{
        _id
        username
        email
    }
}
`;


export const QUERY_ATTEMPTS = gql`
  query getAttempts($task: ID) {
    attempts(task: $task) {
      _id
      task
     repeats
     repeated_days
     active
      taskList {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      password
      color
      tasks {
        _id
        }
      }
    }
`;

