import React, { useState, useEffect } from 'react';
import { useFetch } from 'hooks';
import { withRouter, Redirect } from 'react-router';
import ReleaseDate from 'components/Production/ReleaseDate/ReleaseDate';
import Title from 'components/Production/Title/Title';
import Genres from 'components/Production/Genres/Genres';
import Overview from 'components/Production/Overview/Overview';
import Comments from 'components/Comments/Comments';
import Poster from 'components/Production/Poster/Poster';
import Crew from 'components/Production/Crew/Crew';
import MainCrew from 'components/Production/MainCrew/MainCrew';
import SubHeadline from 'components/SubHeadline/SubHeadline';
import Cast from 'components/Production/Cast/Cast';
import Keywords from 'components/Production/Keywords/Keywords';
import Tagline from 'components/Production/Tagline/Tagline';
import { API_KEY } from 'config';
import styles from './ProductionView.module.scss';

const ProductionView = ({ location, match }) => {
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
                  <Poster
                    image={`http://image.tmdb.org/t/p/w500/${detailsData.poster_path}`}
                    asPoster
                  />
                </div>
                <div className={styles.movieWrapperItem}>
                  <ReleaseDate>
                    {context === 'movie'
                      ? detailsData.release_date
                      : detailsData.first_air_date}
                  </ReleaseDate>
                  <Title>
                    {context === 'movie' ? detailsData.title : detailsData.name}
                  </Title>
                  <Tagline>{detailsData.tagline}</Tagline>
                  <Genres genres={detailsData.genres.map((i) => i.name)} />

                  <Overview>{detailsData.overview}</Overview>
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

export default withRouter(ProductionView);
