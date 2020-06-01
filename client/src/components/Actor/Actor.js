import React from 'react';
import PropTypes from 'prop-types';

import PageTitle from 'components/PageTitle/PageTitle';
import Bio from './Bio/Bio';
import Period from './Period/Period';
import Avatar from './Avatar/Avatar';
import styles from './Actor.module.scss';

const Actor = ({ image, name, birthday, deathday, bio }) => (
  <div className={styles.actor}>
    <div className={styles.actor_avatar}>
      <Avatar image={image} />
    </div>
    <div className={styles.actor_data}>
      <PageTitle small>{name}</PageTitle>
      <Period birthday={birthday} deathday={deathday} />
      <Bio>{bio}</Bio>
    </div>
  </div>
);

Actor.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  deathday: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default Actor;
