import React from 'react';
import PropTypes from 'prop-types';
import ProductionList from 'components/ProductionList/ProductionList';
import SubHeadline from 'components/SubHeadline/SubHeadline';

const SimillarProductions = ({ productions }) => (
  <section>
    <SubHeadline>Simillar Productions</SubHeadline>
    <ProductionList productionData={productions} asSmall />
  </section>
);

SimillarProductions.propTypes = {
  productions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SimillarProductions;
