import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import FormError from 'components/FormError/FormError';
import { AppContext } from 'context';
import { addCategory, updateCategory } from 'actions/categories';
import styles from './AddNewItem.module.scss';

const AddNewItem = ({ lightTheme, categoryId, getData, initialValue }) => {
  const { user, categories, categoriesDispatch } = useContext(AppContext);
  const [isButtonDisabled, toggleButtonDisabling] = useState(false);
  const [category, setCategory] = useState(initialValue || '');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState('');

  const isEmpty = (val) => !val.length;
  const isToShort = (val) => val.length < 3;
  const isToLong = (val) => val.length > 20;
  const isFreeOfPunction = (val) => {
    const reg = new RegExp(/[.,?!<>"'[\]/#$@%^&+\\*;:{}=\-_`~()|]/g, '');
    return reg.test(val);
  };

  const isTheSameCategory = (val) => categories.some((item) => item.value === val);

  const isSimillarCategory = (val) => {
    const noWhitespaceValue = val.replace(/\s/g, '');
    return categories.some((item) => item.value.replace(/\s/g, '') === noWhitespaceValue);
  };

  const getError = (val) => {
    switch (true) {
      case isEmpty(val):
        return setError('Needs data');
      case isToShort(val):
        return setError('Category needs min. 3 charts');
      case isToLong(val):
        return setError('To long! Max. 20 charts');
      case isFreeOfPunction(val):
        return setError('No punction in category');
      case isTheSameCategory(val):
        return setError('The same category exist');
      case isSimillarCategory(val):
        return setError('There is a similar category');
      default:
        return setError('');
    }
  };

  const validation = (val) => {
    const errors = [
      isEmpty(val),
      isToLong(val),
      isToShort(val),
      isFreeOfPunction(val),
      isTheSameCategory(val),
    ];

    const isNoErrors = errors.every((rule) => !rule);
    return isNoErrors;
  };

  const validationCallback = useCallback(validation, [
    isEmpty,
    isToLong,
    isToShort,
    isFreeOfPunction,
    isTheSameCategory,
  ]);

  const handleChange = (_, value) => {
    const upperCaseValue = value.toUpperCase();
    setCategory(upperCaseValue);
    getError(upperCaseValue);
  };

  const handleSubmitItem = useCallback(() => {
    if (!validationCallback(category)) return;
    toggleButtonDisabling(true);

    const categoryFormat = category
      .split(' ')
      .filter((item) => item !== '')
      .join(' ');

    if (categoryId) {
      (async () => {
        const cat = await updateCategory(categoriesDispatch, {
          categoryId,
          value: categoryFormat,
        });

        toggleButtonDisabling(false);
        getData(cat);
        setCategory('');
      })();
    } else {
      (async () => {
        const cat = await addCategory(categoriesDispatch, {
          userId: user.id,
          value: categoryFormat,
        });

        toggleButtonDisabling(false);
        console.log(cat);
        if (getData) getData(cat);
        setCategory('');
      })();
    }
  }, [categoriesDispatch, category, categoryId, user, validationCallback, getData]);

  const handleClick = () => handleSubmitItem();
  const handleKeyUp = ({ keyCode }) => focus && keyCode === 13 && handleSubmitItem();
  const handleKeyUpCallback = useCallback(handleKeyUp, [focus, handleSubmitItem]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUpCallback);
    return () => window.removeEventListener('keyup', handleKeyUpCallback);
  }, [focus, handleKeyUpCallback]);

  return (
    <div className={styles.addNewItem}>
      <Input
        type="text"
        id="newCategory"
        name="newCategory"
        placeholder="Type custom category"
        onChange={handleChange}
        lightTheme={lightTheme}
        value={category}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {error && <FormError error={error} />}
      <Button
        className={styles.selectButton}
        lightTheme={lightTheme}
        handleClick={handleClick}
        disabled={isButtonDisabled}
      >
        {categoryId ? 'Update category' : 'Add new category'}
      </Button>
    </div>
  );
};

AddNewItem.propTypes = {
  lightTheme: PropTypes.bool,
  categoryId: PropTypes.string,
};

AddNewItem.defaultProps = {
  lightTheme: false,
  categoryId: '',
};

export default AddNewItem;
