import { ArticleBlockType } from "../consts"

export interface ArticleBaseBlock {
  id: string
  type: ArticleBlockType
}

export interface ArticleCode extends ArticleBaseBlock {
  type: ArticleBlockType.CODE
  code: string
}

export interface ArticleImage extends ArticleBaseBlock {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
}

export interface ArticleText extends ArticleBaseBlock {
  type: ArticleBlockType.TEXT
  paragraphs: string[]
  title?: string
}

export type ArticleBlock = ArticleCode | ArticleImage | ArticleText
