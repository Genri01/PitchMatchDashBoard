import gql from "graphql-tag";

export const usersStatsQuery = gql`
  query UsersStats($filter: UserStatsFilter,  $pagination: Pagination) {
    getUsersStats(filter: $filter,  pagination: $pagination) {
      rows {
        userId
        attendGames
        orgGames
        user {
          id
          firstName
          lastName
          birthday
          gender
          email
          phone
          role
          avatar {
            url
          }
        }
        games {
          userId
        }
      }
    }
  }
`;
