import { ArticleBlockType } from "../../model/consts"
import { ArticleBlock } from "../../model/types"
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock"
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock"
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock"

export const renderArticleBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlock key={block.id} className="article-details__block" block={block} />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlock key={block.id} className="article-details__block" block={block} />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlock key={block.id} className="article-details__block" block={block} />
    default:
      return null
  }
}
