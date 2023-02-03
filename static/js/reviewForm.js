export default function handleReviewForm() {

    const toggle = document.querySelector("#toggle-review-form");
    toggle.addEventListener("click", () => {
        showModal();
    });

    document.body.addEventListener("click", e => { //Hide modal when clicking outside of review-form
        if (e.target.classList.contains("modal-container") && !e.target.classList.contains("toggle-review-form")) {
            hideModal();
        }
    });

    const form = document.querySelector(".review-form");
    form.addEventListener("submit", async e => {
        e.preventDefault();

        //POST form to server using fetch here
        const data = new URLSearchParams(new FormData(form));
        const currentPath = window.location.pathname;
        const res = await fetch("/api" + currentPath  + "/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",  
            },
            body: data,
        });

        form.reset(); 
        hideModal();
    });

    updateCommentIndicator();
    updateRatingIndicator();
}

function showModal() {
    const modal = document.querySelector(".modal-container");
    const toggle = document.querySelector("#toggle-review-form");
    modal.classList.add("show");  
    toggle.classList.remove("show");   
}

function hideModal() {
    const modal = document.querySelector(".modal-container");
    const toggle = document.querySelector("#toggle-review-form");
    modal.classList.remove("show");  
    toggle.classList.add("show");   
}

function updateCommentIndicator() {
    const comment = document.querySelector(".review-form__comment");
    const indicator = document.querySelector(".comment-length");
    indicator.textContent = "Max antal tecken: " + (comment.maxLength - comment.value.length);
    comment.addEventListener("input", e => {
        const charAmount = comment.maxLength - comment.value.length;
        indicator.textContent = "Max antal tecken: " + charAmount;
    });
}

function updateRatingIndicator() {
    const rating = document.querySelector(".rating");
    const indicator = document.querySelector(".rating-indicator");
    const stars = document.querySelector('.rating').childNodes;
    stars.forEach(star => {
        if (star.checked) {
            indicator.textContent = star.value;
            return;
        }
    });

    rating.addEventListener("change", e => {
        indicator.textContent = e.target.value;
    });
}

