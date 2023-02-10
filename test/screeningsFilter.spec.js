import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

import screeningsFilter from "../src/serverFilters/screeningsFilter.js";

const mockDate = Date.parse("2023-02-02T17:00:00.000Z"); //Static Date for test reference
const mockDateFive = Date.parse("2023-02-07T00:00:00.000Z");

//Mocks for query strings input
const mockQuery = {
  end_time: "5",
  items: "10",
};

describe("screeningsFilter()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(Date.parse(new Date("2023-02-02T17:00:00.000Z")));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("Should return max 10 items", async () => {
    const result = await screeningsFilter(
      mockRes,
      mockQuery.end_time,
      mockQuery.items
    );
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test("Should return all screenings in the coming 5 days", async () => {
    const result = await screeningsFilter(
      mockRes,
      mockQuery.end_time,
      mockQuery.items
    );
    expect(Date.parse(result[0].attributes.start_time)).toBeGreaterThanOrEqual(
      mockDate
    );
    expect(
      Date.parse(result.slice(-1)[0].attributes.start_time)
    ).toBeGreaterThanOrEqual(mockDate);
    expect(Date.parse(result.slice(-1)[0].attributes.start_time)).toBeLessThan(
      mockDateFive
    );
  });

  test("Combined screening test", async () => {
    const result = await screeningsFilter(
      mockRes,
      mockQuery.end_time,
      mockQuery.items
    );
    expect(result.length).toBe(10);
    expect(result[0].attributes.start_time).toBe("2023-02-02T19:00:00.000Z");
    expect(Date.parse(result[0].attributes.start_time)).toBeGreaterThanOrEqual(
      mockDate
    );
    expect(result[9].attributes.start_time).toBe("2023-02-06T19:00:00.000Z");
    expect(Date.parse(result[9].attributes.start_time)).toBeLessThan(
      mockDateFive
    );
  });
});

