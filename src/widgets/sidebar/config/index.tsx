import { Gamepad, MessageCircle, TestTube, WalletCards } from "lucide-react";
import { ROUTES } from "../../../app/router/config";
import type { SidebarItem } from "../type/type";


export const sidebarItems: SidebarItem[] = [
  {
    type: "list",
    label: "Chat",
    list: [],
    icon: <MessageCircle size={23} />
  },
  {
    type: "item",
    label: "Quiz",
    path: ROUTES.Quiz,
    icon: <TestTube size={23} />,
  },
  {
    type: "item",
    label: "Games",
    path: ROUTES.Games,
    icon: <Gamepad size={23} />,
  },
  {
    type: "item",
    label: "Cards",
    path: ROUTES.Cards,
    icon: <WalletCards size={23} />,
  }
];
