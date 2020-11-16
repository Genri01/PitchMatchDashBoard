import gql from "graphql-tag";

export const createFieldMutation = gql`
  mutation CreateField($input: PlaceInput!) {
    upsertPlace(input: $input) {
      id
    }
  }
`;
