import React, { useContext, useEffect } from 'react';
import cn from 'classnames';

import s from './ProgressBar.module.css';

import { ModalContext } from '../../../context';

import checkoutToNextNews from '../utils';

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

  console.log('Active', active);

  const currentNewsIndex = newsIds.indexOf(currentNewsId);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currentPartIndex === lastPart) {
        if (currentNewsIndex === newsIds.length - 1) {
          closeModal();
          setcurrentPartIndex(0);
          setCurrentNewsId('');
          return;
        }

        checkoutToNextNews(
          currentNewsIndex,
          newsIds,
          setCurrentNewsId
        );

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
