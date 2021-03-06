import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFetch, useDataProduction } from 'hooks';
import { selectProductionData } from 'universal';
import { RootContext } from 'context';
import { API_KEY } from 'config';

import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import NoData from 'components/NoData/NoData';
import Button from 'components/Button/Button';
import Loading from 'components/Loading/Loading';
import PageTitle from 'components/PageTitle/PageTitle';
import Pagination from 'components/Pagination/Pagination';
import ProductionList from 'components/ProductionList/ProductionList';
import styles from './SearchProduction.module.scss';

const SearchProduction = ({ title, fetchType }) => {
  const context = useContext(RootContext);
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const baseURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

  const [queryURL, setQueryURL] = useState(baseURL);
  const [response, error, loading] = useFetch(queryURL);
  const [saveQuery, setSaveQuery] = useState('');

  const [production] = useDataProduction(
    !loading && context?.movieGenres !== null && context?.showGenres !== null,
    response?.results,
    context?.movieGenres?.genres,
    context?.showGenres?.genres,
    selectProductionData,
  );

  const generateLink = (page, query) => {
    if (query) {
      return `https://api.themoviedb.org/3/search/${fetchType}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;
    } 
      return `https://api.themoviedb.org/3/${fetchType}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    
  };

  const generateLinkCallback = useCallback(generateLink, [fetchType]);

  useEffect(() => {
    const link = generateLinkCallback(currentPage, saveQuery);
    setQueryURL(link);
  }, [currentPage, saveQuery, generateLinkCallback]);

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
          const URL = generateLinkCallback(1, query);

          if (query === saveQuery) return;

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
              className={styles.form_input}
            />
            <Button type="submit">Search</Button>
          </>
        )}
      />
      <Loading
        className={styles.loading}
        loaded={!loading && !error}
        reactOnChange={queryURL}
        render={() => (
          <>
            {production.length ? (
              <ProductionList productionData={production} asBasic />
            ) : (
              <NoData>No production was found</NoData>
            )}
          </>
        )}
      />
      <Pagination
        initialPage={initialPage}
        totalPages={totalPages}
        getCurrentPage={setCurrentPage}
        valueRequiringReset={saveQuery}
      />
    </div>
  );
};

SearchProduction.propTypes = {
  title: PropTypes.string.isRequired,
  fetchType: PropTypes.string.isRequired,
};

export default SearchProduction;
