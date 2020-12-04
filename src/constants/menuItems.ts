export interface MenuItem {
  name: string;
  path: string;
  displayInMenu: boolean;
}

const FIELD_ITEMS: MenuItem[] = [
  { name: "Все поля", path: "/fields", displayInMenu: true },
  { name: "Cтраница поля", path: "/field", displayInMenu: false },
  { name: "Создать поле", path: "/field/create", displayInMenu: true },
];

const USER_ITEMS: MenuItem[] = [
  { name: "Все пользователи", path: "/users", displayInMenu: true },
  { name: "Cтраница пользователя", path: "/user", displayInMenu: false },
];

const GAME_ITEMS: MenuItem[] = [
  { name: "Все игры", path: "/games", displayInMenu: true },
  { name: "Cтраница игры", path: "/game", displayInMenu: false },
  { name: "Создать игру", path: "/game/create", displayInMenu: true },
  { name: "Календарь", path: "/calendar", displayInMenu: false },
];

export const MENU_ITEMS_ARR = [...FIELD_ITEMS, ...USER_ITEMS, ...GAME_ITEMS];
export const MENU_ITEMS = {
  FIELD: FIELD_ITEMS,
  GAME: GAME_ITEMS,
  USER: USER_ITEMS,
};
