import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'components/Actor/Avatar/Avatar';
import Name, { TYPE } from 'components/Actor/Name/Name';
import styles from './Cast.module.scss';

const Cast = ({ cast }) => (
  <ul className={styles.cast}>
    {cast.map((c) => (
      <li key={c.id} className={styles.cast_item}>
        <Link to={`/actor/${c.id}`} className={styles.cast_link}>
          <Avatar image={c.avatar} isSmall />
          <Name tag="h3" type={TYPE.ACTOR} name={c.name} />
          <Name tag="span" type={TYPE.CHARACTER} name={c.character} />
        </Link>
      </li>
    ))}
  </ul>
);

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      character: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

export default Cast;
