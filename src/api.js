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
    const res = await fetch(APIData + "/screenings?populate=movie");
    if (query.filters === "short" || query === "/homepage") {
        const content = await res.json();
        let data = content.data;
        let screeningArray = [];
        let filteredArray = [];
        let shortArray = [];

        const todaysDate = new Date().toISOString();
        const fiveDays = new Date();

        fiveDays.setDate(new Date().getDate() + 4);

        const fiveDaysFilter = fiveDays.toISOString();

        for (let i = 0; i < data.length; i++) {
            screeningArray.push(data[i]);
        }

        filteredArray = screeningArray.filter(data => { 
            return data.attributes.start_time > todaysDate
             && data.attributes.start_time < fiveDaysFilter
        });

        for (let j = 0; j < filteredArray.length; j++) {
            if (shortArray.length <= 9 ) {
                shortArray.push(filteredArray[j]);
            }
            else {
                break;
            }
        }
        return shortArray;
    }
    else {
        const content = await res.json();
        return content.data;
    }
}