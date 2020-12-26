import gql from "graphql-tag";

export const MapFieldsQuery = gql`
  query MapFields($filter: PlaceFilter! = {}, $pagination: Pagination) {
    getPlaces(filter: $filter, pagination: $pagination) {
      rows {
        id
        address
        name
        point {
          id
          location
        }
      }
    }
  }
`;
