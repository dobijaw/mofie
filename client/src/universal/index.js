import { FETCH_TYPE } from 'types';

export const selectProductionData = (data, movieGenres, showGenres) => {
  const output = data.map((p) => ({
    id: p.id,
    image: p.backdrop_path
      ? `http://image.tmdb.org/t/p/w500${p.backdrop_path}`
      : p.poster_path
      ? `http://image.tmdb.org/t/p/w500${p.poster_path}`
      : '',
    releaseDate: p.release_date || p.first_air_date,
    title: p.title || p.name,
    genres: p.title
      ? movieGenres.filter((i) => p.genre_ids.includes(i.id)).map((i) => i.name)
      : showGenres.filter((i) => p.genre_ids.includes(i.id)).map((i) => i.name),
    productionType: p.title ? FETCH_TYPE.MOVIE : FETCH_TYPE.TV,
    rate: p.vote_average || 0,
  }));

  return output;
};
