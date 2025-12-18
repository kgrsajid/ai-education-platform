import { Dropdown, Button, Space } from "antd";
import type { MenuProps } from "antd";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LanguagesEnum } from "./type/type";
import { LanguageItems as baseItems } from "./const/index";
import type { MenuItemType } from "antd/es/menu/interface";

export const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const items: MenuItemType[] = (baseItems ?? []).map(item => ({
    ...item,
    label: (
      <Space className="w-full justify-between">
        <span>{item.label}</span>
        {i18n.language === item.key && (
          <Check size={16} />
        )}
      </Space>
    )
  }));

  const onClick: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key as LanguagesEnum);
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        className="flex items-center gap-2"
      >
        <Globe size={18} />
        <span className="font-medium">
          {i18n.language.toUpperCase()}
        </span>
      </Button>
    </Dropdown>
  );
};
