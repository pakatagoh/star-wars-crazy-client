import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitForElement, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import * as movieService from '../../../services/movie/movieApi';
import Theme from '../../../theme/Theme';
import MoviePage from './MoviePage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Theme>
        <Router history={history}>{ui}</Router>
      </Theme>
    ),
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
    jest.spyOn(movieService, 'getMovie').mockImplementation(() => Promise.resolve(sampleMovieData));

    // To prevent error: Invariant violation <Media targetWindow> does not support 'matchMedia' when using react-media package
    // @link https://github.com/ReactTraining/react-media/issues/86
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
  });

  afterEach(() => {
    movieService.getMovie.mockRestore();
  });

  test('should display sidebar nav of star wars episodes', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    await wait(() => {
      expect(getByText(/episode 1/i)).toBeInTheDocument();
      expect(getByText(/episode 2/i)).toBeInTheDocument();
      expect(getByText(/episode 3/i)).toBeInTheDocument();
      expect(getByText(/episode 4/i)).toBeInTheDocument();
      expect(getByText(/episode 5/i)).toBeInTheDocument();
      expect(getByText(/episode 6/i)).toBeInTheDocument();
      expect(getByText(/episode 7/i)).toBeInTheDocument();
    });
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
    jest.spyOn(movieService, 'getMovie').mockImplementation(() => Promise.resolve(sampleMovieData));

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
    movieService.getMovie.mockRestore();
  });

  test('should display fixed menu button', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    await wait(() => {
      expect(getByText('Episodes')).toBeInTheDocument();
    });
  });

  test('should display nav of star wars episodes after clicking Episode Menu button', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    const [episodeMenuButton] = await waitForElement(() => [getByText('Episodes')]);

    fireEvent.click(episodeMenuButton);

    expect(getByText(/episode 1/i)).toBeInTheDocument();
    expect(getByText(/episode 2/i)).toBeInTheDocument();
    expect(getByText(/episode 3/i)).toBeInTheDocument();
    expect(getByText(/episode 4/i)).toBeInTheDocument();
    expect(getByText(/episode 5/i)).toBeInTheDocument();
    expect(getByText(/episode 6/i)).toBeInTheDocument();
    expect(getByText(/episode 7/i)).toBeInTheDocument();
  });

  test('should display close button after clicking on Episode Menu button', async () => {
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    const [episodeMenuButton] = await waitForElement(() => [getByText('Episodes')]);

    fireEvent.click(episodeMenuButton);

    expect(getByText('Close')).toBeInTheDocument();
  });
});

describe('MoviePage Component with error handling', () => {
  beforeEach(() => {
    window.matchMedia = () => ({
      matches: true,
      addListener: () => {},
      removeListener: () => {},
    });
  });

  test('should show error message if cannot find episode', () => {
    const badMatch = {
      params: {
        slug: 'episode-10',
      },
    };

    const { getByText } = renderWithRouter(<MoviePage match={badMatch} />, { route: '/movies/episode-10' });

    expect(getByText(/unable to find episode/i)).toBeInTheDocument();
  });

  test('should show error message if fetch fails', async () => {
    jest.spyOn(movieService, 'getMovie').mockImplementation(() =>
      Promise.resolve({
        error: {
          message: 'something went wrong with retrieving movie data',
        },
      })
    );
    const { getByText } = renderWithRouter(<MoviePage match={match} />, { route: '/movies/episode-1' });

    const [error] = await waitForElement(() => [getByText(/something went wrong with retrieving movie data/i)]);

    expect(error).toBeInTheDocument();
  });
});
