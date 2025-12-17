type SidebarItem =
  | {
      type: "item";
      label: string;
      path: string;
      icon?: React.ReactNode;
    }
  | {
      type: "dropdown";
      label: string;
      icon?: React.ReactNode;
      children: {
        label: string;
        path: string;
      }[];
    };

export const sidebarItems: SidebarItem[] = [
  {
    type: "item",
    label: "Главная",
    path: "/",
  },
  {
    type: "dropdown",
    label: "Чаты",
    children: [
      { label: "Все чаты", path: "/chats" },
      { label: "Избранные", path: "/chats/favorite" },
    ],
  },
  {
    type: "item",
    label: "Профиль",
    path: "/profile",
  },
];
