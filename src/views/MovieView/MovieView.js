import React, { useState, useEffect, useContext } from 'react';
import { useFetch } from 'hooks';
import API_KEY from 'config';
import AppContext from 'context';
import Title from 'components/Title/Title';
import MovieList from 'components/MovieList/MovieList';

const MovieView = () => {
  const context = useContext(AppContext);
  const [movies, getMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  const [moviesRes] = useFetch(popularMoviesURL);

  useEffect(() => {
    if (moviesRes !== null && context.movieGenres !== null) {
      const data = moviesRes.results.map((movie) => ({
        id: movie.id,
        img:
          movie.backdrop_path &&
          `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        year: movie.release_date,
        title: movie.title,
        genres: context.movieGenres.genres
          .filter((i) => movie.genre_ids.includes(i.id))
          .map((i) => i.name),
        type: 'movie',
      }));

      getMovies(data);
    }
  }, [moviesRes, context]);

  return (
    <>
      <Title headline="Search movie" />
      <MovieList movies={movies} type="movies" />
      <button
        type="button"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage <= 1}
      >
        prev
      </button>
      <button
        type="button"
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        next
      </button>
    </>
  );
};
export default MovieView;
