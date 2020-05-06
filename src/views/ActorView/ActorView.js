import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { API_KEY } from 'config';
import { useFetch } from 'hooks';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './ActorView.module.scss';

const ActorView = ({ match }) => {
  const { id } = match.params;
  const detailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`;

  const [details, detailsErr, detailsLoading] = useFetch(detailsURL);
  const [credits, creditsErr, creditsLoading] = useFetch(creditsURL);

  return (
    <>
      <PageTitle>Actor</PageTitle>
      {detailsErr && <Redirect to="/404" />}
      {!detailsLoading && (
        <div className={styles.actor}>
          <img
            src={`http://image.tmdb.org/t/p/w500${details.profile_path}`}
            alt=""
          />
          <h2>{details.name}</h2>
          <span>{details.birthday}</span>
          {details.deathday && <span>- {details.deathday}</span>}
          <p>{details.biography}</p>
        </div>
      )}
      {!creditsLoading && !creditsErr && (
        <div className={styles.movie}>
          {credits.cast.map((item) => (
            <div key={item.credit_id}>
              <div>{item.id}</div>
              <span>{id.release_date}</span>
              <h3>{item.title}</h3>
              <span>{item.vote_average}</span>
              <p>{item.overview}</p>
              <img
                src={
                  item.backdrop_path
                    ? `http://image.tmdb.org/t/p/w500${item.backdrop_path}`
                    : item.poster_path
                    ? `http://image.tmdb.org/t/p/w500${item.poster_path}`
                    : null
                }
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default withRouter(ActorView);
