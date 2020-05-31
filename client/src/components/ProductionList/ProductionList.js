import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductionList.module.scss';
import ProductionItem from './ProductionItem/ProductionItem';

const ProductionList = ({ productionData, className, withMain, asBasic, asSmall }) => (
  <ul
    className={[
      styles.productionList,
      withMain && styles.productionList___main,
      asBasic && styles.productionList___basic,
      asSmall && styles.productionList___small,
      className,
    ].join(' ')}
  >
    {productionData.map((p) => (
      <ProductionItem {...p} key={p.id + p.productionType} />
    ))}
  </ul>
);

ProductionList.propTypes = {
  productionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  withMain: PropTypes.bool,
  asBasic: PropTypes.bool,
  asSmall: PropTypes.bool,
};

ProductionList.defaultProps = {
  className: '',
  withMain: false,
  asBasic: false,
  asSmall: false,
};

export default ProductionList;
