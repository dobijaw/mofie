import React, { useState } from 'react';
import SubHeadline from 'components/SubHeadline/SubHeadline';
import Cast from 'components/Production/Cast/Cast';
import Button from 'components/Button/Button';
import styles from './AllCast.module.scss';

const AllCast = ({ cast }) => {
  const [isClose, setClose] = useState(true);

  return (
    <section className={styles.allCast}>
      <SubHeadline>Cast</SubHeadline>
      <Cast cast={isClose ? cast.slice(0, 6) : cast} />
      {cast.length > 6 && (
        <Button
          type="button"
          className={styles.allCast_button}
          handleClick={() => setClose(!isClose)}
          isCenter
        >
          {isClose ? 'more' : 'less'}
        </Button>
      )}
    </section>
  );
};

export default AllCast;
