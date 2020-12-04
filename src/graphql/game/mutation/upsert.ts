import gql from "graphql-tag";

export const upsertGameMutation = gql`
  mutation UpsertGame($input: GameInput!, $id: ID) {
    upsertGame(input: $input, id: $id) {
      id
    }
  }
`;
