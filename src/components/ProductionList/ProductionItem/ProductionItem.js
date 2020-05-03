import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RootContext } from 'context';
import Poster from 'components/Production/Poster/Poster';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import Title from 'components/Production/Title/Title';
import Genres from 'components/Production/Genres/Genres';
import Button from 'components/Button/Button';
import styles from './ProductionItem.module.scss';

const ProductionItem = ({
  img,
  title,
  year,
  genres,
  id,
  type,
  productionType,
}) => {
  return (
    <RootContext.Consumer>
      {(context) => (
        <li className={styles.movieItem}>
          <Link className={styles.movieItemLink} to={`${productionType}/${id}`}>
            <Poster image={img} asBackgroundImage />
            <div className={styles.movieItemDetails}>
              <ReleaseDate>{year}</ReleaseDate>
              <Title>{title}</Title>
              <Genres genres={genres} />
            </div>
          </Link>
          <div className={styles.movieItemBtn}>
            <Button
              id={id}
              handleClick={context.handleOpenModal}
              type={type}
              additionalClass={styles.movieItemSingleBtn}
            >
              +
            </Button>
          </div>
        </li>
      )}
    </RootContext.Consumer>
  );
};

ProductionItem.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ProductionItem;
