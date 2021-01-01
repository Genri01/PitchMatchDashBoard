import gql from "graphql-tag";

export const userStatsQuery = gql`
  query UserStats($id: ID!) {
    getUserStats(id: $id) {
      userId
      attendGames
      orgGames
      user {
        id
        firstName
        lastName
        role
        avatar {
          url
        }
        email
        phone
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
      games {
        id
        placeId
      }
    }
  }
`;
