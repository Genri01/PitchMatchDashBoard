import gql from "graphql-tag";

export const MapFieldsQuery = gql`
  query MapFields {
    getPlaces(filter: {}) {
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
