import fetch from "node-fetch";
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

  if (query !== null) {
    const filter = await screeningsFilter(payload, query.end_time, query.items);
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

  let averageRating, maxRating;
  if (reviews.length >= 5) {
    let sumOfRatings = 0;
    reviews.forEach(review => {
      sumOfRatings += review.attributes.rating;
    });
    averageRating = Math.round((sumOfRatings / reviews.length) * 10) / 10; 
    maxRating = 5;
  } else {
    //Fetch average rating from IMDB
    const imdbId = reviews[0].attributes.movie.data.attributes.imdbId;
    const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=6a9f2053`);
    const data = await res.json();
    averageRating = data.imdbRating;
    maxRating = 10;
  }

  return {
    rating: averageRating,
    maxRating: maxRating,
  };
}

// data = array of screenings, today = todays time and date in ISO format
export function filterOutOldScreenings(data, today){
 
  // run through the array and return objects containing time >= todaysTime
  const res = data.filter(comming);
    
  // currentValue is reqired parameter but not needed, index is index of current object
      function comming(currentValue, index){
        const screening = new Date(data[index].attributes.start_time);
          if(screening >= today ){
            return data[index];
          };
      };
return res;
      
         
};
  
 
  

