import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppContext, RootContext } from 'context';
import Button from 'components/Button/Button';
import Rate from 'components/Production/Rate/Rate';
import Title from 'components/Production/Title/Title';
import Poster from 'components/Production/Poster/Poster';
import Genres from 'components/Production/Genres/Genres';
import Tagline from 'components/Production/Tagline/Tagline';
import CustomRating from 'components/Production/CustomRating/CustomRating';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import { FETCH_TYPE, ROUTE_TYPE } from 'types';
import { removeFromCollection } from 'actions/collection';
import styles from './ProductionItem.module.scss';

const ProductionItem = ({
  _id,
  productionType,
  customCategory,
  releaseDate,
  customRate,
  noModal,
  tagline,
  genres,
  title,
  image,
  rate,
  id,
}) => {
  const rootContext = useContext(RootContext);
  const { user, collectionDispatch } = useContext(AppContext);
  const URL = `/${
    productionType === FETCH_TYPE.MOVIE ? ROUTE_TYPE.MOVIES : ROUTE_TYPE.SHOWS
  }/${id}`;

  const handleClick = () => {
    removeFromCollection(collectionDispatch, _id);
    // collectionDispatch({
    //   type: REMOVE_FROM_COLLECTION,
    //   id,
    // });
  };

  return (
    <li className={styles.production}>
      <Link className={styles.productionLink} to={URL}>
        <Poster image={image} asBackgroundImage />
      </Link>
      <div className={styles.productionDetails}>
        <div className={styles.productionTopDetails}>
          <div className={styles.productionTopDetailsColumn}>
            <Rate>{rate}</Rate>
            <ReleaseDate>{releaseDate}</ReleaseDate>
          </div>
          <div>
            {customRate && <CustomRating custom>{customRate}</CustomRating>}
            {customCategory && <CustomRating>{customCategory}</CustomRating>}
          </div>
        </div>
        <Link className={styles.productionLink} to={URL}>
          <Title>{title}</Title>
          {tagline && <Tagline>{tagline}</Tagline>}
        </Link>
        <Genres genres={genres} />
      </div>
      {user.isAuth && (
        <div className={styles.productionButtonContainer}>
          {!noModal ? (
            <Button
              asAdd
              type="button"
              className={styles.productionButton}
              handleClick={() => rootContext.handleOpenModal(productionType, id)}
            />
          ) : (
            <Button
              asDelete
              type="button"
              className={styles.productionButton}
              handleClick={handleClick}
            />
          )}
        </div>
      )}
    </li>
  );
};

ProductionItem.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  productionType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  customCategory: PropTypes.string,
  releaseDate: PropTypes.string,
  tagline: PropTypes.string,
  image: PropTypes.string,
  noModal: PropTypes.bool,
  rate: PropTypes.number,
};

ProductionItem.defaultProps = {
  releaseDate: 'UNKNOW DATE',
  customCategory: '',
  noModal: false,
  tagline: '',
  rate: 0,
  image: '',
};

export default ProductionItem;
