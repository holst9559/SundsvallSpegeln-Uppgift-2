handleRating();

async function handleRating() {
    const data = await getRating();
    renderRating(data);
}

async function getRating() {
    const pathname = window.location.pathname;
    const res = await fetch("/api" + pathname + "/ratings");
    const content = await res.json();
    return content.data;
}

function renderRating(data) {
    const container = document.querySelector(".rating-container");

    const star = document.createElement("div");
    star.classList.add("star");
    container.append(star);

    const p = document.createElement("p");
    p.classList.add("average-rating");
    p.textContent = data.rating;
    container.append(p);

    const span = document.createElement("span");
    span.textContent = "/" + data.maxRating;
    p.append(span);
}