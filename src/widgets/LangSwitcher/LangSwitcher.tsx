import "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import { Button, ButtonVar } from "shared/Button/Button";

import { cn } from "shared/lib/helpers/classNames/classNames";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button className={cn("lang-switcher", {}, [className])} buttonVar={ButtonVar.CLEAR} onClick={changeLanguage}>
      {t("language")}
    </Button>
  );
};
