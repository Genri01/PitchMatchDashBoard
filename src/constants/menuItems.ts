interface MenuItem {
  name: string;
  path: string;
  displayInMenu: boolean;
}

const FIELD_ITEMS: MenuItem[] = [
  { name: "Все поля", path: "/fields", displayInMenu: true },
  { name: "Cтраница поля", path: "/field", displayInMenu: false },
  { name: "Создать поле", path: "/field/create", displayInMenu: true },
];

export const MENU_ITEMS = {
  FIELD: FIELD_ITEMS,
  GAME: [],
  USER: [],
};
