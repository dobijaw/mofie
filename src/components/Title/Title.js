import React from 'react';
import styles from './Title.module.scss';

const Title = ({ headline }) => <h1 className={styles.title}>{headline}</h1>;

export default Title;
