import gql from "graphql-tag";

export const usersStatsQuery = gql`
  query UsersStats {
    getUsersStats {
      rows {
        userId
        attendGames
        orgGames
        user {
          firstName
          lastName
          birthday
          gender
          avatar {
            url
          }
        }
      }
    }
  }
`;
