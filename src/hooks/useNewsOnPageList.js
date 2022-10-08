import { useEffect, useState } from 'react';

const getNewsIndexOnPage = (newsOnPage, newsPagesCount, currentPage) => {
  let res = {};

  let startIndex = 0;
  let lastIndex = newsOnPage;

  for (let i = 0; i < newsPagesCount; i++) {
    res = { ...res, [i + 1]: [startIndex, lastIndex] };
    startIndex = startIndex + newsOnPage;
    lastIndex = lastIndex + newsOnPage;
  }

  return res[currentPage];
};

export const useNewsOnPageList = (data, currentPage) => {
  const [newsOnPageList, setNewsOnPageList] = useState([]);

  useEffect(() => {
    if (data.newsList.length > 0) {
      const newsPagesCount = data.newsPagesCount;

      const newsOnPage = data.newsList.length / data.newsPagesCount;

      const [startNewsIndex, lastNewsIndex] = getNewsIndexOnPage(
        newsOnPage,
        newsPagesCount,
        currentPage
      );

      const newsOnCurrentPageList = data.newsList.slice(
        startNewsIndex,
        lastNewsIndex
      );

      setNewsOnPageList(newsOnCurrentPageList);
    }
  }, [data, currentPage]);

  return { newsOnPageList };
};
