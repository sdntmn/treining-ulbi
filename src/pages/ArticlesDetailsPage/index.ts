/* eslint-disable max-len */
import { ArticleDetailsPageAsync } from "./ui/ArticleDetailsPage/ArticleDetailsPage.async"

export { ArticleDetailsPageAsync as ArticleDetailsPage }

export { ArticleDetailsCommentsSchema } from "./model/types/ArticleDetailsCommentsSchema"
export { ArticleDetailsRecommendationsSchema } from "./model/types/ArticleDetailsRecommendationsSchema"
export { articleDetailsCommentsReducer } from "./model/slices/articleDetailsCommentsSlice"
export { articleDetailsPageRecommendationsReducer } from "./model/slices/articleDetailsPageRecommendationsSlice"
export type { ArticleDetailsPageSchema } from "./model/types"
