import React from 'react';
import PropTypes from 'prop-types';
import styles from './Position.module.scss';

const Position = ({ job, name, isMain }) => (
  <>
    <span
      className={[
        styles.position_item,
        styles.position_item___job,
        isMain && styles.position_item___main,
      ].join(' ')}
    >
      {job}:
    </span>
    <span
      className={[
        styles.position_item,
        styles.position_item___name,
        isMain && styles.position_item___main,
      ].join(' ')}
    >
      {name}
    </span>
  </>
);

Position.propTypes = {
  job: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isMain: PropTypes.bool,
};

Position.defaultProps = {
  isMain: false,
};

export default Position;
