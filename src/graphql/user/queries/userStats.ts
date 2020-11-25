import gql from "graphql-tag";

export const userStatsQuery = gql`
  query UserStats($id: ID!) {
    getUserStats(id: $id) {
      userId
      attendGames
      orgGames
      user {
        firstName
        lastName
        avatar {
          url
        }
        birthday
        gender
        prefferedPosition
        bannedAt
        banReason
        ratingScore
        ratingTotal
        attendyScore
        attendyTotal
        checkinRating
        commercialFrom
      }
    }
  }
`;