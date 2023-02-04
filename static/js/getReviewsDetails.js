let reviewsDiv = document.querySelector(".reviews");

export default async function getReviews() {
  const currentPath = window.location.pathname;
  const res = await fetch("/api" + currentPath + "/reviews/");
  const reviews = await res.json();
  paginate(reviews);

  reviews.attributes.reviews.data.map((review) => {
    return showReviewsOnDom(review);
    
  });

  console.log("reviews", reviews);

  //console.log("Page location is " + window.location.href);
  return reviews;
}

function showReviewsOnDom(review) {
  let comment = document.createElement("p");
  comment.innerText = review.attributes.comment;

  let author = document.createElement("small");
  author.innerText = review.attributes.author;

  const rating = document.createElement("ul");
  rating.role = "meter";
  rating.ariaLabel = "rating";
  rating.ariaValueMin = 0;
  rating.ariaValueMax = 5;
  rating.ariaValueNow = review.attributes.rating;
  rating.ariaValueText = `${review.attributes.rating} out of 5`;
  rating.classList.add("rating");
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("li");
    star.classList.add("rating-star");

    if (i <= review.attributes.rating) {
      star.classList.add("active");
    }

    rating.append(star);
  }

  reviewsDiv.append(comment, author, rating);
}


function paginate(reviews) {
  console.log("paginatereviews", reviews);

  const numOfReviewsPerPage = 5;
  const numberOfPages = Math.ceil(
    reviews.attributes.reviews.data.length / numOfReviewsPerPage
  );
  const newReviews = Array.from({ length: numberOfPages }, (index) => {
    const start = index * numOfReviewsPerPage;
    return reviews.attributes.reviews.data.slice(start, start + numOfReviewsPerPage);
  });

  return newReviews;
}
