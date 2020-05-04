import React from 'react';
import PropTypes from 'prop-types';
import star from 'assets/img/star.svg';
import styles from './Rate.module.scss';

const Rate = ({ children, custom }) => (
  <>
    {custom ? (
      <span className={styles.rateItemCustom}>{children}</span>
    ) : (
      <div className={styles.rate}>
        <img src={star} alt="star" className={styles.rateIcon} />
        <span className={styles.rateItem}>{children}</span>
      </div>
    )}
  </>
);

Rate.propTypes = {
  children: PropTypes.isRequired,
};

export default Rate;
