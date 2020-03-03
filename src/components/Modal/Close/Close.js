import React from 'react';
import styles from './Close.module.scss';
import AppContext from '../../../context';

const Close = () => (
  <AppContext.Consumer>
    {context => (
      <button
        type="button"
        className={styles.btn}
        onClick={context.handleCloseModal}
      >
        <span className={styles.btnItem} />
        <span className={styles.btnItem} />
      </button>
    )}
  </AppContext.Consumer>
);

export default Close;
