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

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      tasks {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

