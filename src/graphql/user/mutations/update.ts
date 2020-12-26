import gql from "graphql-tag";

export const updateUserMutation = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;
