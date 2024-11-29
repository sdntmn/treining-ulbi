import { ArticleViewSelector } from "entities/Article"
import {
  ArticleType,
  ArticleViewType,
} from "entities/Article/model/types/article"
import { memo, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { SortOrder } from "shared/types"
import { Card } from "shared/ui/Card/Card"
import { Input } from "shared/ui/Input/Input"
import { Select } from "shared/ui/Select/Select"

import { getArticlesPageView } from "../../model/selectors/articlesPageSelectors"
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList"
import { articlesPageActions } from "../../model/slices/articlePageSlace"

import "./ArticlesPageFilters.module.scss"

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersProps> = memo(
  function ArticlesPageFilters(props: ArticlesPageFiltersProps) {
    const { className } = props
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)
    //   const sort = useSelector(getArticlesPageSort)
    //   const order = useSelector(getArticlesPageOrder)
    //   const search = useSelector(getArticlesPageSearch)
    //   const type = useSelector(getArticlesPageType)

    // const fetchData = useCallback(() => {
    //   dispatch(fetchArticlesList({ replace: true }))
    // }, [dispatch])

    // const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
      (view: ArticleViewType) => {
        dispatch(articlesPageActions.setView(view))
      },
      [dispatch]
    )

    // const onChangeSort = useCallback(
    //   (newSort: ArticleSortField) => {
    //     dispatch(articlesPageActions.setSort(newSort))
    //     dispatch(articlesPageActions.setPage(1))
    //     fetchData()
    //   },
    //   [dispatch, fetchData]
    // )

    // const onChangeOrder = useCallback(
    //   (newOrder: SortOrder) => {
    //     dispatch(articlesPageActions.setOrder(newOrder))
    //     dispatch(articlesPageActions.setPage(1))
    //     fetchData()
    //   },
    //   [dispatch, fetchData]
    // )

    // const onChangeSearch = useCallback(
    //   (search: string) => {
    //     dispatch(articlesPageActions.setSearch(search))
    //     dispatch(articlesPageActions.setPage(1))
    //     debouncedFetchData()
    //   },
    //   [dispatch, debouncedFetchData]
    // )

    // const onChangeType = useCallback(
    //   (value: ArticleType) => {
    //     dispatch(articlesPageActions.setType(value))
    //     dispatch(articlesPageActions.setPage(1))
    //     debouncedFetchData()
    //   },
    //   [dispatch, debouncedFetchData]
    // )

    return (
      <div className={cn("articles-page-filters", [className])}>
        <div className="articles-page-filters__sort-wrapper">
          <Select label="По" />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className="articles-page-filters__search">
          <Input
            // onChange={onChangeSearch}
            // value={search}
            placeholder={"Поиск"}
          />
        </Card>
        {/* <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      /> */}
      </div>
    )
  }
)
