import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Icon.module.scss"

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">
interface IconBaseProps extends SvgProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface IconNonClickableProps extends IconBaseProps {
  clickable?: false
}

interface IconClickableProps extends IconBaseProps {
  clickable: true
  onClick: () => void
}

type IconProps = IconNonClickableProps | IconClickableProps

export const Icon: React.FC<IconProps> = memo(function Icon(props: IconProps) {
  const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props

  const svgProps = {
    width,
    height,
    className: cn("icon", [className]),
    ...otherProps,
    ...(clickable ? { onClick: undefined } : {}),
  }
  const Icon = <Svg {...svgProps} />

  if (clickable) {
    return (
      <button
        type="button"
        className="icon__button"
        onClick={props?.onClick}
        style={{ width, height }}
      >
        {Icon}
      </button>
    )
  }

  return Icon
})
