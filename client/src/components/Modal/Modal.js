import React, { useState, useEffect, useContext } from 'react';
import { AppContext, RootContext } from 'context';
import { API_KEY } from 'config';
import Select from 'components/Select/Select';
import Loading from 'components/Loading/Loading';
import DateFormat from 'components/DateFormat/DateFormat';
import Headline from 'components/Headline/Headline';
import Genres from 'components/Production/Genres/Genres';
import Overview from 'components/Production/Overview/Overview';
import { addToCllection } from 'actions/collection';
import { useFetch, useOutsideClosing } from 'hooks';
import { FETCH_TYPE } from 'types';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import Close from 'components/Close/Close';
import styles from './Modal.module.scss';
import Button from '../Button/Button';

const Modal = ({ selected }) => {
  const { user, categories, collection, collectionDispatch } = useContext(AppContext);
  const { ratingScale, handleCloseModal } = useContext(RootContext);
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
      (i) => i.productionID === selected.id && i.productionType === selected.productionType,
    );
    setInCollection(isAdded);
  }, [collection, selected.id, selected.productionType]);

  const handleSubmit = (values) => {
    const requestData = {
      creator: user.id,
      productionType: selected.productionType,
      productionID: selected.id,
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
        categoryID: values.category.id,
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
    <div className={styles.modalBack}>
      <div className={`${styles.modal} ${loading && styles.modalLoading}`} ref={modalRef}>
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
                    <p>
                      This production is already added to your collection. If you want to
                      change it, go to the collection and click the edit button next to the
                      specific item.
                    </p>
                  ) : (
                    <Form
                      initialValues={{
                        category: {},
                        rate: {},
                        comment: '',
                      }}
                      validate={(values) => ({
                        category: [
                          {
                            correct: values.category.value,
                            errorMessage: 'Category required!',
                          },
                        ],
                        rate: [
                          {
                            correct: values.rate.value,
                            errorMessage: 'Rate required!',
                          },
                        ],
                        comment: [
                          {
                            correct: values.comment.length,
                            errorMessage: 'Comment required!',
                          },
                        ],
                      })}
                      onSubmit={(values) => {
                        handleSubmit(values);
                      }}
                      render={(values, errors, handleChange, handleBlur) => (
                        <>
                          <Select
                            id="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="category"
                            label="Category"
                            error={errors.category}
                            options={categories}
                            placeholder="Choose a category"
                            lightTheme
                            addNewItem
                          />
                          <Select
                            id="rate"
                            value={values.rate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="rate"
                            label="Rate"
                            error={errors.rate}
                            options={ratingScale}
                            placeholder="Choose a rate"
                            lightTheme
                          />
                          <Field
                            id="comment"
                            type="textarea"
                            placeholder="Enter your name"
                            value={values.comment}
                            name="comment"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Comment"
                            error={errors.comment}
                            lightTheme
                          />
                          <Button type="submit" lightTheme>
                            add to collection +
                          </Button>
                        </>
                      )}
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

export default Modal;
