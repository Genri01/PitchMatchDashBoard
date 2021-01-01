import gql from "graphql-tag";

export const FieldQuery = gql`
  query Field($id: ID!) {
    getPlace(id: $id) {
      id
      name
      description
      address
      roof
      price
      phone
      email
      size
      fromTime
      toTime
      point {
        location
      }
      files {
        id
        url
      }
    }
  }
`;
