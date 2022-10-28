import React from 'react';
import cn from 'classnames';

import s from './ProgressBar.module.css';

const ProgressBar = ({ newsParts, active }) => {
  console.log('Render Progress', newsParts);
  return (
    <div className={s.progressBarWrap}>
      {newsParts.map(({ id }) => {
        const classNames = cn(s.progressBar, {
          [s.active]: active === id,
        });
        return (
          <div className={s.progressBarContainer}>
            <div className={classNames} key={id} />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
