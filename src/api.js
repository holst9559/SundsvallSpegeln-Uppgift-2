import fetch from "node-fetch";
import { screeningsShortFilter } from "./serverFilters/screeningsShort.js";

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

  //Query string ?filters=short. Get screenings the comming 5 days, max 10 screenings.
  if (query.filters === "short") {
    const filter = await screeningsShortFilter(res);
    return filter;
  } else {
    const content = await res.json();
    return content.data;
  }
}

export async function getAverageRating(movieId) {
  const res = await fetch(APIData + "/reviews?populate=movie&filters[movie]=" + movieId);
  const content = await res.json();
  const reviews = content.data;

  let averageRating = 0;
  if (reviews.length >= 5) {
    let sumOfRatings = 0;
    reviews.forEach(review => {
      sumOfRatings += review.attributes.rating;
    });
    averageRating = Math.round((sumOfRatings / reviews.length) * 10) / 10; 
  } else {
    //Fetch average rating from IMDB
    const imdbId = reviews[0].attributes.movie.data.attributes.imdbId;
    const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=6a9f2053`);
    const data = await res.json();
    averageRating = data.imdbRating;
  }

  return averageRating;
}
