import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectList.module.scss';
import SelectItem from '../SelectItem/SelectItem';

const SelectList = ({ children, options, name, handleItemClick, isVisible }) => (
  <ul className={[styles.selectList, isVisible && styles.selectList___visible].join(' ')}>
    {options.map((o) => (
      <SelectItem
        key={o.id}
        id={o.id}
        value={o.value}
        handleClick={() => handleItemClick(name, o)}
      />
    ))}
    <>{children && <SelectItem asAddItem>{children}</SelectItem>}</>
  </ul>
);

SelectList.propTypes = {
  children: PropTypes.element,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

SelectList.defaultProps = {
  children: null,
  isVisible: false,
};

export default SelectList;
