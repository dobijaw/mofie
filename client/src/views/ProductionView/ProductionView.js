import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from 'hooks';
import { withRouter, Redirect } from 'react-router';
import Comments from 'components/Comments/Comments';
import { API_KEY } from 'config';
import { AppContext, RootContext } from 'context';
import { FETCH_TYPE, ROUTE_TYPE } from 'types';
import { routes } from 'routes';
import Loading from 'components/Loading/Loading';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import { removeFromCollection } from 'actions/collection';
import Production from 'components/Production/Production';
import AllCast from 'components/AllCast/AllCast';
import AllCrew from 'components/AllCrew/AllCrew';
import SimillarProductions from 'components/SimillarProductions/SimillarProductions';
import PageTitle from '../../components/PageTitle/PageTitle';

const ProductionView = ({ location, match }) => {
  const { user, collection, collectionDispatch } = useContext(AppContext);
  const rootContext = useContext(RootContext);
  const { pathname } = location;
  const { id } = match.params;
  const prodType = pathname.includes(ROUTE_TYPE.MOVIES) ? FETCH_TYPE.MOVIE : FETCH_TYPE.TV;

  const detailsURL = `https://api.themoviedb.org/3/${prodType}/${id}?api_key=${API_KEY}&language=en-US`;
  const keywordsURL = `https://api.themoviedb.org/3/${prodType}/${id}/keywords?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/${prodType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const simillarURL = `https://api.themoviedb.org/3/${prodType}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  const [detailsData, detailsError, detailsLoading] = useFetch(detailsURL);
  const [keywordsData, keywordsError, keywordsLoading] = useFetch(keywordsURL);
  const [creditsData, creditsError, creditsLoading] = useFetch(creditsURL);
  const [simillarData, simillarError, simillarLoading] = useFetch(simillarURL);

  const [simillarProductions, setSimillarProductions] = useState([]);
  const [isAllDataLoaded, setDataLoding] = useState(false);
  const [renderedData, setRenderedData] = useState({});

  const [isInCollection, setInCollection] = useState(null);

  useEffect(() => {
    setSimillarProductions([]);
    setDataLoding(false);
    setRenderedData({});
  }, [id]);

  useEffect(() => {
    if (
      !simillarLoading &&
      !simillarError &&
      rootContext &&
      rootContext?.movieGenres !== null &&
      rootContext?.showGenres !== null
    ) {
      const data = simillarData.results.map((p) => ({
        id: p.id,
        image: p.backdrop_path
          ? `http://image.tmdb.org/t/p/w500${p.backdrop_path}`
          : p.poster_path
          ? `http://image.tmdb.org/t/p/w500${p.poster_path}`
          : '',
        releaseDate: p.release_date || p.first_air_date,
        title: p.title || p.name || '',
        genres: p.title
          ? rootContext?.movieGenres.genres
              .filter((i) => p.genre_ids.includes(i.id))
              .map((i) => i.name)
          : rootContext?.showGenres.genres
              .filter((i) => p.genre_ids.includes(i.id))
              .map((i) => i.name),
        productionType: p.title ? 'movie' : 'tv',
        rate: p.vote_average || 0,
      }));

      console.log(simillarData);

      setSimillarProductions(data);
    }
  }, [simillarData, simillarLoading, rootContext, simillarError]);

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
        releaseDate:
          prodType === FETCH_TYPE.MOVIE
            ? detailsData.release_date
            : detailsData.first_air_date,
        title: prodType === FETCH_TYPE.MOVIE ? detailsData.title : detailsData.name,
        tagline: detailsData.tagline || '',
        genres: detailsData.genres.map((i) => i.name),
        overview: detailsData.overview,
        keywords:
          prodType === FETCH_TYPE.MOVIE ? keywordsData?.keywords : keywordsData?.results,
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
      setTimeout(() => setDataLoding(true), 500);
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
    prodType,
  ]);

  useEffect(() => {
    if (collection) {
      const isData = collection.find((item) => item.productionId === +id);
      setInCollection(isData || false);
    }
  }, [collection, id]);

  return (
    <MainTemplate>
      {console.log('isInCollection')}
      {console.log(isInCollection)}
      <PageTitle isHidden>Actor details</PageTitle>
      {(detailsError !== null || detailsData?.status_code) && <Redirect to={routes.page404} />}
      <Loading
        loaded={isAllDataLoaded}
        url={id}
        render={() => (
          <>
            <Production
              handleRemoveFromCollection={() =>
                removeFromCollection(collectionDispatch, isInCollection._id)
              }
              handleModalOpen={() => rootContext.handleOpenModal(prodType, id)}
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
            />
            {isInCollection && user.isAuth && (
              <Comments
                rate={isInCollection.customData.rate}
                category={isInCollection.customData.categoryId}
                comment={isInCollection.customData.comment}
                collectionItemID={isInCollection._id}
              />
            )}
            {simillarProductions.length >= 1 && (
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
export default withRouter(ProductionView);
