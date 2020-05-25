import React, { useState, useContext } from 'react';
import { AppContext } from 'context';
import Label from 'components/Label/Label';
import Input from 'components/Input/Input';
import FormError from 'components/FormError/FormError';
import Button from 'components/Button/Button';
import { addCategory } from 'actions/categories';
import { useOutsideClosing } from 'hooks';
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
  withButton,
  lightTheme,
  placeholder,
  className,
}) => {
  const state = useContext(AppContext);
  const [isListVisible, toggleListVisibility] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [isPlaceholder, setPlaceholder] = useState(!value?.value);
  const [newCategoryError, setNewCategoryError] = useState('');
  const selectRef = useOutsideClosing(toggleListVisibility);

  const checkIfErrors = (categoryValue) => {
    const regPunction = new RegExp(/[.,?!<>"'[\]/#$@%^&+\\*;:{}=\-_`~()|]/);
    const regNumber = new RegExp('[0-9]');
    let errorMessage = '';

    setNewCategoryError('');
    if (categoryValue.length < 3) errorMessage = 'To short';
    if (!categoryValue) errorMessage = 'Needs data!';
    if (regPunction.test(categoryValue)) errorMessage = "You can't use punctions!";
    if (regNumber.test(categoryValue)) errorMessage = "You can't use numbers!";
    if (categoryValue.length > 20) errorMessage = 'To long name!';

    setNewCategoryError(errorMessage);
  };

  const handleNewCategoryChange = (categoryName, categoryValue) => {
    checkIfErrors(categoryValue);
    setNewCategoryValue({ [categoryName]: categoryValue });
  };

  const handleListOptionChange = (selectInputName, optionValueObj) => {
    setPlaceholder(false);
    onChange(selectInputName, optionValueObj);
    toggleListVisibility(false);
    setNewCategoryValue('');
  };

  const handleSelectInputClick = () => {
    if (isListVisible) onBlur(name);

    toggleListVisibility(!isListVisible);
    setNewCategoryValue('');
  };

  const handleAddingNewItemClick = (selectName, optionValue = '') => {
    checkIfErrors(optionValue);
    const numberReg = new RegExp(/[0-9]/g, '');
    const punctionReg = new RegExp(/[.,?!<>"'[\]/#$@%^&+\\*;:{}=\-_`~()|]/g, '');

    const convertedValue = optionValue
      .replace(punctionReg)
      .replace(numberReg)
      .split(' ')
      .join('_')
      .toUpperCase();

    // console.log(convertedValue);

    const isRepeat = !!state.categories.find(
      (i) => i.value.replace(punctionReg).replace(numberReg).toLowerCase() === convertedValue,
    );

    if (isRepeat) setNewCategoryError('Category exist!');

    if (!isRepeat && !newCategoryError) {
      setPlaceholder(false);
      toggleListVisibility(false);

      addCategory(state.categoriesDispatch, {
        id: state.user.id,
        value: optionValue,
        key: convertedValue,
      });

      // change to get categories from state, not from input. IMPROVE
      onChange(selectName, {
        id: state.user.id,
        value: optionValue,
        key: convertedValue,
      });

      setNewCategoryValue('');
    }
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
        {withButton && (
          <div className={styles.selectListItem}>
            <Input
              type="text"
              placeholder="Type custom category"
              id="newCategory"
              value={newCategoryValue.newCategory}
              onChange={handleNewCategoryChange}
              name="newCategory"
              lightTheme={lightTheme}
            />
            {newCategoryError && (
              <FormError className={styles.selectErrorFlying} error={newCategoryError} />
            )}
            <Button
              className={styles.selectButton}
              lightTheme={lightTheme}
              handleClick={() => handleAddingNewItemClick(name, newCategoryValue.newCategory)}
            />
          </div>
        )}
      </SelectList>
      {error && <FormError error={error} className={styles.selectError} />}
    </div>
  );
};

export default Select;
