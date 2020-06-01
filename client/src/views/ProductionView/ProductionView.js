import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { removeFromCollection } from 'actions/collection';
import { withRouter, Redirect } from 'react-router';
import { useFetch, useDataProduction } from 'hooks';
import { AppContext, RootContext } from 'context';
import { selectProductionData } from 'universal';
import { FETCH_TYPE, ROUTE_TYPE } from 'types';
import { API_KEY } from 'config';
import { routes } from 'routes';

import Shows from 'components/Shows/Shows';
import AllCast from 'components/AllCast/AllCast';
import AllCrew from 'components/AllCrew/AllCrew';
import Loading from 'components/Loading/Loading';
import Comments from 'components/Comments/Comments';
import PageTitle from 'components/PageTitle/PageTitle';
import Production from 'components/Production/Production';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import SimillarProductions from 'components/SimillarProductions/SimillarProductions';

const ProductionView = ({ location, match }) => {
  const { user, collection, collectionDispatch } = useContext(AppContext);
  const {
    movieGenres,
    showGenres,
    movieGenresLoading,
    showGenresLoading,
    handleOpenModal,
  } = useContext(RootContext);

  const { id } = match.params;
  const { pathname } = location;
  const productionType = pathname.includes(ROUTE_TYPE.MOVIES)
    ? FETCH_TYPE.MOVIE
    : FETCH_TYPE.TV;

  const detailsURL = `https://api.themoviedb.org/3/${productionType}/${id}?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/${productionType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const simillarURL = `https://api.themoviedb.org/3/${productionType}/${id}/similar?api_key=${API_KEY}&language=en-US`;
  const keywordsURL = `https://api.themoviedb.org/3/${productionType}/${id}/keywords?api_key=${API_KEY}&language=en-US`;

  const [detailsData, detailsError, detailsLoading] = useFetch(detailsURL);
  const [creditsData, creditsError, creditsLoading] = useFetch(creditsURL);
  const [keywordsData, keywordsError, keywordsLoading] = useFetch(keywordsURL);
  const [simillarData, simillarError, simillarLoading] = useFetch(simillarURL);

  const [isRenderedDataLoaded, setRenderedDataLoaded] = useState(false);
  const [isAllDataLoaded, setDataLoading] = useState(false);
  const [isInCollection, setInCollection] = useState(null);
  const [renderedData, setRenderedData] = useState({});

  useEffect(() => {
    setRenderedData({});
    setDataLoading(false);
    setRenderedDataLoaded(false);
  }, [id]);

  const [simillarProductions, simillarProductionsLoaded] = useDataProduction(
    !simillarLoading && !simillarError && !movieGenresLoading && !showGenresLoading,
    simillarData?.results,
    movieGenres?.genres,
    showGenres?.genres,
    selectProductionData,
  );

  useEffect(() => {
    if (
      !detailsLoading &&
      !keywordsLoading &&
      !creditsLoading &&
      !detailsData?.status_code &&
      !detailsError &&
      !keywordsError
    ) {
      const output = {
        image: detailsData.poster_path
          ? `http://image.tmdb.org/t/p/w500/${detailsData.poster_path}`
          : '',
        releaseDate: detailsData.release_date || detailsData.first_air_date,
        title: detailsData.title || detailsData.name,
        tagline: detailsData.tagline || '',
        genres: detailsData.genres.map((i) => i.name),
        overview: detailsData.overview,
        budget: detailsData.budget || null,
        revenue: detailsData.revenue || null,
        episodes: detailsData.number_of_episodes || '',
        seasones: detailsData.number_of_seasons || null,
        episodeRunTime: detailsData.name ? detailsData.episode_run_time[0] : null,
        creators: detailsData.name ? detailsData.created_by.map((c) => c.name) : null,
        inProduction: detailsData.in_production || false,
        lastEpisode: detailsData.last_air_date || '',
        nextEpisode: detailsData.next_episode_to_air?.air_date || '',
        rate: detailsData.vote_average || null,
        keywords: keywordsData?.keywords || keywordsData?.results,
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
          avatar: i.profile_path ? `http://image.tmdb.org/t/p/w500${i.profile_path}` : '',
        })),
        mainCrew: creditsData?.crew
          .filter(
            (i) => i.job.toLowerCase() === 'director' || i.job.toLowerCase() === 'screenplay',
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
      setRenderedDataLoaded(true);
    }
  }, [
    creditsData,
    detailsData,
    keywordsData,
    detailsLoading,
    keywordsLoading,
    creditsLoading,
    keywordsError,
    detailsError,
  ]);

  useEffect(() => {
    let timeout;

    if (isRenderedDataLoaded && simillarProductionsLoaded) {
      timeout = setTimeout(() => setDataLoading(true), 500);
    }

    return () => clearTimeout(timeout);
  }, [isRenderedDataLoaded, simillarProductionsLoaded]);

  useEffect(() => {
    if (collection) {
      const isData = collection.find((item) => item.productionId === +id);
      setInCollection(isData || false);
    }
  }, [collection, id]);

  return (
    <MainTemplate>
      {console.log(detailsData)}
      <PageTitle isHidden>Actor details</PageTitle>
      {(detailsError !== null || detailsData?.status_code) && <Redirect to={routes.page404} />}
      <Loading
        loaded={isAllDataLoaded}
        reactOnChange={id}
        render={() => (
          <>
            <Production
              handleRemoveFromCollection={() =>
                removeFromCollection(collectionDispatch, isInCollection._id)
              }
              handleModalOpen={() => handleOpenModal(productionType, id)}
              isInCollection={isInCollection}
              releaseDate={renderedData.releaseDate}
              overview={renderedData.overview}
              keywords={renderedData.keywords}
              tagline={renderedData.tagline}
              genres={renderedData.genres}
              isAuth={user.isAuth}
              image={renderedData.image}
              title={renderedData.title}
              crew={renderedData.mainCrew}
              rate={renderedData.rate}
              budget={renderedData.budget}
              inProduction={renderedData.inProduction}
              type={productionType}
              lastEpisode={!renderedData.inProduction ? renderedData.lastEpisode : ''}
              showsCreators={renderedData.creators}
              revenue={renderedData.revenue}
            />
            {productionType === FETCH_TYPE.TV && (
              <Shows
                episodes={renderedData.episodes}
                seasones={renderedData.seasones}
                lastEpisode={renderedData.lastEpisode}
                nextEpisode={renderedData.nextEpisode}
                runTime={renderedData.episodeRunTime}
              />
            )}
            {isInCollection && user.isAuth && (
              <Comments
                rate={isInCollection.customData.rate}
                category={isInCollection.customData.categoryId}
                comment={isInCollection.customData.comment}
                collectionItemID={isInCollection._id}
              />
            )}
            {simillarProductions.length > 0 && (
              <SimillarProductions productions={simillarProductions} />
            )}

            {!creditsError && (
              <>
                <AllCast cast={renderedData.cast} />
                <AllCrew crew={renderedData.crew} />
              </>
            )}
          </>
        )}
      />
    </MainTemplate>
  );
};

ProductionView.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(ProductionView);
