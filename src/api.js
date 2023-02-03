import fetch from "node-fetch";
import { screeningsShortFilter } from "./serverFilters/screeningsShort.js";

const APIData = "https://plankton-app-xhkom.ondigitalocean.app/api"

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

export async function getReviews(query = '') {
    const res = await fetch(APIData + "/reviews" + query);
    const content = await res.json();
    return content.data;
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