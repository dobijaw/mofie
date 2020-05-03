import React from 'react';
import PropTypes from 'prop-types';
import styles from './Poster.module.scss';

const Poster = ({ image, asPoster, asBackgroundImage, alt }) => (
  <>
    {asBackgroundImage ? (
      <div
        className={`${styles.posterBackground} ${
          asPoster && styles.posterBackgroundPoster
        }`}
        style={{ backgroundImage: `url(${image})` }}
      />
    ) : (
      <div
        className={
          asPoster ? styles.posterContainerPoster : styles.posterContainer
        }
      >
        <img className={styles.posterImage} src={image} alt={alt} />
      </div>
    )}
  </>
);

Poster.propTypes = {
  image: PropTypes.string,
  asBackgroundImage: PropTypes.bool,
  asPoster: PropTypes.bool,
  alt: PropTypes.string,
};

Poster.defaultProps = {
  image: '',
  asBackgroundImage: false,
  asPoster: false,
  alt: '',
};

export default Poster;
