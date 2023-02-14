import fetch from "node-fetch";
import movieScreenings from "./serverFilters/movieScreenings.js";
import screeningsFilter from "./serverFilters/screeningsFilter.js";
import apiAdapter from "./apiAdapter.js";

const APIData = "https://plankton-app-xhkom.ondigitalocean.app/api";

export async function getMovies() {
  const res = await fetch(APIData + "/movies");
  const content = await res.json();
  return content.data;
}

export async function getMovie(id) {
  const res = await fetch(APIData + "/movies/" + id);
  const content = await res.json();
  return content.data;
}

export async function getReviews(movieId, pageSize, page) {
  const res = await fetch(
    APIData +
      `/reviews?filters[movie]=${movieId}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`
  );

  const info = await res.json();
  const reviewsData = info.data;
  return reviewsData;
}

export async function getScreeningsById(id) {
    const res = await fetch(APIData + "/screenings?filters[movie]=" + id);
    const content = await res.json();
    return content.data;
}
export async function postReview(review, verified = false) {
  const res = await fetch(APIData + "/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        comment: review.comment,
        rating: review.rating,
        author: review.author,
        verified: verified,
        movie: review.movie,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
  });

  return res.json();
}

export async function getScreenings(query = "") {
  const res = await fetch(APIData + "/screenings?populate=movie");
  const payload = await res.json();
  if (typeof query.items === "string") {
    const filter = await screeningsFilter(payload, query.end_time, query.items);
    return filter;
  } else if (typeof query === "number") {
    const filter = await movieScreenings(payload, query);
    return filter;
  } else {
    return payload.data;
  }
}
export async function getAverageRating(movieId) {
  const res = await fetch(
    APIData + "/reviews?populate=movie&filters[movie]=" + movieId
  );
  const content = await res.json();
  const reviews = content.data;
=======
export async function getAverageRating(
  movieId,
  imdbId,
  api1 = apiAdapter.loadSelectedRatings(movieId),
  api2 = apiAdapter.loadIMDBRating(imdbId)
) {
  const reviewList = await api1;
  const imdbRes = await api2;
  const reviews = reviewList.data;


  let averageRating, maxRating;

  if (reviews.length >= 5) {
    let sumOfRatings = 0;
    reviews.forEach((review) => {
      sumOfRatings += review.attributes.rating;
    });

    averageRating = Math.round((sumOfRatings / reviews.length) * 10) / 10;
    maxRating = 5;
  } else {
    //Fetch average rating from IMDB
    const imdbId = reviews[0].attributes.movie.data.attributes.imdbId;
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=6a9f2053`
    );
    const data = await res.json();
    averageRating = data.imdbRating;
=======
    averageRating = sumOfRatings / reviews.length;
    maxRating = 5;
  } else {
    averageRating = imdbRes;

    maxRating = 10;
  }

  let results = {
    rating: averageRating,
    maxRating: maxRating,
  };
  return results;
}

export async function getSingleMovieReview(
  movieId,
  reviewId,
  api = apiAdapter.loadSelectedRatings(movieId)
) {
  const reviews = await api;
  const reviewsList = reviews.data;
  const reviewArray = [];

  reviewsList.forEach((rev) => {
    if (rev.id == reviewId) {
      reviewArray.push(rev);
    }
  });

  if (reviewArray.length == 0) {
    reviewArray.push("404 Not Found");
    return reviewArray;
  } else {
    return reviewArray;
  }
}

const mockData1 = {
  data: [
    {
      id: 124,
      attributes: {
        comment: "hejsan",
        rating: 3,
        author: "review namn",
        verified: true,
        createdAt: "2023-02-10T08:40:39.581Z",
        updatedAt: "2023-02-10T08:40:39.581Z",
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
      id: 139,
      attributes: {
        comment: "aaaaaaaaa",
        rating: 2,
        author: "aaaaa aaaaaa",
        verified: true,
        createdAt: "2023-02-10T08:43:33.513Z",
        updatedAt: "2023-02-10T08:43:33.513Z",
      },
    },
    {
      id: 110,
      attributes: {
        comment: "cxv",
        rating: 2,
        author: "dfg sdfg",
        verified: true,
        createdAt: "2023-02-10T08:32:49.728Z",
        updatedAt: "2023-02-10T08:32:49.728Z",
      },
    },
    {
      id: 171,
      attributes: {
        comment: "Very nice movie",
        rating: 4,
        author: null,
        verified: false,
        createdAt: "2023-02-11T17:43:33.889Z",
        updatedAt: "2023-02-11T17:43:33.889Z",
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 14,
      total: 68,
    },
  },
};

const mockData2 = {
  data: [
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
    {
      id: 28,
      attributes: {
        comment: "Review utan namn",
        rating: 0,
        author: "Richard",
        verified: null,
        createdAt: "2023-02-02T13:25:22.837Z",
        updatedAt: "2023-02-02T13:25:22.837Z",
      },
    },
    {
      id: 121,
      attributes: {
        comment: "dfgdfg",
        rating: 1,
        author: "dfg dfg",
        verified: true,
        createdAt: "2023-02-10T08:38:48.428Z",
        updatedAt: "2023-02-10T08:38:48.428Z",
      },
    },
    {
      id: 189,
      attributes: {
        comment: "Great",
        rating: 5,
        author: "Henry",
        verified: false,
        createdAt: "2023-02-11T20:01:33.801Z",
        updatedAt: "2023-02-11T20:01:33.801Z",
      },
    },
    {
      id: 98,
      attributes: {
        comment: "Not bad. Would watch it again.",
        rating: 4,
        author: "Stefan Lindgren",
        verified: false,
        createdAt: "2023-02-08T22:32:58.782Z",
        updatedAt: "2023-02-08T22:32:58.782Z",
      },
    },
  ],
  meta: {
    pagination: {
      page: 2,
      pageSize: 5,
      pageCount: 14,
      total: 68,
    },
  },
};
