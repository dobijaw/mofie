import React, { useState, useEffect } from 'react';
import { useFetch } from 'hooks';
import { withRouter, Redirect } from 'react-router';
import MovieYear from 'components/SingleMovie/MovieYear/MovieYear';
import MovieTitle from 'components/SingleMovie/MovieTitle/MovieTitle';
import MovieGenres from 'components/SingleMovie/MovieGenres/MovieGenres';
import MovieDescription from 'components/SingleMovie/MovieDescription/MovieDescription';
import Comments from 'components/Comments/Comments';
import MoviePoster from 'components/SingleMovie/MoviePoster/MoviePoster';
import Crew from 'components/SingleMovie/Crew/Crew';
import MainCrew from 'components/SingleMovie/MainCrew/MainCrew';
import SubHeadline from 'components/SubHeadline/SubHeadline';
import Cast from 'components/SingleMovie/Cast/Cast';
import Keywords from 'components/SingleMovie/Keywords/Keywords';
import Tagline from 'components/SingleMovie/Tagline/Tagline';
import API_KEY from 'config';
import styles from './SingleProductionView.module.scss';

const SingleMovieView = ({ location, match }) => {
  const { pathname } = location;
  const { id } = match.params;
  const [mainCrew, setMainCrew] = useState([]);

  const context = pathname.includes('movies') ? 'movie' : 'tv';
  const productionURL = `https://api.themoviedb.org/3/${context}/${id}?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/${context}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const keywordsURL = `https://api.themoviedb.org/3/${context}/${id}/keywords?api_key=${API_KEY}&language=en-US`;
  const videosURL = `https://api.themoviedb.org/3/${context}/${id}/videos?api_key=${API_KEY}&language=en-US`;
  const simillarURL = `https://api.themoviedb.org/3/${context}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const [detailsData, detailsError, detailsLoading] = useFetch(productionURL);
  const [creditsData, creditsError, creditsLoading] = useFetch(creditsURL);
  const [keywordsData, keywordsError, keywordsLoading] = useFetch(keywordsURL);
  const [videosData, videosError, videosLoading] = useFetch(videosURL);
  const [simillarData, simillarError, simillarLoading] = useFetch(simillarURL);

  useEffect(() => {
    if (!creditsLoading && !creditsError && !creditsData.status_code) {
      const data = creditsData.crew
        .filter(
          (i) =>
            i.job.toLowerCase() === 'director' ||
            i.job.toLowerCase() === 'screenplay',
        )
        .sort((a, b) => {
          if (a.job < b.job) return -1;
          if (a.job > b.job) return 1;
          return 0;
        })
        .map(({ job, name, credit_id }) => ({
          id: credit_id,
          job,
          name,
        }));

      setMainCrew(data);
    }
  }, [creditsData, creditsLoading, creditsError]);

  return (
    <>
      {detailsError &&
        keywordsError &&
        videosError &&
        simillarError &&
        'Something went wrong!'}
      {detailsLoading && videosLoading && simillarLoading ? (
        'Is loading'
      ) : (
        <>
          {detailsData.status_code ? (
            <Redirect to="/404" />
          ) : (
            <>
              <section className={styles.movieWrapper}>
                <div className={styles.movieWrapperItem}>
                  <MoviePoster
                    img={`http://image.tmdb.org/t/p/w500/${detailsData.poster_path}`}
                    poster
                  />
                </div>
                <div className={styles.movieWrapperItem}>
                  <MovieYear
                    year={
                      context === 'movie'
                        ? detailsData.release_date
                        : detailsData.first_air_date
                    }
                  />
                  <MovieTitle
                    title={
                      context === 'movie' ? detailsData.title : detailsData.name
                    }
                  />
                  <Tagline>{detailsData.tagline}</Tagline>
                  <MovieGenres genres={detailsData.genres.map((i) => i.name)} />

                  <MovieDescription description={detailsData.overview} />
                  {mainCrew.length && <MainCrew crew={mainCrew} />}
                  {!keywordsLoading && (
                    <Keywords
                      keywords={
                        context === 'movie'
                          ? keywordsData.keywords
                          : keywordsData.results
                      }
                    />
                  )}

                  {detailsData.adult && 'Only for Adults!'}
                </div>
              </section>
              <section className={styles.cast}>
                <SubHeadline>Cast</SubHeadline>
                {!creditsLoading && (
                  <Cast
                    cast={creditsData.cast.map((i) => ({
                      id: i.credit_id,
                      name: i.name,
                      character: i.character,
                      avatar: i.profile_path
                        ? `http://image.tmdb.org/t/p/w500${i.profile_path}`
                        : '',
                    }))}
                  />
                )}
              </section>
              <Comments />
              <section>
                {!creditsLoading && (
                  <Crew
                    crew={creditsData.crew.map(({ job, name, credit_id }) => ({
                      id: credit_id,
                      job,
                      name,
                    }))}
                  />
                )}
              </section>
              <section>
                {!simillarLoading &&
                  simillarData.results.map((i) => (
                    <h2 key={i.id}>{i.title}</h2>
                  ))}
              </section>
              <section>
                {!videosLoading &&
                  videosData.results.map((i) => <p key={i.key}>{i.name}</p>)}
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(SingleMovieView);
