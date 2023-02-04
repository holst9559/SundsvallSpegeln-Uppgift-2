let reviewsDiv = document.querySelector(".reviews");
const btnContainer = document.querySelector(".reviews-btn");

let index = 0;
let pages = [];

function setUpUi() {
  showReviewsOnDom(pages[index]);
  displayButtons(btnContainer, pages, index);
}

function displayButtons(container, pages, activeIndex) {
  let btns = pages.map((_, pageIndex) => {
    return `<button class = "page-btn ${
      activeIndex === pageIndex ? "active-btn" : "null"
    }" data-index = '${pageIndex}'>${pageIndex + 1}</button>`;
  });
  btns.push('<button class="next-btn">next</button>');
  btns.unshift('<button class="prev-btn">prev</button>');

  container.innerHTML = btns.join("");
}

export default async function getReviews() {
  const currentPath = window.location.pathname;
  const res = await fetch("/api" + currentPath + "/reviews/");
  const reviews = await res.json();
  console.log("reviews", reviews);
  pages = paginate(reviews.attributes.reviews.data);
  setUpUi();
  console.log("pages", pages);
  //return showReviewsOnDom(reviews);
  //showReviewsOnDom(paginate(reviews.attributes.reviews.data)[0]);
}

function showReviewsOnDom(reviews) {
  reviews.map((review) => {
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
  });
}

function paginate(reviews) {
  console.log("paginatereviews", reviews);

  const numOfReviewsPerPage = 5;
  const numberOfPages = Math.ceil(reviews.length / numOfReviewsPerPage);
  const newReviews = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * numOfReviewsPerPage;
    return reviews.slice(start, start + numOfReviewsPerPage);
  });

  return newReviews;
}
