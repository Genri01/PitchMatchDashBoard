import gql from "graphql-tag";

export const loginMutation = gql`
  fragment RegUser on User {
    __typename
    id
  }

  mutation Login($credentials: ViewerCredentialsInput!) {
    logIn(credentials: $credentials) {
      ...RegUser
    }
  }
`;
