import { FETCH_TYPE } from 'types';

export const sortOptions = [
  {
    value: 'Added recently',
    id: 'addedrecently',
  },
  {
    value: 'Added first',
    id: 'addedfirst',
  },
  {
    value: 'Top rated',
    id: 'toprated',
  },
  {
    value: 'Lowest rated',
    id: 'lowestrated',
  },
  {
    value: 'A - Z',
    id: 'aztype',
  },
  {
    value: 'Z - A',
    id: 'zatype',
  },
];

export const typeOptions = [
  {
    value: 'All',
    id: 'alltype',
  },
  {
    value: 'Movies',
    id: FETCH_TYPE.MOVIE,
  },
  {
    value: 'Shows',
    id: FETCH_TYPE.TV,
  },
];
