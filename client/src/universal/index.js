import { FETCH_TYPE } from 'store';

export const selectProductionData = (data, genresData, type) => {
  const output = data.map((p) => ({
    id: p.id,
    image: p.backdrop_path
      ? `http://image.tmdb.org/t/p/w500${p.backdrop_path}`
      : p.poster_path
      ? `http://image.tmdb.org/t/p/w500${p.poster_path}`
      : '',
    releaseDate: type === 'movie' ? p.release_date : p.first_air_date,
    title: type === 'movie' ? p.title : p.name,
    genres: genresData
      .filter((i) => p.genre_ids.includes(i.id))
      .map((i) => i.name),
    productionType:
      type === FETCH_TYPE.MOVIE ? FETCH_TYPE.MOVIE : FETCH_TYPE.TV,
    rate: p.vote_average || 0,
  }));

  return output;
};
