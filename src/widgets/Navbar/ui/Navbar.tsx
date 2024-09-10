import React from "react";
import { cn } from "shared/lib/helpers/classNames/classNames";

import { AppLink, AppLinkColor } from "shared/ui/AppLink/AppLink";

import "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={cn("navbar", {}, [className])}>
      <div className={cn("navbar__links")}>
        <AppLink to={"/"} className={cn("navbar__link")} appLinkColor={AppLinkColor.Secondary}>
          Главная страница
        </AppLink>
        <AppLink to={"/about"} appLinkColor={AppLinkColor.Secondary}>
          О нас
        </AppLink>
      </div>
    </div>
  );
};
