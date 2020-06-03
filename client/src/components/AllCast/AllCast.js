import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import SubHeadline from 'components/SubHeadline/SubHeadline';
import Cast from 'components/Production/Cast/Cast';
import Button from 'components/Button/Button';
import styles from './AllCast.module.scss';

const AllCast = ({ cast }) => {
  const [isClose, setClose] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const castRef = useRef(null);

  const scrollToTopOfSection = () => {
    const fromTop = castRef.current.offsetTop;

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: fromTop,
    });
  };

  const handleClick = () => {
    setInitialRender(false);
    setClose(!isClose);
  };

  useEffect(() => {
    if (isClose && !initialRender) scrollToTopOfSection();
  }, [isClose, initialRender]);

  return (
    <section className={styles.allCast} ref={castRef}>
      <SubHeadline>Cast</SubHeadline>
      <Cast cast={isClose ? cast.slice(0, 6) : cast} />
      {cast.length > 6 && (
        <Button
          type="button"
          className={styles.allCast_button}
          handleClick={handleClick}
          isCenter
        >
          {isClose ? 'more' : 'less'}
        </Button>
      )}
    </section>
  );
};

AllCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AllCast;
