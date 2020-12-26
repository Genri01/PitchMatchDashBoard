import gql from "graphql-tag";

export const meQuery = gql`
  fragment User on User {
    __typename
    id
    role
    userName
    commercialFrom 
  }

  query Me {
    viewer {
      ...User
    }
  }
`;
