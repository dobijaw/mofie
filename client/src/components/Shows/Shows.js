import React from 'react';
import PropTypes from 'prop-types';

import ShowsDetails from './ShowsDetails/ShowsDetails';

import styles from './Shows.module.scss';

const Shows = ({ episodes, seasones, lastEpisode, nextEpisode, runTime }) => (
  <div className={styles.shows}>
    <ShowsDetails name="Seasones" value={seasones} />
    <ShowsDetails name="Episodes" value={episodes} />
    <ShowsDetails name="Runtime" value={runTime} />
    <ShowsDetails name="Last episode" value={lastEpisode} />
    {nextEpisode && <ShowsDetails name="Next episode" value={nextEpisode} />}
  </div>
);

Shows.propTypes = {
  episodes: PropTypes.number.isRequired,
  seasones: PropTypes.number.isRequired,
  lastEpisode: PropTypes.string.isRequired,
  nextEpisode: PropTypes.string.isRequired,
  runTime: PropTypes.number.isRequired,
};

export default Shows;
