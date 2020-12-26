import gql from "graphql-tag";

export const updateUserRoleMutation = gql`
  mutation UpdateUserRole($userId: ID!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      lastName
      role
    }
  }
`;
