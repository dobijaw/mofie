import React, { useState, useEffect, useContext } from 'react';
import { AppContext, RootContext } from 'context';
import { API_KEY } from 'config';
import Select from 'components/Select/Select';
import Loading from 'components/Loading/Loading';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import Title from 'components/Production/Title/Title';
import Genres from 'components/Production/Genres/Genres';
import Overview from 'components/Production/Overview/Overview';
import { addToCllection } from 'actions/collection';
import { useFetch } from 'hooks';
import { FETCH_TYPE } from 'types';
import Form from 'components/Form/Form';
import Field from 'components/Field/Field';
import styles from './Modal.module.scss';
import Button from '../Button/Button';
import Close from './Close/Close';

const Modal = ({ selected }) => {
  const { user, categories, collection, collectionDispatch } = useContext(AppContext);
  const rootContext = useContext(RootContext);
  const [selectedData, setSelectedData] = useState({});
  const [isInCollection, setInCollection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const productionURL = `https://api.themoviedb.org/3/${selected.productionType}/${selected.id}?api_key=${API_KEY}&language=en-US`;

  const [prodData, prodError, prodLoading] = useFetch(productionURL);

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
    const data = {
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
        category: {
          value: values.category.value,
          key: values.category.key,
          id: values.category.id,
        },
        comment: values.comment,
        rate: {
          value: values.rate.value,
          key: values.rate.key,
          id: values.rate.id,
        },
      },
    };

    addToCllection(collectionDispatch, data);

    rootContext.handleCloseModal();
  };

  return (
    <div className={`${styles.modal} ${loading && styles.modalLoading}`}>
      <Close />
      <Loading
        loaded={!loading}
        render={() => (
          <>
            {prodError || error ? (
              <p>Something went Wrong!</p>
            ) : (
              <>
                <ReleaseDate>{selectedData.releaseDate}</ReleaseDate>
                <Title lightTheme>{selectedData.title}</Title>
                <Genres lightTheme genres={selectedData.genres} />
                <Overview lightTheme>{selectedData.overview}</Overview>
                {isInCollection ? (
                  <p>
                    This production is already added to your collection. If you want to change
                    it, go to the collection and click the edit button next to the specific
                    item.
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
                          withButton
                        />
                        <Select
                          id="rate"
                          value={values.rate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="rate"
                          label="Rate"
                          error={errors.rate}
                          options={rootContext.ratingScale}
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
  );
};

export default Modal;
