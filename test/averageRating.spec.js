import { describe, expect, test } from "@jest/globals";
import { getAverageRating } from "../src/api";

const mockId = 2;
const mockImdb = "tt2953050";
const mockImdbRating = 7.8;

//Function to calculate average rating
function mockMath(mockRating, mockImdbRating) {
  if (mockRating.data.length >= 5) {
    let sumOfAll = 0;
    const mockData = mockRating.data;

    mockData.forEach((int) => {
      sumOfAll += int.attributes.rating;
    });
    const mockAnswer = sumOfAll / mockRating.data.length;
    return mockAnswer;
  } else {
    return mockImdbRating;
  }
}

describe("ratingFilterTest()", () => {
  test("Average rating from user reviews", async () => {
    const result = await getAverageRating(
      mockId,
      mockImdb,
      mockRating,
      mockImdbRating
    );
    expect(mockRating.data.length).toBeGreaterThan(5);
    expect(result.rating).toBe(mockMath(mockRating, mockImdbRating));
  });

  test("IMDB reviews fetch", async () => {
    const result = await getAverageRating(
      mockId,
      mockImdb,
      mockRatingShort,
      mockImdbRating
    );
    expect(mockRatingShort.data.length).toBeLessThan(5);
    expect(result.rating).toBe(mockMath(mockRatingShort, mockImdbRating));
  });
});

const mockRating = {
  data: [
    {
      id: 95,
      attributes: {
        comment: "Trevlig disney!",
        rating: 4,
        author: "Nils Holgersson",
        verified: true,
        createdAt: "2023-02-08T21:36:38.188Z",
        updatedAt: "2023-02-08T21:36:38.188Z",
      },
    },
    {
      id: 63,
      attributes: {
        comment: "Worth watching!",
        rating: 4,
        author: "Lisa",
        verified: false,
        createdAt: "2023-02-06T19:40:13.851Z",
        updatedAt: "2023-02-06T19:40:13.851Z",
      },
    },
    {
      id: 55,
      attributes: {
        comment: "Not appropriate for kids",
        rating: 1,
        author: "yve",
        verified: false,
        createdAt: "2023-02-06T06:53:53.235Z",
        updatedAt: "2023-02-06T06:53:53.235Z",
      },
    },
    {
      id: 3,
      attributes: {
        comment: "i love the movie",
        rating: 4,
        author: "yve",
        verified: true,
        createdAt: "2023-01-31T09:01:56.535Z",
        updatedAt: "2023-01-31T09:01:56.535Z",
      },
    },
    {
      id: 74,
      attributes: {
        comment: "För lite prutt humor",
        rating: 2,
        author: "Ankan",
        verified: false,
        createdAt: "2023-02-07T10:40:40.546Z",
        updatedAt: "2023-02-07T10:40:40.546Z",
      },
    },
    {
      id: 27,
      attributes: {
        comment: "Test av cookies",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T13:21:39.914Z",
        updatedAt: "2023-02-02T13:21:39.914Z",
      },
    },
    {
      id: 4,
      attributes: {
        comment: "Bra film, men för låga tonarter för sångarens röst!",
        rating: 3,
        author: "Alice",
        verified: true,
        createdAt: "2023-02-01T01:57:53.261Z",
        updatedAt: "2023-02-01T01:57:53.261Z",
      },
    },
    {
      id: 19,
      attributes: {
        comment: "Jättebra film!",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T12:24:12.887Z",
        updatedAt: "2023-02-02T12:24:12.887Z",
      },
    },
  ],
};

const mockRatingShort = {
  data: [
    {
      id: 95,
      attributes: {
        comment: "Trevlig disney!",
        rating: 4,
        author: "Nils Holgersson",
        verified: true,
        createdAt: "2023-02-08T21:36:38.188Z",
        updatedAt: "2023-02-08T21:36:38.188Z",
      },
    },
    {
      id: 63,
      attributes: {
        comment: "Worth watching!",
        rating: 4,
        author: "Lisa",
        verified: false,
        createdAt: "2023-02-06T19:40:13.851Z",
        updatedAt: "2023-02-06T19:40:13.851Z",
      },
    },
    {
      id: 4,
      attributes: {
        comment: "Bra film, men för låga tonarter för sångarens röst!",
        rating: 3,
        author: "Alice",
        verified: true,
        createdAt: "2023-02-01T01:57:53.261Z",
        updatedAt: "2023-02-01T01:57:53.261Z",
      },
    },
    {
      id: 19,
      attributes: {
        comment: "Jättebra film!",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T12:24:12.887Z",
        updatedAt: "2023-02-02T12:24:12.887Z",
      },
    },
  ],
};
