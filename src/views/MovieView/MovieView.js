import React, { useState, useEffect, useContext, useCallback } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import Pagination from 'components/Pagination/Pagination';
import { useFetch, useDataProduction } from 'hooks';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import { API_KEY } from 'config';
import ProductionList from 'components/ProductionList/ProductionList';
import { FETCH_TYPE } from 'store';
import { RootContext } from 'context';
import { selectProductionData } from 'universal';
import Loading from 'components/Loading/Loading';
import styles from './MovieView.module.scss';

const MovieView = () => {
  const context = useContext(RootContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const baseURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  const [queryURL, setQueryURL] = useState(baseURL);
  const [response, error, loading] = useFetch(queryURL);
  const [saveQuery, setSaveQuery] = useState('');

  const [movies] = useDataProduction(
    !loading && context?.movieGenres !== null,
    response?.results,
    context?.movieGenres?.genres,
    FETCH_TYPE.MOVIE,
    selectProductionData,
  );

  const generateLink = useCallback((page, query) => {
    if (query)
      return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;

    return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
  }, []);

  useEffect(() => {
    const link = generateLink(currentPage, saveQuery);
    setQueryURL(link);
  }, [currentPage, saveQuery, generateLink]);

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
          const URL = generateLink(1, query);

          setSaveQuery(query);
          setCurrentPage(1);
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
      <Loading
        className={styles.loading}
        url={queryURL}
        loaded={!loading && !error}
        render={() => (
          <>
            <ProductionList productionData={movies} className={styles.movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleCurrentPage={setCurrentPage}
            />
          </>
        )}
      />
    </div>
  );
};
export default MovieView;
