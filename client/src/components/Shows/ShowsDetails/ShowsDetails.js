import React from 'react';
import PropTypes from 'prop-types';
import styles from './ShowsDetails.module.scss';

const ShowsDetails = ({ name, value }) => (
  <section className={styles.showsDetails}>
    <h3 className={styles.showsDetails_headline}>{name}</h3>
    <span className={styles.showsDetails_value}>{value}</span>
  </section>
);

ShowsDetails.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ShowsDetails;
