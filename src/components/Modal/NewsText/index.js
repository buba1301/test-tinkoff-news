import React from 'react';
import cn from 'classnames';

import s from './NewsText.module.css';

const NewsText = ({ textList }) => {
  const handleClickNewsLink = (e) => {
    e.stopPropagation();
    console.log('Click on link news');
  };

  return textList.map((elem, index) => {
    const classNamesTextContainer = (index) => {
      const key = `text${index}`;
      return cn(s[key]);
    };

    return (
      <div
        className={classNamesTextContainer(index)}
        key={elem.id}
        onClick={handleClickNewsLink}
      >
        <p>{elem.text}</p>
      </div>
    );
  });
};

export default NewsText;
