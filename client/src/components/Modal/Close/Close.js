import React, { useContext } from 'react';
import { RootContext } from 'context';
import styles from './Close.module.scss';

const Close = () => {
  const { handleCloseModal } = useContext(RootContext);

  return (
    <button
      type="button"
      className={styles.close}
      onClick={handleCloseModal}
      aria-label="Close modal"
    />
  );
};

export default Close;
