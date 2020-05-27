import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import DateFormat from 'components/DateFormat/DateFormat';
import Headline from 'components/Headline/Headline';
import styles from './Production.module.scss';
import Poster from './Poster/Poster';
import Genres from './Genres/Genres';
import Overview from './Overview/Overview';
import Crew from './Crew/Crew';
import Keywords from './Keywords/Keywords';
import Tagline from './Tagline/Tagline';

const Production = ({
  handleRemoveFromCollection,
  handleModalOpen,
  isInCollection,
  releaseDate,
  overview,
  keywords,
  tagline,
  genres,
  isAuth,
  image,
  title,
  crew,
}) => (
  <section className={styles.production}>
    <div className={[styles.production_column, styles.production_column___poster].join(' ')}>
      <Poster image={image} poster />
    </div>
    <div className={[styles.production_column, styles.production_column___data].join(' ')}>
      <div className={styles.production_buttons}>
        {isInCollection ? (
          <Button
            asDelete
            type="button"
            handleClick={handleRemoveFromCollection}
            className={styles.production_singleButton}
          />
        ) : (
          isAuth && (
            <Button
              asAdd
              type="button"
              handleClick={handleModalOpen}
              className={styles.production_singleButton}
            />
          )
        )}
      </div>
      <div className={styles.production_data}>
        <DateFormat isSmall>{releaseDate}</DateFormat>
        <Headline tag="h2" asTitle>
          {title}
        </Headline>
        {tagline && <Tagline>{tagline}</Tagline>}
        <Genres genres={genres} />
        <Overview>{overview}</Overview>
        {crew && <Crew crew={crew} isMain />}
        {keywords && <Keywords keywords={keywords} />}
      </div>
    </div>
  </section>
);

Production.propTypes = {
  handleRemoveFromCollection: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  isInCollection: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagline: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuth: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  crew: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Production;
