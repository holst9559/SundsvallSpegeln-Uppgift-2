export default function handleReviewForm() {
    const form = document.querySelector('.review-form');
    form.addEventListener('submit', e => {
        e.preventDefault();

        //POST form to server using fetch here
        const data = new URLSearchParams(new FormData(form));
        const currentPath = window.location.pathname;
        fetch("/api" + currentPath  + '/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  
                'token': 123
            },
            body: data,
        });

        form.reset();
    });
}

