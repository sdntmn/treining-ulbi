import React from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Navbar.module.scss"

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={cn("navbar", {}, [className])}>
      <div className={cn("navbar__links")}></div>
    </div>
  )
}
