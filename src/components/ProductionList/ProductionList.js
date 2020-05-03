import React, { useContext } from 'react';
import { RootContext } from 'context';
import styles from './ProductionList.module.scss';
import ProductionItem from './ProductionItem/ProductionItem';

const ProductionList = ({ movies, type, additionalClass }) => {
  const context = useContext(RootContext);

  return (
    <ul className={`${styles.wrapper} ${additionalClass}`}>
      {movies.map((item) => (
        <ProductionItem
          productionType={type}
          key={item.title}
          {...item}
          genresName={context.genres}
        />
      ))}
    </ul>
  );
};

export default ProductionList;
