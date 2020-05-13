import React, { useState, useEffect, useContext } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import Pagination from 'components/Pagination/Pagination';
import { useFetch } from 'hooks';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import { API_KEY } from 'config';
import ProductionList from 'components/ProductionList/ProductionList';
import { FETCH_TYPE } from 'store';
import { RootContext } from 'context';
import styles from './MovieView.module.scss';

const MovieView = () => {
  const context = useContext(RootContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [queryURL, setQueryURL] = useState(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
  );
  const [movies, setMovies] = useState([]);
  const [response, error, loading] = useFetch(queryURL);

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
    if (!loading && context?.movieGenres !== null) {
      const selectedData = selectProductionData(
        response.results,
        context.movieGenres.genres,
        FETCH_TYPE.MOVIE,
      );

      setMovies(selectedData);
    }
  }, [response, context, loading]);

  useEffect(() => {
    if (!loading) setTotalPages(response?.total_pages);
  }, [response, loading]);

  return (
    <div className={styles.wrapper}>
      <PageTitle>Search movie</PageTitle>
      <Form
        className={styles.form}
        initialValues={{
          search: '',
        }}
        validate={(values) => ({
          search: [
            {
              correct: values.search.length,
              errorMessage: 'Search needs a value!',
            },
          ],
          message: [],
        })}
        onSubmit={(values) => {
          const query = encodeURIComponent(values.search);
          const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${currentPage}`;
          setQueryURL(URL);
        }}
        render={(values, errors, handleChange, handleBlur) => (
          <>
            <Field
              id="search"
              type="text"
              placeholder="Movie title"
              value={values.search}
              name="search"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Search"
              error={errors.search}
            />
            <Button type="submit">Search</Button>
          </>
        )}
      />
      {!loading && !error && (
        <ProductionList productionData={movies} className={styles.movies} />
      )}

      <Pagination
        current={currentPage}
        total={totalPages}
        handleCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default MovieView;
