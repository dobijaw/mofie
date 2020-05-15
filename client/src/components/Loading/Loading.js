import React, { useState, useEffect } from 'react';
import styles from './Loading.module.scss';

const Loading = ({ loaded, render, url, className }) => {
  const [renderData, setRenderData] = useState(false);

  useEffect(() => {
    setRenderData(false);
  }, [url]);

  useEffect(() => {
    if (loaded) setTimeout(() => setRenderData(true), 500);
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

export default Loading;