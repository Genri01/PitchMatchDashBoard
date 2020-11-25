import gql from "graphql-tag";

export const upsertFieldMutation = gql`
  mutation UpsertField($id: ID, $input: PlaceInput!) {
    upsertPlace(id: $id, input: $input) {
      id
    }
  }
`;
