import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppContext, RootContext } from 'context';
import Button from 'components/Button/Button';
import Rate from 'components/Production/Rate/Rate';
import Headline from 'components/Headline/Headline';
import Poster from 'components/Production/Poster/Poster';
import Genres from 'components/Production/Genres/Genres';
import Tagline from 'components/Production/Tagline/Tagline';
import CustomRating from 'components/Production/CustomRating/CustomRating';
import DateFormat from 'components/DateFormat/DateFormat';
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
  };

  return (
    <li className={styles.production}>
      <section>
        <Link className={styles.production_link} to={URL}>
          <Poster image={image} asBackgroundImage />
        </Link>
        <div className={styles.production_data}>
          <div className={styles.production_details}>
            <div className={styles.production_column}>
              <Rate>{rate}</Rate>
              <DateFormat isSmall>{releaseDate}</DateFormat>
            </div>
            <div
              className={[styles.production_column, styles.production_column___custom].join(
                ' ',
              )}
            >
              {customRate && <CustomRating custom>{customRate}</CustomRating>}
              {customCategory && <CustomRating>{customCategory}</CustomRating>}
            </div>
          </div>
          <Link className={styles.production_link} to={URL}>
            <Headline tag="h3" asTitle>
              {title}
            </Headline>
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
      </section>
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
