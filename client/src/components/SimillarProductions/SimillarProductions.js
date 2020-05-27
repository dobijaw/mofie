import React from 'react';
import ProductionList from 'components/ProductionList/ProductionList';
import SubHeadline from 'components/SubHeadline/SubHeadline';

const SimillarProductions = ({ productions }) => (
  <section>
    <SubHeadline>Simillar Productions</SubHeadline>
    <ProductionList productionData={productions} asSmall />
  </section>
);
export default SimillarProductions;