//Static API response for test reference
const mockRes = {
  data: [
    {
      id: 1,
      attributes: {
        start_time: "2023-02-01T17:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:02.786Z",
        updatedAt: "2023-01-31T04:27:02.786Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        start_time: "2023-02-02T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:03.776Z",
        updatedAt: "2023-01-31T04:27:03.776Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 3,
      attributes: {
        start_time: "2023-02-02T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:04.047Z",
        updatedAt: "2023-01-31T04:27:04.047Z",
        movie: {
          data: {
            id: 1,
            attributes: {
              title: "Isle of dogs",
              imdbId: "tt5104604",
              intro:
                "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
              },
              createdAt: "2023-01-23T05:58:58.110Z",
              updatedAt: "2023-01-27T07:11:53.523Z",
              publishedAt: "2023-01-23T06:01:31.679Z",
            },
          },
        },
      },
    },
    {
      id: 4,
      attributes: {
        start_time: "2023-02-03T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:04.291Z",
        updatedAt: "2023-01-31T04:27:04.291Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 5,
      attributes: {
        start_time: "2023-02-03T17:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:04.532Z",
        updatedAt: "2023-01-31T04:27:04.532Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 6,
      attributes: {
        start_time: "2023-02-03T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:04.797Z",
        updatedAt: "2023-01-31T04:27:04.797Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 7,
      attributes: {
        start_time: "2023-02-04T17:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:05.473Z",
        updatedAt: "2023-01-31T04:27:05.473Z",
        movie: {
          data: {
            id: 1,
            attributes: {
              title: "Isle of dogs",
              imdbId: "tt5104604",
              intro:
                "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
              },
              createdAt: "2023-01-23T05:58:58.110Z",
              updatedAt: "2023-01-27T07:11:53.523Z",
              publishedAt: "2023-01-23T06:01:31.679Z",
            },
          },
        },
      },
    },
    {
      id: 8,
      attributes: {
        start_time: "2023-02-04T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:05.702Z",
        updatedAt: "2023-01-31T04:27:05.702Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
    {
      id: 9,
      attributes: {
        start_time: "2023-02-05T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:06.146Z",
        updatedAt: "2023-01-31T04:27:06.146Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 10,
      attributes: {
        start_time: "2023-02-05T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:06.843Z",
        updatedAt: "2023-01-31T04:27:06.843Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
    {
      id: 11,
      attributes: {
        start_time: "2023-02-06T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:07.487Z",
        updatedAt: "2023-01-31T04:27:07.487Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 12,
      attributes: {
        start_time: "2023-02-07T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:08.513Z",
        updatedAt: "2023-01-31T04:27:08.513Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 13,
      attributes: {
        start_time: "2023-02-08T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:08.770Z",
        updatedAt: "2023-01-31T04:27:08.770Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 14,
      attributes: {
        start_time: "2023-02-08T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:09.429Z",
        updatedAt: "2023-01-31T04:27:09.429Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 15,
      attributes: {
        start_time: "2023-02-09T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:10.332Z",
        updatedAt: "2023-01-31T04:27:10.332Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
    {
      id: 16,
      attributes: {
        start_time: "2023-02-10T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:10.585Z",
        updatedAt: "2023-01-31T04:27:10.585Z",
        movie: {
          data: {
            id: 1,
            attributes: {
              title: "Isle of dogs",
              imdbId: "tt5104604",
              intro:
                "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
              },
              createdAt: "2023-01-23T05:58:58.110Z",
              updatedAt: "2023-01-27T07:11:53.523Z",
              publishedAt: "2023-01-23T06:01:31.679Z",
            },
          },
        },
      },
    },
    {
      id: 17,
      attributes: {
        start_time: "2023-02-10T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:11.016Z",
        updatedAt: "2023-01-31T04:27:11.016Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
    {
      id: 18,
      attributes: {
        start_time: "2023-02-10T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:11.253Z",
        updatedAt: "2023-01-31T04:27:11.253Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
    {
      id: 19,
      attributes: {
        start_time: "2023-02-11T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:11.468Z",
        updatedAt: "2023-01-31T04:27:11.468Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 20,
      attributes: {
        start_time: "2023-02-11T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:11.886Z",
        updatedAt: "2023-01-31T04:27:11.886Z",
        movie: {
          data: {
            id: 4,
            attributes: {
              title: "Min granne Totoro",
              imdbId: "tt0096283",
              intro:
                "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T09:15:23.153Z",
              updatedAt: "2023-01-27T07:12:08.242Z",
              publishedAt: "2023-01-23T09:15:43.382Z",
            },
          },
        },
      },
    },
    {
      id: 21,
      attributes: {
        start_time: "2023-02-13T17:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:13.363Z",
        updatedAt: "2023-01-31T04:27:13.363Z",
        movie: {
          data: {
            id: 1,
            attributes: {
              title: "Isle of dogs",
              imdbId: "tt5104604",
              intro:
                "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
              },
              createdAt: "2023-01-23T05:58:58.110Z",
              updatedAt: "2023-01-27T07:11:53.523Z",
              publishedAt: "2023-01-23T06:01:31.679Z",
            },
          },
        },
      },
    },
    {
      id: 22,
      attributes: {
        start_time: "2023-02-14T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:14.053Z",
        updatedAt: "2023-01-31T04:27:14.053Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 23,
      attributes: {
        start_time: "2023-02-14T19:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:14.475Z",
        updatedAt: "2023-01-31T04:27:14.475Z",
        movie: {
          data: {
            id: 3,
            attributes: {
              title: "The Shawshank Redemption",
              imdbId: "tt0111161",
              intro:
                "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
              },
              createdAt: "2023-01-23T07:17:34.923Z",
              updatedAt: "2023-01-27T07:12:24.582Z",
              publishedAt: "2023-01-23T07:17:39.384Z",
            },
          },
        },
      },
    },
    {
      id: 24,
      attributes: {
        start_time: "2023-02-14T21:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:14.727Z",
        updatedAt: "2023-01-31T04:27:14.727Z",
        movie: {
          data: {
            id: 1,
            attributes: {
              title: "Isle of dogs",
              imdbId: "tt5104604",
              intro:
                "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
              },
              createdAt: "2023-01-23T05:58:58.110Z",
              updatedAt: "2023-01-27T07:11:53.523Z",
              publishedAt: "2023-01-23T06:01:31.679Z",
            },
          },
        },
      },
    },
    {
      id: 25,
      attributes: {
        start_time: "2023-02-15T12:00:00.000Z",
        room: "Stora salongen",
        createdAt: "2023-01-31T04:27:14.976Z",
        updatedAt: "2023-01-31T04:27:14.976Z",
        movie: {
          data: {
            id: 2,
            attributes: {
              title: "Encanto",
              imdbId: "tt2953050",
              intro:
                "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
              image: {
                url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
              },
              createdAt: "2023-01-23T06:46:24.765Z",
              updatedAt: "2023-01-27T07:11:39.088Z",
              publishedAt: "2023-01-23T06:46:29.324Z",
            },
          },
        },
      },
    },
  ],
};
