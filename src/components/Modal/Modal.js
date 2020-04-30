import React, { useContext } from 'react';
import AppContext from 'context';
import API_KEY from 'config';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { useFetch } from 'hooks';
import styles from './Modal.module.scss';
import MovieYear from '../SingleMovie/MovieYear/MovieYear';
import MovieTitle from '../SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from '../SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from '../SingleMovie/MovieDescription/MovieDescription';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const context = useContext(AppContext);
  const [productionData, productionResError, productionLoading] = useFetch(
    `https://api.themoviedb.org/3/${
      selected.type === 'movie' ? 'movie' : 'tv'
    }/${selected.id}?api_key=${API_KEY}&language=en-US`,
  );

  return (
    <div className={styles.modal}>
      <Close />
      {productionResError && 'Something went wrong! Sorry!'}
      {productionLoading ? (
        'is loading'
      ) : (
        <>
          <MovieYear year="2019-09-17" />

          <MovieTitle
            light
            title={
              selected.type === 'movie'
                ? productionData.title
                : productionData.name
            }
          />
          <MovieGenres
            light
            genres={productionData.genres.map((i) => i.name)}
          />
          <MovieDescription light description={productionData.overview} />
          <Select
            id="category"
            name="category"
            label="Your Category"
            placeholder="Choose your category"
            options={context.categoriesState}
            withButton
          />
          <Select
            id="rate"
            name="rate"
            label="Your Rate"
            placeholder="Choose your rate"
            options={[
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
              { value: 6 },
              { value: 7 },
              { value: 8 },
              { value: 9 },
              { value: 10 },
            ]}
          />
          <Input
            type="textarea"
            name="comment"
            placeholder="Type here..."
            id="comment"
            label="Your comment"
          />
          <Button light>+ add to collection</Button>
        </>
      )}
    </div>
  );
};

export default Modal;
