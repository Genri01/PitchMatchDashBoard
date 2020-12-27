import gql from "graphql-tag";

export const usersStatsQuery = gql`
  query UsersStats($filter: UserStatsFilter) {
    getUsersStats(filter: $filter) {
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
      }
    }
  }
`;
