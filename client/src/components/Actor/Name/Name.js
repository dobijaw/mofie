import React from 'react';
import PropTypes from 'prop-types';
import styles from './Name.module.scss';

export const TYPE = {
  ACTOR: 'ACTOR',
  CHARACTER: 'CHARACTER',
};

const Name = ({ tag: Tag, type, name }) => (
  <Tag
    className={[
      styles.name,
      type === TYPE.ACTOR ? styles.name___actor : styles.name___character,
    ].join(' ')}
  >
    {name}
  </Tag>
);

Name.propTypes = {
  tag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TYPE.ACTOR, TYPE.CHARACTER]).isRequired,
};

export default Name;
