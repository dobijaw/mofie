import React from 'react';
import PropTypes from 'prop-types';
import { FETCH_TYPE } from 'types';
import Button from 'components/Button/Button';
import DateFormat from 'components/DateFormat/DateFormat';
import Headline from 'components/Headline/Headline';
import Shows from 'components/Shows/Shows';
import styles from './Production.module.scss';
import Poster from './Poster/Poster';
import Genres from './Genres/Genres';
import Overview from './Overview/Overview';
import Crew from './Crew/Crew';
import Keywords from './Keywords/Keywords';
import Tagline from './Tagline/Tagline';
import Budget from './Budget/Budget';
import Rate from './Rate/Rate';
import Creators from './Creators/Creators';

const Production = ({
  handleRemoveFromCollection,
  handleModalOpen,
  isInCollection,
  showsCreators,
  lastEpisode,
  lastEpisodeDate,
  nextEpisodeDate,
  releaseDate,
  overview,
  episodes,
  seasones,
  keywords,
  revenue,
  runTime,
  tagline,
  genres,
  isAuth,
  budget,
  image,
  title,
  crew,
  rate,
  type,
}) => (
  <section className={styles.production}>
    <div className={[styles.production_column, styles.production_column___poster].join(' ')}>
      <Poster image={image} poster />
    </div>
    <div className={[styles.production_column, styles.production_column___data].join(' ')}>
      <div className={styles.production_buttons}>
        {isInCollection && isAuth ? (
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
        <div className={styles.production_top}>
          <Rate>{rate}</Rate>
          {type === FETCH_TYPE.MOVIE ? (
            <DateFormat isSmall>{releaseDate}</DateFormat>
          ) : (
            <DateFormat isSmall>{`${releaseDate} to ${lastEpisode}`}</DateFormat>
          )}
        </div>
        <Headline tag="h2" asTitle>
          {title}
        </Headline>
        {tagline && <Tagline>{tagline}</Tagline>}
        <Genres genres={genres} />
        <Overview>{overview}</Overview>
        {type === FETCH_TYPE.MOVIE && crew ? (
          <Crew crew={crew} isMain />
        ) : (
          <Creators creators={showsCreators} />
        )}
        {budget && <Budget budget={budget} revenue={revenue} />}
        {type === FETCH_TYPE.TV && (
          <Shows
            episodes={episodes}
            seasones={seasones}
            lastEpisode={lastEpisodeDate}
            nextEpisode={nextEpisodeDate}
            runTime={runTime}
          />
        )}
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
  budget: PropTypes.number,
  rate: PropTypes.number,
  type: PropTypes.string.isRequired,
  lastEpisode: PropTypes.string,
  showsCreators: PropTypes.arrayOf(PropTypes.string),
  revenue: PropTypes.number,
  lastEpisodeDate: PropTypes.string,
  nextEpisodeDate: PropTypes.string,
  runTime: PropTypes.number,
  episodes: PropTypes.number,
  seasones: PropTypes.number,
};

Production.defaultProps = {
  budget: null,
  rate: null,
  lastEpisode: '',
  showsCreators: null,
  revenue: null,
  lastEpisodeDate: '',
  nextEpisodeDate: '',
  runTime: null,
  episodes: null,
  seasones: null,
};

export default Production;
