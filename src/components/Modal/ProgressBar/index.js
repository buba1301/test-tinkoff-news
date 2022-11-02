import React, { useContext, useEffect } from 'react';
import cn from 'classnames';

import s from './ProgressBar.module.css';

import { ModalContext } from '../../../context';

import { checkoutNews } from '../utils';

const ProgressBar = ({
  newsParts,
  active,
  currentPartIndex,
  lastPart,
  setcurrentPartIndex,
  closeModal,
}) => {
  const { currentNewsId, newsIds, setCurrentNewsId } =
    useContext(ModalContext);

  const currentNewsIndex = newsIds.indexOf(currentNewsId);

  const isLastPart = currentPartIndex === lastPart;
  const isLastNews = currentNewsIndex === newsIds.length - 1;

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isLastPart) {
        if (isLastNews) {
          console.log('!!!');
          closeModal();
          setcurrentPartIndex(0);
          setCurrentNewsId('');
          return;
        }

        checkoutNews(currentNewsIndex, newsIds, setCurrentNewsId);

        setcurrentPartIndex(0);
        return;
      }

      setcurrentPartIndex((prevState) => prevState + 1);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentPartIndex]);

  return (
    <div className={s.progressBarWrap}>
      {newsParts.map(({ id }) => {
        const classNames = cn(s.progressBar, {
          [s.active]: active === id,
        });

        return (
          <div className={s.progressBarContainer} key={id}>
            <div className={classNames} />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
