import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOutsideClosing } from 'hooks';

import Label from 'components/Label/Label';
import Input from 'components/Input/Input';
import FormError from 'components/FormError/FormError';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import SelectList from './SelectList/SelectList';
import styles from './Select.module.scss';

const Select = ({
  id,
  name,
  error,
  value,
  label,
  onBlur,
  options,
  onChange,
  className,
  lightTheme,
  addNewItem,
  placeholder,
  listLightTheme,
}) => {
  const [isListVisible, toggleListVisibility] = useState(false);
  const [isPlaceholder, setPlaceholder] = useState(!value.value);
  const selectRef = useOutsideClosing(toggleListVisibility);

  const handleListOptionChange = (selectInputName, optionValueObj) => {
    setPlaceholder(false);
    onChange(selectInputName, optionValueObj);
    toggleListVisibility(false);
  };

  const handleNewItemAdding = (inputName, category) => {
    handleListOptionChange(inputName, category);
  };

  const handleSelectInputClick = () => {
    if (isListVisible) onBlur(name);

    toggleListVisibility(!isListVisible);
  };

  return (
    <div className={[styles.select, className].join(' ')} ref={selectRef}>
      <Label id={id} name={label} />
      <div className={styles.select_input}>
        <Input
          id={id}
          type="button"
          value={value.value}
          name={name}
          onClick={handleSelectInputClick}
          lightTheme={lightTheme}
        />
        {isPlaceholder && <span className={styles.select_placeholder}>{placeholder}</span>}
      </div>
      <SelectList
        name={name}
        options={options}
        handleItemClick={handleListOptionChange}
        isVisible={isListVisible}
      >
        {addNewItem && (
          <AddNewItem
            getData={(item) => handleNewItemAdding(name, item)}
            lightTheme={lightTheme || listLightTheme}
          />
        )}
      </SelectList>
      {error && <FormError error={error} className={styles.select_error} />}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  lightTheme: PropTypes.bool,
  listLightTheme: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  addNewItem: PropTypes.bool,
};

Select.defaultProps = {
  lightTheme: false,
  listLightTheme: false,
  placeholder: '',
  className: '',
  error: '',
  addNewItem: false,
};

export default Select;
