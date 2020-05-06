import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from 'hooks';
import { API_KEY } from 'config';
import PageTitle from 'components/PageTitle/PageTitle';
import Headline from 'components/Headline/Headline';
import ProductionList from 'components/ProductionList/ProductionList';
import { RootContext } from 'context';
import { FETCH_TYPE } from 'store';
import styles from './PopularView.module.scss';

const NowPlaying = () => {
  const context = useContext(RootContext);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const [moviesRes] = useFetch(popularMoviesURL);
  const [showsRes] = useFetch(popularShowsURL);

  // change to hook
  const selectProductionData = (data, genresData, type) => {
    const output = data.map((p) => ({
      id: p.id,
      image: p.backdrop_path
        ? `http://image.tmdb.org/t/p/w500/${p.backdrop_path}`
        : p.poster_path && `http://image.tmdb.org/t/p/w500/${p.poster_path}`,
      releaseDate: type === 'movie' ? p.release_date : p.first_air_date,
      title: type === 'movie' ? p.title : p.name,
      genres: genresData
        .filter((i) => p.genre_ids.includes(i.id))
        .map((i) => i.name),
      productionType:
        type === FETCH_TYPE.MOVIE ? FETCH_TYPE.MOVIE : FETCH_TYPE.TV,
      rate: p.vote_average || 0,
    }));

    return output;
  };

  useEffect(() => {
    if (moviesRes !== null && context.movieGenres !== null) {
      const selectedData = selectProductionData(
        moviesRes.results,
        context.movieGenres.genres,
        FETCH_TYPE.MOVIE,
      );

      setMovies(selectedData);
    }
  }, [moviesRes, context]);

  useEffect(() => {
    if (showsRes !== null && context.showGenres !== null) {
      const selectedData = selectProductionData(
        showsRes.results,
        context.showGenres.genres,
        FETCH_TYPE.TV,
      );

      setShows(selectedData);
    }
  }, [showsRes, context]);

  return (
    <div className={styles.wrapper}>
      <PageTitle isHidden>Popular</PageTitle>

      <div className={styles.innerWrapper}>
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
      </div>
    </div>
  );
};

export default NowPlaying;
