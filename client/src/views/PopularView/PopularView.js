import React, { useContext } from 'react';
import { useFetch, useDataProduction } from 'hooks';
import { API_KEY } from 'config';
import PageTitle from 'components/PageTitle/PageTitle';
import Headline from 'components/Headline/Headline';
import ProductionList from 'components/ProductionList/ProductionList';
import { RootContext } from 'context';
import { FETCH_TYPE } from 'store';
import Loading from 'components/Loading/Loading';
import { selectProductionData } from 'universal';
import styles from './PopularView.module.scss';

const NowPlaying = () => {
  const context = useContext(RootContext);

  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const [moviesRes, moviesErr, moviesLoading] = useFetch(popularMoviesURL);
  const [showsRes, showsErr, showsLoading] = useFetch(popularShowsURL);

  const [movies, areMoviesLoaded] = useDataProduction(
    !moviesLoading && context?.movieGenres !== null,
    moviesRes?.results,
    context?.movieGenres?.genres,
    FETCH_TYPE.MOVIE,
    selectProductionData,
  );

  const [shows, areShowsLoaded] = useDataProduction(
    !showsLoading && context?.showGenres !== null,
    showsRes?.results,
    context?.showGenres?.genres,
    FETCH_TYPE.TV,
    selectProductionData,
  );

  return (
    <div className={styles.wrapper}>
      <PageTitle isHidden>Popular</PageTitle>
      {(moviesErr || showsErr) && <p>Something went wrong, sorry :(</p>}

      <div className={styles.popularProductionLists}>
        <Loading
          className={styles.popularLoading}
          loaded={areMoviesLoaded && areShowsLoaded}
          render={() => (
            <>
              <section className={styles.section}>
                <Headline tag="h2" additionalClass={styles.popularHeadline}>
                  Popular movies
                </Headline>
                <ProductionList
                  productionData={movies.slice(0, 15)}
                  className={styles.popularList}
                />
              </section>
              <section className={styles.section}>
                <Headline tag="h2" additionalClass={styles.popularHeadline}>
                  Popular TV shows
                </Headline>
                <ProductionList
                  productionData={shows.slice(0, 15)}
                  className={styles.popularList}
                />
              </section>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default NowPlaying;
