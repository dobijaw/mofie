import React from 'react';
import PropTypes from 'prop-types';
import styles from './Keywords.module.scss';

const Keywords = ({ keywords }) => (
  <>
    {keywords.length && (
      <ul className={styles.keywords}>
        {keywords.map((k) => (
          <li className={styles.keywordsItem} key={k.id}>
            {k.name}
          </li>
        ))}
      </ul>
    )}
  </>
);

Keywords.propTypes = {
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default Keywords;
