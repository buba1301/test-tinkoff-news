import React from 'react';

import s from './Cars.module.css';

const Card = ({ newsName, id, background, onClick }) => {
  console.log('RENDER CARD');

  const style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <>
      <div
        className={s.newsCard}
        key={id}
        id={id}
        onClick={onClick}
        style={style}
      >
        {newsName}
      </div>
    </>
  );
};

const CardWrap = ({ newsOnPageList, onClick }) => {
  console.log('RENDER CARD WRAP');

  return (
    <>
      {newsOnPageList.map(({ newsName, id, background }) => {
        return (
          <Card
            newsName={newsName}
            id={id}
            background={background}
            onClick={onClick}
            key={id}
          />
        );
      })}
    </>
  );
};

export default CardWrap;
