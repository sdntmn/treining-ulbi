// import { memo } from "react"
// import { useSelector } from "react-redux"

// import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
// import { classNames } from "shared/lib/classNames/classNames"

// import cls from "./SidebarItem.module.scss"

// import { getUserAuthData } from "entities/User"
// import { ISidebarItemType } from "4_widgets/Sidebar/model/types/sidebar"

// interface ISidebarItemProps {
//   item: ISidebarItemType
//   collapsed: boolean
// }

// export const SidebarItem = memo(({ item, collapsed }: ISidebarItemProps) => {
//   const isAuth = useSelector(getUserAuthData)
//   if (item.authOnly && !isAuth) {
//     return null
//   }
//   return (
//     <AppLink
//       className={classNames(cls.item, [], { [cls.collapsed]: collapsed })}
//       theme={AppLinkTheme.SECONDARY}
//       to={item.path}
//     >
//       <item.Icon className={cls.icon} />
//       <span className={cls.link}>{item.text}</span>
//     </AppLink>
//   )
// })
