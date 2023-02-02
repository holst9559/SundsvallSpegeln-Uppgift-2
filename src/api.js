import fetch from "node-fetch";

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
    const res = await fetch(APIData + "/screenings" + query);
    const content = await res.json();
    return content.data;
}
