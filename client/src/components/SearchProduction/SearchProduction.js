import React, { useState, useEffect, useContext, useCallback } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import Pagination from 'components/Pagination/Pagination';
import { useFetch, useDataProduction } from 'hooks';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import { API_KEY } from 'config';
import ProductionList from 'components/ProductionList/ProductionList';
import { FETCH_TYPE } from 'types';
import { RootContext } from 'context';
import { selectProductionData } from 'universal';
import Loading from 'components/Loading/Loading';
import styles from './SearchProduction.module.scss';

const SearchProduction = ({ title, fetchType }) => {
  const context = useContext(RootContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const baseURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  const [queryURL, setQueryURL] = useState(baseURL);
  const [response, error, loading] = useFetch(queryURL);
  const [saveQuery, setSaveQuery] = useState('');

  const [production] = useDataProduction(
    !loading && context?.movieGenres !== null && context?.showGenres !== null,
    response?.results,
    fetchType === FETCH_TYPE.MOVIE
      ? context?.movieGenres?.genres
      : context?.showGenres?.genres,
    fetchType === FETCH_TYPE.MOVIE ? FETCH_TYPE.MOVIE : FETCH_TYPE.TV,
    selectProductionData,
  );

  const generateLink = useCallback(
    (page, query) => {
      if (query)
        return `https://api.themoviedb.org/3/search/${fetchType}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;

      return `https://api.themoviedb.org/3/${fetchType}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    },
    [fetchType],
  );

  useEffect(() => {
    const link = generateLink(currentPage, saveQuery);
    setQueryURL(link);
  }, [currentPage, saveQuery, generateLink]);

  useEffect(() => {
    if (!loading) setTotalPages(response?.total_pages);
  }, [response, loading]);

  return (
    <div className={styles.wrapper}>
      <PageTitle center>{title}</PageTitle>
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
            <ProductionList productionData={production} className={styles.movies} />
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
export default SearchProduction;
