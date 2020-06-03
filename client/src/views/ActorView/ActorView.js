import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withRouter, Redirect } from 'react-router-dom';
import { RootContext } from 'context';
import { API_KEY } from 'config';
import { useFetch } from 'hooks';
import { routes } from 'routes';

import Actor from 'components/Actor/Actor';
import Loading from 'components/Loading/Loading';
import Pagination from 'components/Pagination/Pagination';
import SubHedline from 'components/SubHeadline/SubHeadline';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import ProductionList from 'components/ProductionList/ProductionList';

const ActorView = ({ match }) => {
  const { movieGenres, showGenres, movieGenresLoading, showGenresLoading } = useContext(
    RootContext,
  );
  const { id } = match.params;

  const detailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`;

  const [details, detailsErr, detailsLoading] = useFetch(detailsURL);
  const [credits, creditsErr, creditsLoading] = useFetch(creditsURL);
  const [currentPage, setCurrentPage] = useState(1);
  const [production, setProduction] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [id]);

  const sliceProduction = (prod, cur) => prod.slice(cur === 1 ? 0 : (cur - 1) * 10, cur * 10);

  useEffect(() => {
    if (
      !creditsLoading &&
      !detailsLoading &&
      !creditsErr &&
      !movieGenresLoading &&
      !showGenresLoading
    ) {
      const data = credits?.cast.map((p) => ({
        id: p.id,
        image: p.backdrop_path
          ? `http://image.tmdb.org/t/p/w500/${p.backdrop_path}`
          : p.poster_path
          ? `http://image.tmdb.org/t/p/w500/${p.poster_path}`
          : '',
        releaseDate: p.release_date,
        title: p.title || p.name || '',
        productionType: p.media_type,
        rate: p.vote_average,
        genres: p.title
          ? movieGenres?.genres.filter((i) => p.genre_ids.includes(i.id)).map((i) => i.name)
          : showGenres?.genres.filter((i) => p.genre_ids.includes(i.id)).map((i) => i.name),
      }));

      const filterData = data.filter((i) => i.title !== '');
      const dataWitohoutDuplicate = filterData.filter((item) => {
        let count = 0;
        const ids = item.id;

        filterData.forEach((el) => el.id === ids && count++);

        return count <= 1;
      });

      setLoaded(true);
      setProduction(dataWitohoutDuplicate);
    }
  }, [
    movieGenresLoading,
    showGenresLoading,
    detailsLoading,
    creditsLoading,
    movieGenres,
    showGenres,
    creditsErr,
    credits,
    id,
  ]);

  return (
    <MainTemplate footerSpace>
      {detailsErr && <Redirect to={routes.page404} />}
      <Loading
        loaded={loaded}
        render={() => (
          <>
            <Actor
              name={details.name}
              bio={details.biography}
              birthday={details.birthday || ''}
              deathday={details.deathday || ''}
              image={
                details.profile_path
                  ? `http://image.tmdb.org/t/p/w500${details.profile_path}`
                  : ''
              }
            />
            <section>
              <SubHedline>Productions</SubHedline>
              <ProductionList
                asBasic
                productionData={sliceProduction(production, currentPage)}
              />
              <Pagination
                initialPage={1}
                totalPages={Math.ceil(production.length / 10)}
                getCurrentPage={setCurrentPage}
              />
            </section>
          </>
        )}
      />
    </MainTemplate>
  );
};

ActorView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ActorView);
