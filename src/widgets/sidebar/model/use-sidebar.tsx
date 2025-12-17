import { useLocation } from "react-router-dom";

export const useSidebar = () => {
  const { pathname } = useLocation();

  const isItemActive = (path: string) =>
    pathname === path;

  const isDropdownActive = (
    children: { path: string }[]
  ) =>
    children.some(child =>
      pathname.startsWith(child.path)
    );

  const isListActive = (
    list: { id: string }[],
    basePath: string
  ) =>
    list.some(item =>
      pathname.startsWith(`${basePath}/${item.id}`)
    );

  const isListSubActive = (
    id: string,
    basePath: string
  ) => 
    pathname === `${basePath}/${id}`;

  return {
    pathname,
    isItemActive,
    isDropdownActive,
    isListActive,
    isListSubActive
  };
};
