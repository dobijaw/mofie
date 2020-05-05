import React, { useState, useEffect, useContext } from 'react';
import { AppContext, RootContext } from 'context';
import { API_KEY } from 'config';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { useFetch } from 'hooks';
import Loading from 'components/Loading/Loading';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import Title from 'components/Production/Title/Title';
import Genres from 'components/Production/Genres/Genres';
import Overview from 'components/Production/Overview/Overview';
import { ADD_TO_COLLECTION } from 'reducers';
import { FETCH_TYPE } from 'store';
import styles from './Modal.module.scss';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const context = useContext(AppContext);
  const rootContext = useContext(RootContext);
  const [selectedData, setSelectedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputsValue, setInputsValue] = useState({});

  const productionURL = `https://api.themoviedb.org/3/${selected.productionType}/${selected.id}?api_key=${API_KEY}&language=en-US`;

  const [prodData, prodError, prodLoading] = useFetch(productionURL);

  useEffect(() => {
    if (prodLoading) return;
    if (prodData.status_code === 34) setError(true);

    const output = {
      title:
        selected.productionType === FETCH_TYPE.MOVIE
          ? prodData.title
          : prodData.name,
      genres: prodData.genres.map((i) => i.name),
      tagline: prodData.tagline || null,
      rate: prodData.vote_average,
      overview: prodData.overview,
      releaseDate:
        selected.productionType === FETCH_TYPE.MOVIE
          ? prodData.release_date
          : prodData.first_air_date,
      image: prodData.backdrop_path
        ? `http://image.tmdb.org/t/p/w500/${prodData.backdrop_path}`
        : prodData.poster_path &&
          `http://image.tmdb.org/t/p/w500/${prodData.poster_path}`,
    };
    setSelectedData(output);

    const timeoutID = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timeoutID);
  }, [prodData, prodLoading, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    context.dispatchCollections({
      type: ADD_TO_COLLECTION,
      payload: {
        data: selectedData,
        id: selected.id,
        type: selected.productionType,
        customData: inputsValue,
      },
    });

    rootContext.handleCloseModal();
  };

  const handleChange = (name, value) => {
    setInputsValue({ ...inputsValue, [name]: value });
  };

  return (
    <div className={`${styles.modal} ${loading && styles.modalLoading}`}>
      <Close />
      {loading ? (
        <Loading />
      ) : (
        <>
          {prodError || error ? (
            <p>Something went Wrong!</p>
          ) : (
            <>
              <ReleaseDate>{selectedData.releaseDate}</ReleaseDate>
              <Title lightTheme>{selectedData.title}</Title>
              <Genres lightTheme genres={selectedData.genres} />
              <Overview lightTheme>{selectedData.overview}</Overview>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Select
                  id="category"
                  name="category"
                  label="Your Category"
                  placeholder="Choose your category"
                  options={context.stateCategories}
                  withButton
                  handleChange={handleChange}
                />
                <Select
                  id="rate"
                  name="rate"
                  label="Your Rate"
                  placeholder="Choose your rate"
                  options={rootContext.ratingScale}
                  handleChange={handleChange}
                />
                <Input
                  type="textarea"
                  name="comment"
                  placeholder="Type here..."
                  id="comment"
                  label="Your comment"
                  handleChange={handleChange}
                />
                <div className={styles.modalButtonContainer}>
                  <Button lightTheme type="submit">
                    + add to collection
                  </Button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Modal;
