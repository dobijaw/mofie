const collection = [
  {
    movie: {
      id: 1,
      year: '2019',
      title: 'Star Wars: Episode IX - The Rise of Skywalker',
      genres: ['Action', 'Adventure', 'Fantasy'],
      description:
        'The surviving members of the resistance face the First Order once again, and the legendary conflict between the Jedi and the Sith reaches its peak bringing the Skywalker saga to its end',
      director: ['J.J. Abrams'],
      screenplay: [
        'Chris Terrio',
        'J.J. Abrams',
        'Derek Connolly',
        'Colin Trevorrow',
      ],
      img:
        'https://thebrag.com/wp-content/uploads/2019/08/69513438_2615523778499510_9183039777094500352_n-768x420.jpg',
      cast: [
        {
          actor: 'Carrie Fisher',
          character: 'Leia Organa',
          img:
            'https://m.media-amazon.com/images/M/MV5BMjM4ODU5MDY4MV5BMl5BanBnXkFtZTgwODY1MjQ5MDI@._V1_UX214_CR0,0,214,317_AL_.jpg',
        },
        {
          actor: 'Mark Hamill',
          character: 'Luke Skywalker',
          img:
            'https://m.media-amazon.com/images/M/MV5BOGY2MjI5MDQtOThmMC00ZGIwLWFmYjgtYWU4MzcxOGEwMGVkXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_UY317_CR175,0,214,317_AL_.jpg',
        },
        {
          actor: 'Adam Driver',
          character: 'Kylo Ren',
          img:
            'https://m.media-amazon.com/images/M/MV5BOWViYjUzOWMtMzRkZi00MjNkLTk4M2ItMTVkMDg5MzE2ZDYyXkEyXkFqcGdeQXVyODQwNjM3NDA@._V1_UY317_CR44,0,214,317_AL_.jpg',
        },
        {
          actor: 'Daisy Ridley',
          character: 'Rey',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTgzMDk3MjI4OF5BMl5BanBnXkFtZTgwMzQxMDY5NjE@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'John Boyega',
          character: 'Fin',
          img:
            'https://m.media-amazon.com/images/M/MV5BMDg4NWZjNmEtZWVmNC00MzdhLTlhOTEtZmViYjdmMzhjMTAyXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'Oscar Isaac',
          character: 'Poe Dameron',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTQ2ODE2NDQ5OF5BMl5BanBnXkFtZTcwOTU3OTM1OQ@@._V1_UY317_CR5,0,214,317_AL_.jpg',
        },
      ],
    },
    opiinon: {
      category: 'love',
      rates: 10,
      comment: 'Really cool movie',
    },
  },
  {
    movie: {
      id: 2,
      year: '2015',
      title: 'Star Wars: Episode VII - The Force Awakens',
      genres: ['Action', 'Adventure', 'SciFi'],
      description:
        "Three decades after the Empire's defeat, a new threat arises in the militant First Order. Defected stormtrooper Finn and the scavenger Rey are caught up in the Resistance's search for the missing Luke Skywalker.",
      director: ['J.J. Abrams'],
      screenplay: ['Lawrence Kasdan', 'J.J. Abrams', 'Michael Arndt'],
      img:
        'https://i.pinimg.com/originals/9b/88/b5/9b88b56b4c9c116eb26f3607f229f766.jpg',
      cast: [
        {
          actor: 'Carrie Fisher',
          character: 'Leia Organa',
          img:
            'https://m.media-amazon.com/images/M/MV5BMjM4ODU5MDY4MV5BMl5BanBnXkFtZTgwODY1MjQ5MDI@._V1_UX214_CR0,0,214,317_AL_.jpg',
        },
        {
          actor: 'Mark Hamill',
          character: 'Luke Skywalker',
          img:
            'https://m.media-amazon.com/images/M/MV5BOGY2MjI5MDQtOThmMC00ZGIwLWFmYjgtYWU4MzcxOGEwMGVkXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_UY317_CR175,0,214,317_AL_.jpg',
        },
        {
          actor: 'Adam Driver',
          character: 'Kylo Ren',
          img:
            'https://m.media-amazon.com/images/M/MV5BOWViYjUzOWMtMzRkZi00MjNkLTk4M2ItMTVkMDg5MzE2ZDYyXkEyXkFqcGdeQXVyODQwNjM3NDA@._V1_UY317_CR44,0,214,317_AL_.jpg',
        },
        {
          actor: 'Daisy Ridley',
          character: 'Rey',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTgzMDk3MjI4OF5BMl5BanBnXkFtZTgwMzQxMDY5NjE@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'John Boyega',
          character: 'Fin',
          img:
            'https://m.media-amazon.com/images/M/MV5BMDg4NWZjNmEtZWVmNC00MzdhLTlhOTEtZmViYjdmMzhjMTAyXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'Oscar Isaac',
          character: 'Poe Dameron',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTQ2ODE2NDQ5OF5BMl5BanBnXkFtZTcwOTU3OTM1OQ@@._V1_UY317_CR5,0,214,317_AL_.jpg',
        },
      ],
    },
    opiinon: {
      category: 'love',
      rates: 10,
      comment: 'Really cool movie',
    },
  },
  {
    movie: {
      id: 3,
      year: '2017',
      title: 'Star Wars: Episode VIII - The Last Jedi',
      genres: ['Action', 'Adventure', 'Fantasy'],
      description:
        'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.',
      director: ['Rian Johnson'],
      screenplay: ['Rian Johnson'],
      img: 'https://wallpaperaccess.com/full/150198.jpg',
      cast: [
        {
          actor: 'Carrie Fisher',
          character: 'Leia Organa',
          img:
            'https://m.media-amazon.com/images/M/MV5BMjM4ODU5MDY4MV5BMl5BanBnXkFtZTgwODY1MjQ5MDI@._V1_UX214_CR0,0,214,317_AL_.jpg',
        },
        {
          actor: 'Mark Hamill',
          character: 'Luke Skywalker',
          img:
            'https://m.media-amazon.com/images/M/MV5BOGY2MjI5MDQtOThmMC00ZGIwLWFmYjgtYWU4MzcxOGEwMGVkXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_UY317_CR175,0,214,317_AL_.jpg',
        },
        {
          actor: 'Adam Driver',
          character: 'Kylo Ren',
          img:
            'https://m.media-amazon.com/images/M/MV5BOWViYjUzOWMtMzRkZi00MjNkLTk4M2ItMTVkMDg5MzE2ZDYyXkEyXkFqcGdeQXVyODQwNjM3NDA@._V1_UY317_CR44,0,214,317_AL_.jpg',
        },
        {
          actor: 'Daisy Ridley',
          character: 'Rey',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTgzMDk3MjI4OF5BMl5BanBnXkFtZTgwMzQxMDY5NjE@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'John Boyega',
          character: 'Fin',
          img:
            'https://m.media-amazon.com/images/M/MV5BMDg4NWZjNmEtZWVmNC00MzdhLTlhOTEtZmViYjdmMzhjMTAyXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY317_CR20,0,214,317_AL_.jpg',
        },
        {
          actor: 'Oscar Isaac',
          character: 'Poe Dameron',
          img:
            'https://m.media-amazon.com/images/M/MV5BMTQ2ODE2NDQ5OF5BMl5BanBnXkFtZTcwOTU3OTM1OQ@@._V1_UY317_CR5,0,214,317_AL_.jpg',
        },
      ],
    },
    opiinon: {
      category: 'love',
      rates: 10,
      comment: 'Really cool movie',
    },
  },
];

export default collection;
