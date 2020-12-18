export enum Routes {
  HOME = "/",
  LOGIN = "/login",
  USER = "/user/:id",
  USERS = "/users/:pageNum?/:rowsPerPage?",

  FIELD = "/field/:id",
  FIELDS = "/fields/:pageNum?/:rowsPerPage?",
  CREATE_FIELD = "/field/create",
  EDIT_FIELD = "/field/edit/:id",

  GAME = "/game/:id",
  GAMES = "/games/:pageNum?/:rowsPerPage?",
  CREATE_GAME = "/game/create",

  GAMES_CALENDAR = "/calendar/:year?/:month?",
}
