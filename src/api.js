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

<<<<<<< HEAD
export async function getReviews() {
    const res = await fetch(APIData + "/reviews");
    const content = await res.json();
    return content.data;
}

export async function postReview(review, verified = false) {
    const res = await fetch(APIData + "/reviews", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
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

    const resData = await res.json();
    return resData;
}

export async function getScreenings() {
    const res = await fetch(APIData + "/screenings");
=======
export async function getScreenings(query = '') {
    const res = await fetch(APIData + "/screenings" + query);
>>>>>>> 47872d4f22b69c864154a25b3355864379ac980c
    const content = await res.json();
    return content.data;
}


