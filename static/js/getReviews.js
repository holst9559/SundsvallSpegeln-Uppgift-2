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

  let rating = document.createElement('p')
  rating.innerText = review.attributes.rating

  reviewsDiv.append(comment, author, rating);
}
