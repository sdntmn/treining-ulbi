import AboutPageIcon from "shared/assets/icons/about-page.svg"
import MainPageIcon from "shared/assets/icons/main-page.svg"
import ProfilePageIcon from "shared/assets/icons/profile-page.svg"
import { RouterPath } from "shared/config/routerConfig/routerConfig"
import { RouteNames } from "shared/config/routerConfig/routerConfig"

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  { path: RouterPath[RouteNames.MAIN], text: "Главная", Icon: MainPageIcon },
  { path: RouterPath[RouteNames.ABOUT], text: "О сайте", Icon: AboutPageIcon },
  {
    path: RouterPath[RouteNames.PROFILE],
    text: "Профиль",
    Icon: ProfilePageIcon,
  },
]
