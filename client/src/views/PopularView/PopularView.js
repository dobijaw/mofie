import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    fetch('http://localhost:9000/production/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addedBy: '1234',
        type: 'movie',
        productionID: '123',
        data: {
          genres: ['Action'],
          image: '/image/124',
          overview: 'nice',
          rate: 7.6,
          releaseDate: '2019-09-09',
          tagline: 'Tagline',
          title: 'Nice movie',
        },
        customData: {
          category: {
            value: 'love it',
            id: '123467564',
            key: 'LOVE_IT',
          },
          comment: 'Realy nice',
          rate: { value: '10', id: '365etrgdfs' },
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <MainTemplate>
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
    </MainTemplate>
  );
};

export default NowPlaying;
