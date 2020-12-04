import gql from "graphql-tag";

export const gamesQuery = gql`
  query Games($filter: GameFilter!) {
    getGames(filter: $filter) {
      count
      rows {
        id
        startDate
        address
        status
        price
        description
        user {
          id
          firstName
          lastName
        }
        totalMembers
      }
    }
  }
`;
