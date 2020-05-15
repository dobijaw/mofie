import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductionList.module.scss';
import ProductionItem from './ProductionItem/ProductionItem';

const ProductionList = ({ productionData, className }) => (
  <ul className={`${styles.wrapper} ${className}`}>
    {productionData.map((p) => (
      <ProductionItem {...p} key={p.id + p.productionType} />
    ))}
  </ul>
);

ProductionList.propTypes = {
  productionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

ProductionList.defaultProps = {
  className: '',
};

export default ProductionList;
