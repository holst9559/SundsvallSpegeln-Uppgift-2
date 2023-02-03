import fetch from "node-fetch";

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

export async function getReviews(query = "") {
    const res = await fetch(APIData + "/reviews" + query);
    const content = await res.json();
    return content.data;
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

    const data = await res.json();
    return data;
}

export async function getScreenings(query = "") {
    const res = await fetch(APIData + "/screenings" + query);
    const content = await res.json();
    return content.data;
}


