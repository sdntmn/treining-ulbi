import { User } from "entities/User"

export enum ArticleBlockType {
  CODE = "CODE",
  IMAGE = "IMAGE",
  TEXT = "TEXT",
}

export enum ArticleSortField {
  VIEWS = "views",
  TITLE = "title",
  CREATED = "createdAt",
}

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

export enum ArticleType {
  ALL = "ALL",
  IT = "IT",
  SCIENCE = "SCIENCE",
  ECONOMICS = "ECONOMICS",
  POLITICS = "POLITICS",
}

export enum ArticleViewType {
  CARD = "card",
  LIST = "list",
}

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
