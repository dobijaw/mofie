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
import styles from './Modal.module.scss';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const context = useContext(AppContext);
  const rootContext = useContext(RootContext);
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const productionURL = `https://api.themoviedb.org/3/${selected.productionType}/${selected.id}?api_key=${API_KEY}&language=en-US`;

  const [prodData, prodError, prodLoading] = useFetch(productionURL);

  useEffect(() => {
    if (prodLoading) return;
    if (prodData.status_code === 34) setError(true);

    const output = {
      title:
        selected.productionType === 'movie' ? prodData.title : prodData.name,
      genres: prodData.genres.map((i) => i.name),
      overview: prodData.overview,
      releaseDate:
        selected.productionType === 'movie'
          ? prodData.release_date
          : prodData.first_air_date,
    };

    setSelectedData(output);

    const timeoutID = setTimeout(() => setLoding(false), 1000);

    return () => clearTimeout(timeoutID);
  }, [prodData, prodLoading, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    context.dispatchCollections({
      type: ADD_TO_COLLECTION,
      payload: {
        type: selected.type,
        id: selected.id,
        data: prodData,
      },
    });

    rootContext.handleCloseModal();
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
                />
                <Select
                  id="rate"
                  name="rate"
                  label="Your Rate"
                  placeholder="Choose your rate"
                  options={rootContext.ratingScale}
                />
                <Input
                  type="textarea"
                  name="comment"
                  placeholder="Type here..."
                  id="comment"
                  label="Your comment"
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
