import React from 'react';

import s from './Cars.module.css';

const Card = ({ newsName, newsId, background, newsParts }) => {
  console.log('RENDER CARD');

  const style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <div
      className={s.newsCard}
      key={newsId}
      id={newsId}
      // onClick={openModal}
      style={style}
    >
      {newsName}
    </div>
  );
};

export default Card;
