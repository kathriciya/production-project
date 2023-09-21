import {
  FC,
  HTMLAttributeAnchorTarget,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';

import { ArticleListItemSkeleton } from '@/entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ARTICLES_LIST_ITEM_LOCALSTORAGE_IDX } from '@/shared/const/localstorage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  onLoadNextPart?: () => void;
  Header?: () => JSX.Element;
  virtualized?: boolean;
}

const getSkeletons = () =>
  new Array(3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton
        className={cls.card}
        key={index}
        view={ArticleView.BIG}
      />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    virtualized = true,
    isLoading,
    target,
    onLoadNextPart,
    Header,
  } = props;
  const { t } = useTranslation();
  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  useEffect(() => {
    const paged =
      sessionStorage.getItem(ARTICLES_LIST_ITEM_LOCALSTORAGE_IDX) || 1;
    setSelectedArticleId(+paged);

    // return () => sessionStorage.removeItem(ARTICLES_LIST_ITEM_LOCALSTORAGE_IDX);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (view === 'SMALL') {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId);
        }
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedArticleId, view]);

  const renderArticle = (index: number, article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
      target={target}
      index={index}
    />
  );

  if (!virtualized) {
    return (
      <HStack wrap="wrap" gap="16">
        {articles.length > 0
          ? articles.map((article, index) => renderArticle(index, article))
          : null}
        {isLoading && getSkeletons()}
      </HStack>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = memo(() => {
    if (isLoading) {
      return <div className={cls.skeleton}>{getSkeletons()}</div>;
    }
    return null;
  });

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  const ItemContainerComp: FC<{
    index: number;
    // eslint-disable-next-line react/no-unstable-nested-components
  }> = ({ index }) => (
    <div className={cls.ItemContainer}>
      <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
    </div>
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {/* {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)} */}
      {view === 'BIG' ? (
        <Virtuoso
          style={{ height: '100%' }}
          data={articles}
          itemContent={renderArticle}
          endReached={onLoadNextPart}
          initialTopMostItemIndex={selectedArticleId}
          components={{
            Header,
            Footer,
          }}
        />
      ) : (
        <VirtuosoGrid
          ref={virtuosoGridRef}
          totalCount={articles.length}
          components={{
            Header,
            ScrollSeekPlaceholder: ItemContainerComp,
          }}
          endReached={onLoadNextPart}
          data={articles}
          itemContent={renderArticle}
          listClassName={cls.itemsWrapper}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 200,
            exit: (velocity) => Math.abs(velocity) < 30,
          }}
        />
      )}
    </div>
  );
});
