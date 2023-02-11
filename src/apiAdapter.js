import fetch from "node-fetch";

const APIData = "https://plankton-app-xhkom.ondigitalocean.app/api";

//Return movieId
const apiAdapter = {
  loadSelectedRatings: async (movieId) => {
    const res = await fetch(
      APIData + "/reviews?populate=movie&filters[movie]=" + movieId
    );

    const payload = await res.json();
    return payload;
  },

  //Return IMDB rating based on movie ID
  loadIMDBRating: async (imdbId) => {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=6a9f2053`
    );
    const payload = await res.json();
    return payload;
  },
};

export default apiAdapter;
