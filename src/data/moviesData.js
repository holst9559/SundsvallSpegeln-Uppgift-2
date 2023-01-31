import fetch from "node-fetch";

const APIData = "https://plankton-app-xhkom.ondigitalocean.app/api"

export async function getMovies() {
    const res = await fetch(APIData + "/movies")
    const content = await res.json();
    return content.data;
}

export async function getMovie(id) {
    const res = await fetch(APIData + "/movies/" + id);
    const content = await res.json();
    return content.data;
}

export default async function getData() {
    const res = await fetch(APIData + "/movies")
    const content = await res.json();
    return content.data;
}
