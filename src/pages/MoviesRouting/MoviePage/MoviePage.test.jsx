import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import * as tmdbService from '../../../components/services/movie/tmdbApi';
import MoviePage from './MoviePage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

// @link https://medium.com/@dawchihliou/testing-react-hooks-6d3ae95cd838
// simulate window resize
function fireResize(width) {
  window.innerWidth = width;
}

const sampleMovieData = {
  id: 18893,
  overview: 'This is the overview of the movie',
  release_date: '13-12-1990',
  title: 'pakata wars',
  vote_average: 6.2,
  cast: [
    {
      cast_id: 1,
      character: 'Pakata whats up',
      credit_id: '22',
      gender: 2,
      id: 33,
      name: 'Liang Hui',
      order: 0,
      profile_path: '/pakata-profile-path',
    },
    {
      cast_id: 2,
      character: 'Amidala',
      credit_id: '23452',
      gender: 1,
      id: 56,
      name: 'Natalie Portman',
      order: 1,
      profile_path: '/natalie-portman-profile',
    },
  ],
  imageSrc: `https://image.tmdb.org/t/p/w342/n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg`,
};

const match = {
  params: {
    slug: 'episode-1',
  },
};

describe('MoviePage Component', () => {
  beforeEach(() => {
    jest.spyOn(tmdbService, 'tmdbApiGetMovie').mockImplementation(() => Promise.resolve(sampleMovieData));

    // To prevent error: Invariant violation <Media targetWindow> does not support 'matchMedia' when using react-media package
    // @link https://github.com/ReactTraining/react-media/issues/86
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
  });

  afterEach(() => {
    tmdbService.tmdbApiGetMovie.mockRestore();
  });

  test('should display sidebar nav of star wars episodes', () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    expect(getByText(/episode 1/i)).toBeInTheDocument();
    expect(getByText(/episode 2/i)).toBeInTheDocument();
    expect(getByText(/episode 3/i)).toBeInTheDocument();
    expect(getByText(/episode 4/i)).toBeInTheDocument();
    expect(getByText(/episode 5/i)).toBeInTheDocument();
    expect(getByText(/episode 6/i)).toBeInTheDocument();
    expect(getByText(/episode 7/i)).toBeInTheDocument();
  });

  test('should should display a poster image', async () => {
    const { getByAltText } = renderWithRouter(<MoviePage match={match} />);

    const image = await waitForElement(() => getByAltText(sampleMovieData.title));

    expect(image).toBeInTheDocument();
  });

  test('should should display the movie title', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />);

    const title = await waitForElement(() => getByText(sampleMovieData.title));

    expect(title).toBeInTheDocument();
  });

  test('should should display the overview, release data and and vote_average', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />);

    const [overview, releaseDate, voteAverage] = await waitForElement(() => [
      getByText(sampleMovieData.overview),
      getByText(/13-12-1990/i),
      getByText(/ratings/i),
    ]);

    expect(overview).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(voteAverage).toBeInTheDocument();
  });
});

describe('MoviePage Component with viewport less than sm size', () => {
  beforeEach(() => {
    jest.spyOn(tmdbService, 'tmdbApiGetMovie').mockImplementation(() => Promise.resolve(sampleMovieData));

    // To prevent error: Invariant violation <Media targetWindow> does not support 'matchMedia' when using react-media package
    // @link https://github.com/ReactTraining/react-media/issues/86
    // @link window.matchMedia https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
    // @link test example https://github.com/ReactTraining/react-media/issues/93#issuecomment-416170644
    // @link mediaQueryList https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
    window.matchMedia = () => ({
      matches: true,
      addListener: () => {},
      removeListener: () => {},
    });
  });

  afterEach(() => {
    tmdbService.tmdbApiGetMovie.mockRestore();
  });

  test('should display fixed menu button', () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    expect(getByText('Episode Menu')).toBeInTheDocument();
  });

  test('should display nav of star wars episodes after clicking Episode Menu button', () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    const episodeMenuButton = getByText('Episode Menu');

    fireEvent.click(episodeMenuButton);

    expect(getByText(/episode 1/i)).toBeInTheDocument();
    expect(getByText(/episode 2/i)).toBeInTheDocument();
    expect(getByText(/episode 3/i)).toBeInTheDocument();
    expect(getByText(/episode 4/i)).toBeInTheDocument();
    expect(getByText(/episode 5/i)).toBeInTheDocument();
    expect(getByText(/episode 6/i)).toBeInTheDocument();
    expect(getByText(/episode 7/i)).toBeInTheDocument();
  });

  test('should display close button after clicking on Episode Menu button', () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    const episodeMenuButton = getByText('Episode Menu');

    fireEvent.click(episodeMenuButton);

    expect(getByText('Close')).toBeInTheDocument();
  });
});
