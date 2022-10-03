import React, { useState } from 'react';

import s from './NewsList.module.css';

const NewsList = ({ newsList, openModal }) => {
  return (
    <>
      <div className={s.newsWrap}>
        {newsList.map(({ newsName, newsId }) => {
          return (
            <div
              className={s.newsCard}
              key={newsId}
              id={newsId}
              onClick={openModal}
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
