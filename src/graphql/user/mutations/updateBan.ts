import gql from "graphql-tag";

export const updateUserBanMutation = gql`
  mutation UpdateUserBan($id: ID!, $input: UserBanInput) {
    updateUserBan(id: $id, input: $input) {
      id
      bannedAt
      banReason
    }
  }
`;
