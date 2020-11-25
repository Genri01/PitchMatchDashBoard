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

export const MENU_ITEMS_ARR = [...FIELD_ITEMS, ...USER_ITEMS];
export const MENU_ITEMS = {
  FIELD: FIELD_ITEMS,
  GAME: [],
  USER: USER_ITEMS,
};
