let reviewsDiv = document.querySelector(".reviews");

export default async function getReviews() {
  const currentPath = window.location.pathname;
  const res = await fetch("/api" + currentPath + "/reviews");
  const reviews = await res.json();

  reviews.attributes.reviews.data.map((review) => {
    return showReviewsOnDom(review);
  });

  console.log("reviews", reviews);
  console.log(
    "firstReview",
    reviews.attributes.reviews.data[0].attributes.comment
  );
  //console.log("Page location is " + window.location.href);
  return reviews;
}

function showReviewsOnDom(review) {
  let comment = document.createElement("p");
  comment.innerText = review.attributes.comment;

  let author = document.createElement("small");
  author.innerText = review.attributes.author;

  /* let rating = document.createElement('p')
  rating.innerText = review.attributes.rating */

  const rating = document.createElement('ul');
        rating.role = 'meter';
        rating.ariaLabel = 'rating';
        rating.ariaValueMin = 0;
        rating.ariaValueMax = 5;
        rating.ariaValueNow = review.attributes.rating;
        rating.ariaValueText = `${review.attributes.rating} out of 5`;
        rating.classList.add('rating');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('li');
            star.classList.add('rating-star');

            if (i <= review.attributes.rating) {
                star.classList.add('active');
            }

            rating.append(star);
        }

    reviewsDiv.append(comment, author, rating);
}
