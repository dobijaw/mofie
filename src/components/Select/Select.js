import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'context';
import Input from 'components/Input/Input';
import styles from './Select.module.scss';

const Select = ({ withButton, options, id, label, name, placeholder }) => {
  const context = useContext(AppContext);
  const [value, setValue] = useState(placeholder);
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [isSelectListVisible, setSelectListVisibility] = useState(true);

  useEffect(() => {
    setSelectListVisibility(false);
  }, [value]);

  const handleNewCategoryClick = () => {
    if (
      context.stateCategories.some(
        (c) => c.value === newCategoryValue.replace(/\s/g, ''),
      )
    )
      return;

    context.dispatchCategories({
      type: 'ADD_CATEGORY',
      payload: {
        value: newCategoryValue.replace(/\s/g, '').toLowerCase(),
        name: newCategoryValue,
      },
    });

    setValue(newCategoryValue);
    setNewCategoryValue('');
  };

  return (
    <div className={styles.select}>
      <Input
        type="button"
        id={id}
        name={name}
        label={label}
        value={value}
        handleClick={() => setSelectListVisibility(!isSelectListVisible)}
      />
      <ul
        className={`${styles.selectList} ${
          isSelectListVisible && styles.selectListVisible
        }`}
      >
        {options.map((o) => (
          <li className={styles.selectItem} key={o.value}>
            <button
              className={`${styles.selectButton} ${styles.selectButtonOption}`}
              type="button"
              onClick={() => setValue(o.value)}
            >
              {o.name}
            </button>
          </li>
        ))}
        {withButton && (
          <li className={styles.selectItemAdd}>
            <input
              type="text"
              className={styles.selectInput}
              onChange={(e) => setNewCategoryValue(e.target.value)}
              value={newCategoryValue}
            />
            <button
              className={`${styles.selectButton} ${styles.selectButtonAdd}`}
              type="button"
              onClick={handleNewCategoryClick}
            >
              +
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Select;
