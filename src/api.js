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
    console.log("test");
    const filter = await movieScreenings(payload, query);
    return filter;
  } else {
    return payload.data;
  }
}

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
