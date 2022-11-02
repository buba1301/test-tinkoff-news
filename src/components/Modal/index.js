import React, { useContext, useState } from 'react';

import s from './Modal.module.css';

import { ModalContext } from '../../context';

import ProgressBar from './ProgressBar';
import NewsText from './NewsText';
import SwitchButtons from './SwitchButtons';

const Modal = ({ isOpen, onClosed, close }) => {
  const [currentPartIndex, setcurrentPartIndex] = useState(0);

  const { newsPartsList, currentNewsId } = useContext(ModalContext);

  const currenNewsParts = newsPartsList.byId.filter(
    ({ newsId }) => newsId === currentNewsId
  );

  const currenNewsPart = currenNewsParts[currentPartIndex];

  const lastPart = currenNewsParts.length - 1;

  return (
    <div className={s.modalBlanket} onClick={onClosed}>
      <div className={s.modal}>
        <ProgressBar
          currentPartIndex={currentPartIndex}
          lastPart={lastPart}
          newsParts={currenNewsParts}
          active={currenNewsPart.id}
          setcurrentPartIndex={setcurrentPartIndex}
          closeModal={close}
        />
        <NewsText textList={currenNewsPart.textList} />
        <SwitchButtons
          currentPartIndex={currentPartIndex}
          lastPart={lastPart}
          setcurrentPartIndex={setcurrentPartIndex}
        />
      </div>
    </div>
  );
};

export default Modal;
