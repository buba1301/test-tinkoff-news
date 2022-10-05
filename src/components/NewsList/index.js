import React from 'react';

import s from './NewsList.module.css';

const NewsList = ({ newsList, openModal }) => {
  console.log('newslist', newsList);

  return (
    <>
      <div className={s.newsWrap}>
        {newsList.map(({ newsName, newsId, background }) => {
          const style = {
            backgroundImage: `url(${background})`,
          };

          return (
            <div
              className={s.newsCard}
              key={newsId}
              id={newsId}
              onClick={openModal}
              style={style}
            >
              {newsName}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewsList;
