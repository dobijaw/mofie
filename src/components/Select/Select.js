import React, { useState, useContext } from 'react';
import { AppContext } from 'context';
import Label from 'components/Label/Label';
import Input from 'components/Input/Input';
import FormError from 'components/FormError/FormError';
import Button from 'components/Button/Button';
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
}) => {
  const context = useContext(AppContext);
  const [isListVisible, toggleListVisibility] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [isPlaceholder, setPlaceholder] = useState(!value);
  const [newCategoryError, setNewCategoryError] = useState('');

  const checkIfErrors = (categoryValue) => {
    const regPunction = new RegExp(/[.,?!<>"'[\]/#$@%^&+\\*;:{}=\-_`~()|]/);
    const regNumber = new RegExp('[0-9]');
    let errorMessage = '';

    setNewCategoryError('');
    if (categoryValue.length < 3) errorMessage = 'To short';
    if (!categoryValue) errorMessage = 'Needs data!';
    if (regPunction.test(categoryValue))
      errorMessage = "You can't use punctions!";
    if (regNumber.test(categoryValue)) errorMessage = "You can't use numbers!";
    if (categoryValue.length > 20) errorMessage = 'To long name!';

    setNewCategoryError(errorMessage);
  };

  const handleNewCategoryChange = (categoryName, categoryValue) => {
    checkIfErrors(categoryValue);
    setNewCategoryValue({ [categoryName]: categoryValue });
  };

  const handleListOptionChange = (selectInputName, optionValue) => {
    setPlaceholder(false);
    onChange(selectInputName, optionValue);
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
    const punctionReg = new RegExp(
      /[.,?!<>"'[\]/#$@%^&+\\*;:{}=\-_`~()|\s]/g,
      '',
    );

    const convertedValue = optionValue
      .replace(punctionReg)
      .replace(numberReg)
      .toLowerCase();

    const isRepeat = !!context.stateCategories.find(
      (i) =>
        i.value.replace(punctionReg).replace(numberReg).toLowerCase() ===
        convertedValue,
    );

    if (isRepeat) setNewCategoryError('Category exist!');

    if (!isRepeat && !newCategoryError) {
      setPlaceholder(false);
      toggleListVisibility(false);
      onChange(selectName, optionValue);

      context.dispatchCategories({
        type: 'ADD_CATEGORY',
        payload: {
          value: optionValue,
        },
      });

      setNewCategoryValue('');
    }
  };

  return (
    <div className={styles.select}>
      <Label id={id} name={label} />
      <div className={styles.selectInput}>
        <Input
          id={id}
          type="button"
          value={value}
          name={name}
          onClick={handleSelectInputClick}
          lightTheme={lightTheme}
        />
        {isPlaceholder && (
          <span className={styles.selectPlaceholder}>{placeholder}</span>
        )}
      </div>
      <SelectList
        name={name}
        options={options.map((o) => o.value)}
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
            {newCategoryError && <span>{newCategoryError}</span>}
            <Button
              lightTheme={lightTheme}
              handleClick={() =>
                handleAddingNewItemClick(name, newCategoryValue.newCategory)
              }
            >
              +
            </Button>
          </div>
        )}
      </SelectList>
      {error && <FormError error={error} />}
    </div>
  );
};

export default Select;
