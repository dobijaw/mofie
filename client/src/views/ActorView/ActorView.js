import React, { useContext, useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { API_KEY } from 'config';
import { RootContext } from 'context';
import { useFetch } from 'hooks';
import Avatar from 'components/Actor/Avatar/Avatar';
import PageTitle from 'components/PageTitle/PageTitle';
import Period from 'components/Actor/Period/Period';
import Bio from 'components/Actor/Bio/Bio';
import SubHedline from 'components/SubHeadline/SubHeadline';
import ProductionList from 'components/ProductionList/ProductionList';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import { FETCH_TYPE } from 'types';
import { routes } from 'routes';
import styles from './ActorView.module.scss';
// import Loading from 'components/Loading/Loading';

const ActorView = ({ match }) => {
  const context = useContext(RootContext);
  const { id } = match.params;
  const detailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
  const creditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`;

  const [details, detailsErr, detailsLoading] = useFetch(detailsURL);
  const [credits, creditsErr, creditsLoading] = useFetch(creditsURL);
  const [production, setProduction] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!creditsLoading && !creditsErr && context?.movieGenres && context?.showGenres) {
      const data = credits?.cast.map((p) => ({
        id: p.id,
        image: p.backdrop_path
          ? `http://image.tmdb.org/t/p/w500/${p.backdrop_path}`
          : p.poster_path
          ? `http://image.tmdb.org/t/p/w500/${p.poster_path}`
          : '',
        releaseDate: p.release_date,
        title: p.original_title || p.original_name || '',
        productionType: p.media_type,
        rate: p.vote_average,
        genres:
          p.media_type === FETCH_TYPE.MOVIE
            ? context?.movieGenres?.genres
                .filter((i) => p.genre_ids.includes(i.id))
                .map((i) => i.name)
            : context?.showGenres?.genres
                .filter((i) => p.genre_ids.includes(i.id))
                .map((i) => i.name),
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
  }, [creditsLoading, credits, creditsErr, context]);

  return (
    <MainTemplate>
      {detailsErr && <Redirect to={routes.page404} />}

      {!detailsLoading && (
        <header className={styles.actor}>
          <div className={styles.actor_avatar}>
            <Avatar
              image={
                details.profile_path
                  ? `http://image.tmdb.org/t/p/w500${details.profile_path}`
                  : ''
              }
            />
          </div>
          <div className={styles.actor_data}>
            <PageTitle small>{details.name}</PageTitle>
            <Period birthday={details.birthday} deathday={details.deathday} />
            <Bio>{details.biography}</Bio>
          </div>
        </header>
      )}
      <main>
        <SubHedline>Productions</SubHedline>
        {loaded && (
          <ProductionList
            asBasic
            className={styles.actorProductionList}
            productionData={production}
          />
        )}
      </main>
    </MainTemplate>
  );
};

export default withRouter(ActorView);
