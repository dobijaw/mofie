import React, { useContext } from 'react';
import { useFetch, useDataProduction } from 'hooks';
import { API_KEY } from 'config';
import PageTitle from 'components/PageTitle/PageTitle';
import Headline from 'components/Headline/Headline';
import ProductionList from 'components/ProductionList/ProductionList';
import { RootContext } from 'context';
import { FETCH_TYPE } from 'types';
import Loading from 'components/Loading/Loading';
import { selectProductionData } from 'universal';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import NoData from 'components/NoData/NoData';
import styles from './PopularView.module.scss';

const PopularView = () => {
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
    <MainTemplate>
      <>
        <header>
          <PageTitle isHidden>Popular Productions</PageTitle>
          {(moviesErr || showsErr) && <NoData>Something went wrong, sorry :(</NoData>}
        </header>
        <main className={styles.popularView}>
          <Loading
            className={styles.popularView_loading}
            loaded={areMoviesLoaded && areShowsLoaded}
            render={() => (
              <div className={styles.popularView_columnsWrapper}>
                <div className={styles.popularView_columns}>
                  <section className={styles.popularView_section}>
                    <Headline tag="h2">Popular movies</Headline>
                    <ProductionList productionData={movies.slice(0, 15)} withMain />
                  </section>
                  <section className={styles.popularView_section}>
                    <Headline tag="h2">Popular TV shows</Headline>
                    <ProductionList productionData={shows.slice(0, 15)} withMain />
                  </section>
                </div>
              </div>
            )}
          />
        </main>
      </>
    </MainTemplate>
  );
};

export default PopularView;
