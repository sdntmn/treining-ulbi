import React, { memo, useState } from "react"

import StarIcon from "@/shared/assets/icons/star.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { Icon } from "@/shared/ui/Icon/Icon"

import "./StarRating.module.scss"

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating: React.FC<StarRatingProps> = memo(
  (props: StarRatingProps) => {
    const { className, size = 30, selectedStars = 0, onSelect } = props
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
      if (!isSelected) {
        setCurrentStarsCount(starsCount)
      }
    }

    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarsCount(0)
      }
    }

    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount)
        setCurrentStarsCount(starsCount)
        setIsSelected(true)
      }
    }

    return (
      <div className={cn("star-rating", [className])}>
        {stars.map((starNumber) => (
          <Icon
            className={cn("star-rating__icon", [
              isSelected && "star-rating__selected",
              currentStarsCount >= starNumber
                ? "star-rating_hovered"
                : "start-rating_normal",
            ])}
            Svg={StarIcon}
            key={starNumber}
            width={size}
            height={size}
            onMouseLeave={onLeave}
            onMouseEnter={onHover(starNumber)}
            onClick={onClick(starNumber)}
          />
        ))}
      </div>
    )
  }
)

StarRating.displayName = "StarRating"
