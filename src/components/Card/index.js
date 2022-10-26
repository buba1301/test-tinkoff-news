import React, { useState } from 'react';
import { useModal } from '../../hooks';

import s from './Cars.module.css';

const Card = ({ newsName, newsId, background, newsParts, onClick }) => {
  console.log('RENDER CARD');

  // const { open, Dialog } = useModal(newsParts);

  const style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <>
      <div
        className={s.newsCard}
        key={newsId}
        id={newsId}
        onClick={onClick}
        style={style}
      >
        {newsName}
      </div>
    </>
  );
};

const CardWrap = ({ newsOnPageList, newsParts }) => {
  const [currentNews, setCurrentNews] = useState('');

  const filterNewsPartsList = (newsParts, newsId) =>
    newsParts.filter(({ newsId }) => newsId === currentNews);

  const { open, Dialog } = useModal(newsParts);

  const handleClickOnCard = (e) => {
    console.log('handleClick', e.target.id);
    open();
    setCurrentNews(e.target.id);
  };

  console.log('RENDER CARD WRAP', newsOnPageList);

  return (
    <>
      {newsOnPageList.map(({ newsName, newsId, background }) => {
        return (
          <Card
            newsName={newsName}
            newsId={newsId}
            background={background}
            onClick={handleClickOnCard}
            key={newsId}
            newsParts={filterNewsPartsList(newsParts, newsId)}
          />
        );
      })}
      <Dialog />
    </>
  );
};

export default CardWrap;
