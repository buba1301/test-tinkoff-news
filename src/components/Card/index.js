import React from 'react';
import { useModal } from '../../hooks';

import s from './Cars.module.css';

const Card = ({ newsName, newsId, background, newsParts }) => {
  console.log('RENDER CARD');

  const { open, Dialog } = useModal();

  const style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <>
      <div
        className={s.newsCard}
        key={newsId}
        id={newsId}
        onClick={open}
        style={style}
      >
        {newsName}
      </div>
      <Dialog newsParts={newsParts} />
    </>
  );
};

export default Card;
