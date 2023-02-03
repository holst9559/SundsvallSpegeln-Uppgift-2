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

export async function getReviews(id) {
    const res = await fetch(
        APIDATA + `/movies/${id}/?populate=reviews`
      );
      const info = await res.json();
      const reviewsData = info.data;
      console.log(reviewsData);
    
     const reviewInfo = {
        id: reviewsData.id,
        title: reviewsData.attributes.title,
        intro: reviewsData.attributes.intro,
        image: reviewsData.attributes.image.url,
        reviews: reviewsData.attributes.reviews,
   
      };
      return reviewInfo
    }


export async function postReview(review, verified = false) {
    const res = await fetch(APIData + "/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "data": {
                "comment": review.comment,
                "rating": review.rating,
                "author": review.author,
                "verified": verified,
                "movie": review.movie,
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),  
            }
        })
    });

    return res.json();
}

export async function getScreenings(query = '') {
    const res = await fetch(APIData + "/screenings?populate=movie");

    //Query string ?filters=short. Get screenings the comming 5 days, max 10 screenings.
    if (query.filters === "short") {
        const filter = await screeningsShortFilter(res);
        return filter
    }
    else {
        const content = await res.json();
        return content.data;
    }
}