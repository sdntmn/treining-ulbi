import { User } from "@/entities/User"

import { ArticleBlock } from "./articleBlocks"
import { ArticleType } from "../consts/consts"

export interface Article {
  id: string
  title: string
  user: User
  subTitle: string
  img: string
  views: number
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[]
}
