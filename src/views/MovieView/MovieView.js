import React, { useState } from 'react';
import PageTitle from 'components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import Pagination from 'components/Pagination/Pagination';
import styles from './MovieView.module.scss';

const MovieView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.wrapper}>
      {console.log(currentPage)}
      <PageTitle>Search movie</PageTitle>
      <form>
        <Button type="submit">Search</Button>
      </form>
      <Pagination current={currentPage} setCurrent={setCurrentPage} />
    </div>
  );
};
export default MovieView;
