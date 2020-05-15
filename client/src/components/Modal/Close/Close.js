import React from 'react';
import styles from './Close.module.scss';
import { RootContext } from '../../../context';

const Close = () => (
  <RootContext.Consumer>
    {(context) => (
      <button
        type="button"
        className={styles.btn}
        onClick={context.handleCloseModal}
      >
        <span className={styles.btnItem} />
        <span className={styles.btnItem} />
      </button>
    )}
  </RootContext.Consumer>
);

export default Close;
