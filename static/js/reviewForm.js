export default function handleReviewForm() {
    handleFormToggle();

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

        console.log(res.json());

        form.reset(); 
    });

    updateCommentIndicator();
}

function handleFormToggle() {
    const toggle = document.querySelector("#toggle-review-form");
    toggle.addEventListener('click', e => {
        const form = document.querySelector(".review-form");
        form.classList.toggle('show');
        e.target.classList.toggle('show');
    });
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


