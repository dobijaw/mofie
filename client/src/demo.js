export const initialCategories = [
  {
    value: 'Love it',
    id: 'LOVET_IT',
  },
  {
    value: 'Quite good',
    id: 'QUITE_GOOD',
  },
  {
    value: 'Never again',
    id: 'NEVER_AGAIN',
  },
  {
    value: 'Hate it',
    id: 'HATE_IT',
  },
];

export const initialCollection = [
  {
    customData: {
      category: { value: 'Never again', id: 'NEVER_AGAIN' },
      comment: 'Never!',
      rate: { value: '1', id: 'rate1' },
    },
    data: {
      genres: ['Action & Adventure', 'Drama', 'Sci-Fi & Fantasy'],
      image: 'http://image.tmdb.org/t/p/w500//nfH8SZJVOxcBlFaqqtoqS5hHizG.jpg',
      overview:
        "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
      rate: 7,
      releaseDate: '2005-03-26',
      tagline: null,
      title: 'Doctor Who',
    },
    id: 57243,
    type: 'tv',
  },
  {
    customData: {
      category: { value: 'Quite good', id: 'quitegood' },
      comment: 'Quite good!',
      rate: { value: '7', id: 'rate7' },
    },
    data: {
      genres: ['Western', 'Science Fiction'],
      image: 'http://image.tmdb.org/t/p/w500//yGNnjoIGOdQy3douq60tULY8teK.jpg',
      overview:
        'A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.',
      rate: 7,
      releaseDate: '2016-10-02',
      tagline: null,
      title: 'Westworld',
    },
    id: 63247,
    type: 'tv',
  },
  {
    customData: {
      category: { value: 'Love it', id: 'loveit' },
      comment: 'Love!',
      rate: { value: '10', id: 'rate10' },
    },
    data: {
      genres: ['Action', 'Adventure', 'Science Fiction'],
      image: 'http://image.tmdb.org/t/p/w500//jOzrELAzFxtMx2I4uDGHOotdfsS.jpg',
      overview:
        'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.',
      rate: 6.5,
      releaseDate: '2019-12-18',
      tagline: 'Every generation has a legend',
      title: 'Star Wars: The Rise of Skywalker',
    },
    id: 181812,
    type: 'movie',
  },
];
