import React from 'react';

import s from './NewsList.module.css';

const NewsList = ({ data }) => {
  const { newsList } = data;

  console.log('newsList', newsList);

  return (
    <div className={s.newsWrap}>
      {newsList.map(({ newsName, newsId }) => {
        return (
          <div className={s.newsCard} key={newsId}>
            {newsName}
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
