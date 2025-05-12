// eslint-disable-next-line paths-import/imports-layers
import { User } from "@/entities/User"

import { ArticleType } from "../consts/consts"

import { ArticleBlock } from "./articleBlocks"

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
