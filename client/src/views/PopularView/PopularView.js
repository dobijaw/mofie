import React, { useContext, useState, useEffect } from 'react';
import { useFetch, useDataProduction } from 'hooks';

import { API_KEY } from 'config';
import { RootContext } from 'context';
import NoData from 'components/NoData/NoData';
import Loading from 'components/Loading/Loading';
import { selectProductionData } from 'universal';
import Headline from 'components/Headline/Headline';
import PageTitle from 'components/PageTitle/PageTitle';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import ProductionList from 'components/ProductionList/ProductionList';
import styles from './PopularView.module.scss';

const PopularView = () => {
  const { movieGenres, movieGenresLoading, showGenres, showGenresLoading } = useContext(
    RootContext,
  );

  const [isDesktop, toggleDesktopView] = useState(false);

  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
  const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;

  const [moviesRes, moviesErr, moviesLoading] = useFetch(popularMoviesURL);
  const [showsRes, showsErr, showsLoading] = useFetch(popularShowsURL);

  const [movies, areMoviesLoaded] = useDataProduction(
    !moviesLoading && !movieGenresLoading,
    moviesRes?.results,
    movieGenres?.genres,
    showGenres?.genres,
    selectProductionData,
  );

  const [shows, areShowsLoaded] = useDataProduction(
    !showsLoading && !showGenresLoading,
    showsRes?.results,
    movieGenres?.genres,
    showGenres?.genres,
    selectProductionData,
  );

  const handleResize = () => {
    if (window.innerWidth >= 960) {
      toggleDesktopView(true);
    } else {
      toggleDesktopView(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MainTemplate>
      <>
        <div>
          <PageTitle isHidden>Popular Productions</PageTitle>
          {(moviesErr || showsErr) && <NoData>Something went wrong, sorry :(</NoData>}
        </div>
        <div className={styles.popularView}>
          <Loading
            className={styles.popularView_loading}
            loaded={areMoviesLoaded && areShowsLoaded}
            render={() => (
              <div className={styles.popularView_columnsWrapper}>
                <div className={styles.popularView_columns}>
                  <section className={styles.popularView_section}>
                    <Headline tag="h2">Popular movies</Headline>
                    <ProductionList
                      productionData={isDesktop ? movies.slice(0, 15) : movies.slice(0, 8)}
                      withMain
                    />
                  </section>
                  <section className={styles.popularView_section}>
                    <Headline tag="h2">Popular TV shows</Headline>
                    <ProductionList
                      productionData={isDesktop ? shows.slice(0, 15) : shows.slice(0, 8)}
                      withMain
                    />
                  </section>
                </div>
              </div>
            )}
          />
        </div>
      </>
    </MainTemplate>
  );
};

export default PopularView;
