import fetch from "node-fetch";
import movieScreenings from "./serverFilters/movieScreenings.js";
import screeningsFilter from "./serverFilters/screeningsFilter.js";

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

export async function getSingleMovieReview(movieId, id) {
  const res = await fetch(APIData + "/reviews?filters[movie]=" + movieId);
  const payload = await res.json();
  const payloadArray = payload.data;
  const resArray = [];
  const choiceArray = ["Choose from following review id's"];

  payloadArray.forEach((i) => {
    choiceArray.push(i.id);
    if (i.id == id) {
      resArray.push(i);
    }
  });
  if (resArray.length !== 0) {
    return resArray;
  } else {
    return choiceArray;
  }
}
