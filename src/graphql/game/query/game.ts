import gql from "graphql-tag";

export const gameQuery = gql`
  query Game($id: ID!) {
    getGame(id: $id) {
      id
      teamSeparation
      startDate
      address
      status
      price
      deletedAt
      ageFrom
      ageTo
      description
      gender
      user {
        id
        firstName
        lastName
      }
      totalMembers
    }
  }
`;
