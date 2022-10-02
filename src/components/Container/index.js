import React from 'react';

import s from './Container.module.css';

const Containner = () => {
  return (
    <div className={s.newsContainer}>
      <div className={s.newsWrap}>
        <div className={s.header}>
          <h1>Для вас</h1>
          <div className={s.sliderArrows}>
            <div className={s.arrowButtonsWrap}>
              <button></button>
            </div>
            <div className={s.arrowButtonsWrap}>
              <button></button>
            </div>
          </div>
        </div>
        <div>Contant</div>
        <div>Navigation</div>
      </div>
    </div>
  );
};

export default Containner;
