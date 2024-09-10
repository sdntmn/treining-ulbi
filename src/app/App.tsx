import { cn } from "shared/lib/helpers/classNames/classNames";

import { useTheme } from "shared/lib/hooks/useTheme/useTheme";

import { АррRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import "./styles/index.scss";
import { Sidebar } from "widgets/SideBar";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <div className={cn("app", {}, [theme])}>
      <Suspense fallback={""}>
        <Navbar />
        <div className={cn("app__page")}>
          <Sidebar />
          <АррRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
