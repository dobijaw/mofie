import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RootContext } from 'context';
import Button from 'components/Button/Button';
import Rate from 'components/Production/Rate/Rate';
import Title from 'components/Production/Title/Title';
import Poster from 'components/Production/Poster/Poster';
import Genres from 'components/Production/Genres/Genres';
import Tagline from 'components/Production/Tagline/Tagline';
import Category from 'components/Production/Category/Category';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import styles from './ProductionItem.module.scss';

const ProductionItem = ({
  productionType,
  categoryAdded,
  releaseDate,
  buttonType,
  noModal,
  tagline,
  genres,
  title,
  image,
  rate,
  id,
}) => {
  return (
    <RootContext.Consumer>
      {(context) => (
        <li className={styles.production}>
          <Link
            className={styles.productionLink}
            to={`${productionType}/${id}`}
          >
            <Poster image={image} asBackgroundImage />
            <div className={styles.productionDetails}>
              <div className={styles.productionTopDetails}>
                <div className={styles.productionTopDetailsColumn}>
                  {rate && <Rate>{rate}</Rate>}
                  <ReleaseDate>{releaseDate}</ReleaseDate>
                </div>
                <div>
                  {rate && <Rate custom>{rate}</Rate>}
                  {categoryAdded && <Category>{categoryAdded}</Category>}
                </div>
              </div>

              <Title>{title}</Title>
              {tagline && <Tagline>{tagline}</Tagline>}
              <Genres genres={genres} />
            </div>
          </Link>
          {!noModal && (
            <div className={styles.productionBtn}>
              <Button
                type={buttonType}
                className={styles.productionSingleBtn}
                handleClick={() => context.handleOpenModal(productionType, id)}
              >
                +
              </Button>
            </div>
          )}
        </li>
      )}
    </RootContext.Consumer>
  );
};

ProductionItem.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  productionType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  categoryAdded: PropTypes.string,
  releaseDate: PropTypes.string,
  buttonType: PropTypes.string,
  tagline: PropTypes.string,
  image: PropTypes.string,
  noModal: PropTypes.bool,
  rate: PropTypes.number,
};

ProductionItem.defaultProps = {
  releaseDate: 'UNKNOW DATE',
  buttonType: 'text',
  categoryAdded: '',
  noModal: false,
  tagline: '',
  rate: null,
  image: '',
};

export default ProductionItem;
