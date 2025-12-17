export type SidebarItem =
  | ItemSidebar
  | DropdownSidebar
  | ListSidebar


export type ItemSidebar = {
  type: "item";
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export type DropdownSidebar = {
  type: "dropdown";
  label: string;
  icon?: React.ReactNode;
  children: {
    label: string;
    path: string;
  }[];
}

export type ListSidebar = {
  type: "list";
  label: string;
  icon?: React.ReactNode;
  list: {
    label: string;
    id: string;
  }[];
}
