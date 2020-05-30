import React, { useState } from 'react';
import Label from 'components/Label/Label';
import Input from 'components/Input/Input';
import FormError from 'components/FormError/FormError';
import { useOutsideClosing } from 'hooks';
import AddNewItem from 'components/AddNewItem/AddNewItem';
import styles from './Select.module.scss';
import SelectList from './SelectList/SelectList';

const Select = ({
  id,
  value,
  onChange,
  onBlur,
  name,
  label,
  error,
  options,
  lightTheme,
  placeholder,
  className,
  addNewItem,
  listLightTheme,
}) => {
  const [isListVisible, toggleListVisibility] = useState(false);
  const [isPlaceholder, setPlaceholder] = useState(!value?.value);
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
    <div className={`${styles.select} ${className}`} ref={selectRef}>
      <Label id={id} name={label} />
      <div className={styles.selectInput}>
        <Input
          id={id}
          type="button"
          value={value?.value}
          name={name}
          onClick={handleSelectInputClick}
          lightTheme={lightTheme}
        />
        {isPlaceholder && <span className={styles.selectPlaceholder}>{placeholder}</span>}
      </div>
      <SelectList
        name={name}
        options={options}
        handleItemClick={handleListOptionChange}
        isVisible={isListVisible}
      >
        {addNewItem && (
          <AddNewItem
            getData={(c) => handleNewItemAdding(name, c)}
            lightTheme={lightTheme || listLightTheme}
          />
        )}
      </SelectList>
      {error && <FormError error={error} className={styles.selectError} />}
    </div>
  );
};

export default Select;
