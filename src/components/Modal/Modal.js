import React, { useState, useEffect, useContext } from 'react';
import { AppContext, RootContext } from 'context';
import API_KEY from 'config';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { useFetch } from 'hooks';
import Loading from 'components/Loading/Loading';
import { addToCllection } from 'actions';
import styles from './Modal.module.scss';
import MovieYear from '../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../SingleMovie/MovieDescription/MovieDescription';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const context = useContext(AppContext);
  const rootContext = useContext(RootContext);
  const [loading, setLoding] = useState(true);
  const productionURL = `https://api.themoviedb.org/3/${
    selected.type === 'movie' ? 'movie' : 'tv'
  }/${selected.id}?api_key=${API_KEY}&language=en-US`;

  const [productionData, productionResError, productionLoading] = useFetch(
    productionURL,
  );

  useEffect(() => {
    if (!productionLoading) {
      const id = setTimeout(() => {
        setLoding(false);
      }, 1000);

      return () => clearTimeout(id);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    context.dispatchCollections(
      addToCllection({
        type: selected.type,
        id: selected.id,
        data: productionData,
      }),
    );

    rootContext.handleCloseModal();
  };

  return (
    <div className={`${styles.modal} ${loading && styles.modalLoading}`}>
      <Close />
      {productionResError && 'Something went wrong! Sorry!'}
      {loading ? (
        <Loading />
      ) : (
        <>
          <MovieYear year="2019-09-17" />

          <MovieTitle
            lightTheme
            title={
              selected.type === 'movie'
                ? productionData.title
                : productionData.name
            }
          />
          <MovieGenres
            lightTheme
            genres={productionData.genres.map((i) => i.name)}
          />
          <MovieDescription lightTheme description={productionData.overview} />
          <form onSubmit={(e) => handleSubmit(e)}>
            <Select
              id="category"
              name="category"
              label="Your Category"
              placeholder="Choose your category"
              options={context.stateCategories}
              withButton
            />
            <Select
              id="rate"
              name="rate"
              label="Your Rate"
              placeholder="Choose your rate"
              options={[
                {
                  value: 1,
                  name: 1,
                },
                {
                  value: 2,
                  name: 2,
                },
                {
                  value: 3,
                  name: 3,
                },
                {
                  value: 4,
                  name: 4,
                },
                {
                  value: 5,
                  name: 5,
                },
                {
                  value: 6,
                  name: 6,
                },
                {
                  value: 7,
                  name: 7,
                },
                {
                  value: 8,
                  name: 8,
                },
                {
                  value: 9,
                  name: 9,
                },
                {
                  value: 10,
                  name: 10,
                },
              ]}
            />
            <Input
              type="textarea"
              name="comment"
              placeholder="Type here..."
              id="comment"
              label="Your comment"
            />
            <Button lightTheme type="submit">
              + add to collection
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Modal;
