import gql from "graphql-tag";

export const FieldsQuery = gql`
  query Fields($filter: PlaceFilter!, $pagination: Pagination) {
    getPlaces(filter: $filter, pagination: $pagination) {
      rows {
        id
        name
        description
        address
        roof
        price
        point {
          id
          location
        }
      }
    }
  }
`;
