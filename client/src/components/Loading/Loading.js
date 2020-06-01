import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Loading.module.scss';

const Loading = ({ loaded, render, reactOnChange, className }) => {
  const [renderData, setRenderData] = useState(false);

  useEffect(() => setRenderData(false), [reactOnChange]);

  useEffect(() => {
    let timeout;
    if (loaded) timeout = setTimeout(() => setRenderData(true), 500);

    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <>
      {renderData ? (
        render()
      ) : (
        <div className={className}>
          <div className={styles.loading}>
            <span className={styles.loadingItem} />
          </div>
        </div>
      )}
    </>
  );
};

Loading.propTypes = {
  loaded: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
  reactOnChange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

Loading.defaultProps = {
  reactOnChange: '',
  className: '',
};

export default Loading;
