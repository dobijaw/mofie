import React, { useState, useEffect, useContext } from 'react';
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
import Button from 'components/Button/Button';
import { API_KEY } from 'config';
import { AppContext } from 'context';
import { FETCH_TYPE, ROUTE_TYPE } from 'store';
import { routes } from 'routes';
import Loading from 'components/Loading/Loading';
import styles from './ProductionView.module.scss';

const ProductionView = ({ location, match }) => {
  const appContext = useContext(AppContext);
  const { pathname } = location;
  const { id } = match.params;
  const prodType = pathname.includes(ROUTE_TYPE.MOVIES)
    ? FETCH_TYPE.MOVIE
    : FETCH_TYPE.TV;

  const detailsURL = `https://api.themoviedb.org/3/${prodType}/${id}?api_key=${API_KEY}&language=en-US`;
  const keywordsURL = `https://api.themoviedb.org/3/${prodType}/${id}/keywords?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/${prodType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const videosURL = `https://api.themoviedb.org/3/${prodType}/${id}/videos?api_key=${API_KEY}&language=en-US`;
  // const simillarURL = `https://api.themoviedb.org/3/${prodType}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const [detailsData, detailsError, detailsLoading] = useFetch(detailsURL);
  const [keywordsData, keywordsError, keywordsLoading] = useFetch(keywordsURL);
  const [creditsData, creditsError, creditsLoading] = useFetch(creditsURL);
  const [videosData, videosError, videosLoading] = useFetch(videosURL);
  // const [simillarData, simillarError, simillarLoading] = useFetch(simillarURL);
  const [isClose, setClose] = useState(true);

  // const [simmilarProductions, setSimillarProductions] = useState({});
  const [isAllDataLoaded, setDataLoding] = useState(false);
  const [renderedData, setRenderedData] = useState({});

  const [isInCollection, setInCollection] = useState({});

  useEffect(() => {
    if (
      !detailsLoading &&
      !keywordsLoading &&
      !creditsLoading &&
      !videosLoading &&
      !detailsData?.status_code &&
      !detailsError
    ) {
      const output = {
        adults: detailsData.adult,
        videos: videosData?.results.map((i) => ({
          videoID: i.id,
          videoName: i.name,
          videoSite: i.site,
          videoType: i.type,
          videoKey: i.key,
        })),
        image:
          `http://image.tmdb.org/t/p/w500/${detailsData.poster_path}` || null,
        releaseDate:
          prodType === FETCH_TYPE.MOVIE
            ? detailsData.release_date
            : detailsData.first_air_date,
        title:
          prodType === FETCH_TYPE.MOVIE ? detailsData.title : detailsData.name,
        tagline: detailsData.tagline || null,
        genres: detailsData.genres.map((i) => i.name),
        overview: detailsData.overview,
        keywords:
          prodType === FETCH_TYPE.MOVIE
            ? keywordsData?.keywords
            : keywordsData?.results,
        crew: creditsData?.crew.map(({ job, name, credit_id }) => ({
          id: credit_id,
          job,
          name,
        })),
        cast: creditsData?.cast.map((i) => ({
          id: i.id,
          creditID: i.credit_id,
          name: i.name,
          character: i.character,
          avatar: i.profile_path
            ? `http://image.tmdb.org/t/p/w500${i.profile_path}`
            : '',
        })),
        mainCrew: creditsData?.crew
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
          })),
      };

      setRenderedData(output);
      setTimeout(() => setDataLoding(true), 500);
    }
  }, [
    videosData,
    creditsData,
    detailsData,
    keywordsData,
    videosLoading,
    detailsLoading,
    keywordsLoading,
    creditsLoading,
    detailsError,
    prodType,
  ]);

  useEffect(() => {
    setInCollection(
      appContext.stateCollections.find((item) => item.id === +id),
    );
  }, [appContext.stateCollections, id]);

  return (
    <>
      {(detailsError !== null || detailsData?.status_code) && (
        <Redirect to={routes.page404} />
      )}
      {isAllDataLoaded ? (
        <>
          <section className={styles.movieWrapper}>
            <div className={styles.movieWrapperItem}>
              <Poster image={renderedData.image} asPoster />
            </div>
            <div className={styles.movieWrapperItem}>
              <ReleaseDate>{renderedData.releaseDate}</ReleaseDate>
              <Title>{renderedData.title}</Title>
              {renderedData.tagline && (
                <Tagline>{renderedData.tagline}</Tagline>
              )}
              <Genres genres={renderedData.genres} />
              <Overview>{renderedData.overview}</Overview>
              {(!creditsError || renderedData.mainCrew) && (
                <MainCrew crew={renderedData.mainCrew} />
              )}
              {(!keywordsError || renderedData.keywords) && (
                <Keywords keywords={renderedData.keywords} />
              )}
              {detailsData.adult && 'Only for Adults!'}
            </div>
          </section>
          {isInCollection && (
            <Comments
              rate={isInCollection.customData.rate.name}
              category={isInCollection.customData.category.name}
              comment={isInCollection.customData.comment}
            />
          )}
          {!creditsError && (
            <section className={styles.cast}>
              <SubHeadline>Cast</SubHeadline>
              <Cast
                cast={
                  isClose ? renderedData.cast.slice(0, 5) : renderedData.cast
                }
              />
              <Button
                type="button"
                handleClick={() => setClose(!isClose)}
                className={styles.productionButton}
              >
                {isClose ? 'more' : 'less'}
              </Button>
            </section>
          )}
          {!videosError && (
            <section>
              <SubHeadline>Videos</SubHeadline>
              <div className={styles.videoGroup}>video</div>
            </section>
          )}
          {!creditsError && (
            <section>
              <SubHeadline>Crew</SubHeadline>
              <Crew crew={renderedData.crew} />
            </section>
          )}
        </>
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </>
  );
};
export default withRouter(ProductionView);
