import { MessageCircle, TestTube, WalletCards, ClipboardCheck, Bot, Trophy } from "lucide-react";
import { ROUTES } from "../../../app/router/config";
import type { SidebarItem } from "../type/type";


export const sidebarItems: SidebarItem[] = [
  {
    type: "list",
    label: "sidebar.labels.chat",
    list: [],
    icon: <MessageCircle size={23} />
  },
  {
    type: "item",
    label: "sidebar.labels.quiz",
    path: ROUTES.Quiz,
    icon: <TestTube size={23} />,
  },
  {
    type: "item",
    label: "sidebar.labels.cards",
    path: ROUTES.Cards,
    icon: <WalletCards size={23} />,
  },
  {
    type: "item",
    label: "Assignment",
    path: ROUTES.Assignments,
    icon: <ClipboardCheck size={23} />,
  },
  {
    type: "item",
    label: "AI Trainer",
    path: ROUTES.Trainer,
    icon: <Bot size={23} />,
  },
  {
    type: "item",
    label: "Leaderboard",
    path: ROUTES.Leaderboard,
    icon: <Trophy size={23} />,
  },
];
