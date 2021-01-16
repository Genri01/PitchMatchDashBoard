import gql from "graphql-tag";

export const gamesQuery = gql`
  query Games($filter: GameFilter!, $pagination: Pagination) {
    getGames(filter: $filter, pagination: $pagination) {
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
