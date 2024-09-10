import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// import { SidebarItem } from "../SidebarItem/SidebarItem";
import "./Sidebar.module.scss";
import { cn } from "shared/lib/helpers/classNames/classNames";
import { Button, ButtonVar } from "shared/Button/Button";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const { t, i18n } = useTranslation(["translation", "common"]);
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  // const itemsList = useMemo(
  //   () => sidebarItemsList.map((item) => <SidebarItem item={item} collapsed={collapsed} key={item.path} />),
  //   [collapsed, sidebarItemsList]
  // );

  return (
    <div className={cn("sidebar", { ["sidebar__collapsed"]: collapsed }, [className])}>
      <Button
        onClick={onToggle}
        className="sidebar__collapsed-btn"
        buttonVar={ButtonVar.BACKGROUND}
        // size={ButtonSize.XL}
        square
      >
        {collapsed ? ">" : "<"}
      </Button>

      {/* <div className={cls.items}>{itemsList}</div> */}

      <div className="sidebar__switchers">
        <ThemeSwitcher />
        <LangSwitcher className="sidebar__lang-switcher" />
      </div>
    </div>
  );
});
