import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addToCllection } from 'actions/collection';
import { useFetch, useOutsideClosing } from 'hooks';
import { AppContext, RootContext } from 'context';
import { FETCH_TYPE, ROUTE_TYPE } from 'types';
import { API_KEY } from 'config';

import Close from 'components/Close/Close';
import Loading from 'components/Loading/Loading';
import Headline from 'components/Headline/Headline';
import Genres from 'components/Production/Genres/Genres';
import DateFormat from 'components/DateFormat/DateFormat';
import Overview from 'components/Production/Overview/Overview';
import AddNewProduction from 'components/AddNewProduction/AddNewProduction';
import styles from './Modal.module.scss';

const Modal = ({ selected }) => {
  const { user, collection, collectionDispatch } = useContext(AppContext);
  const { handleCloseModal } = useContext(RootContext);
  const [selectedData, setSelectedData] = useState({});
  const [isInCollection, setInCollection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const productionURL = `https://api.themoviedb.org/3/${selected.productionType}/${selected.id}?api_key=${API_KEY}&language=en-US`;
  const [prodData, prodError, prodLoading] = useFetch(productionURL);
  const modalRef = useOutsideClosing(handleCloseModal);

  useEffect(() => {
    if (prodLoading) return;
    if (prodData.status_code === 34) setError(true);

    const output = {
      title: selected.productionType === FETCH_TYPE.MOVIE ? prodData.title : prodData.name,
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
        : prodData.poster_path && `http://image.tmdb.org/t/p/w500/${prodData.poster_path}`,
    };

    setSelectedData(output);
    setLoading(false);
  }, [prodData, prodLoading, selected]);

  useEffect(() => {
    const isAdded = collection.some(
      (i) => i.productionId === selected.id && i.productionType === selected.productionType,
    );

    setInCollection(isAdded);
  }, [collection, selected.id, selected.productionType]);

  const handleSubmit = (values) => {
    const requestData = {
      creator: user.id,
      productionType: selected.productionType,
      productionId: selected.id,
      data: {
        genres: selectedData.genres,
        image: selectedData.image,
        overview: selectedData.overview,
        rate: selectedData.rate,
        releaseDate: selectedData.releaseDate,
        tagline: selectedData.tagline,
        title: selectedData.title,
      },
      customData: {
        categoryId: values.category.id,
        rate: {
          id: values.rate.id,
          value: values.rate.value,
        },
        comment: values.comment,
      },
    };

    addToCllection(collectionDispatch, requestData);
    handleCloseModal();
  };

  return (
    <div className={styles.modal}>
      <div
        className={[styles.modal_body, loading && styles.modal_body___loading].join(' ')}
        ref={modalRef}
      >
        <Close handleClose={handleCloseModal} />
        <Loading
          loaded={!loading}
          render={() => (
            <>
              {prodError || error ? (
                <p>Something went Wrong!</p>
              ) : (
                <>
                  <DateFormat isSmall>{selectedData.releaseDate}</DateFormat>
                  <Headline tag="h2" lightTheme asTitle>
                    {selectedData.title}
                  </Headline>
                  <Genres lightTheme genres={selectedData.genres} />
                  <Overview lightTheme>{selectedData.overview}</Overview>
                  {isInCollection ? (
                    <p className={styles.modal_info}>
                      This production is already added to your collection. If you want to
                      change it, go to the{' '}
                      <Link
                        to={`${
                          selected.productionType === FETCH_TYPE.MOVIE
                            ? ROUTE_TYPE.MOVIES
                            : ROUTE_TYPE.SHOWS
                        }/${selected.id}`}
                        className={styles.modal_button}
                        onClick={() => handleCloseModal()}
                      >
                        production page
                      </Link>{' '}
                      and click edit in your comments section.
                    </p>
                  ) : (
                    <AddNewProduction
                      handleSubmit={handleSubmit}
                      buttonCopy="Add to collection +"
                      lightTheme
                    />
                  )}
                </>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  selected: PropTypes.shape({
    productionType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
