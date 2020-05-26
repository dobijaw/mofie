import React from 'react';
import PropTypes from 'prop-types';
import defaultPoster from 'assets/img/defaultPoster.svg';
import styles from './Poster.module.scss';

const Poster = ({ image, poster, asBackgroundImage, alt }) => (
  <>
    {asBackgroundImage ? (
      <div
        className={[
          styles.poster,
          styles.poster___background,
          poster ? styles.poster___vertical : styles.poster___horizontal,
          !image && styles.poster___default,
        ].join(' ')}
        style={{ backgroundImage: `url(${image || defaultPoster})` }}
      />
    ) : (
      <div
        className={
          poster
            ? [styles.poster, styles.poster___vertical].join(' ')
            : [styles.poster, styles.poster___horizontal].join(' ')
        }
      >
        <img
          className={
            image
              ? styles.poster_image
              : [styles.poster_image, styles.poster_image___default].join(' ')
          }
          src={image || defaultPoster}
          alt={alt}
        />
      </div>
    )}
  </>
);

Poster.propTypes = {
  image: PropTypes.string.isRequired,
  asBackgroundImage: PropTypes.bool,
  poster: PropTypes.bool,
  alt: PropTypes.string,
};

Poster.defaultProps = {
  asBackgroundImage: false,
  poster: false,
  alt: '',
};

export default Poster;
