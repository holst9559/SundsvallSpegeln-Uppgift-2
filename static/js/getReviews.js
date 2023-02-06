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
    }" data-index = "${pageIndex}">${pageIndex + 1}</button>`;
  });
  btns.push('<button class="next-btn">next</button>');
  btns.unshift('<button class="prev-btn">prev</button>');

  container.innerHTML = btns.join("");
}

btnContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("reviews-btn")) return;
  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index);
  }
  if (e.target.classList.contains("next-btn")) {
    index++;
    if (index > pages.length - 1) {
      index = 0;
    }
  }

  if (e.target.classList.contains("prev-btn")) {
    index--;
    console.log("previndex", index);
    if (index < 0) {
      index = pages;
    }
  }
  setUpUi();
});

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
    let list = document.createElement("li");
    let comment = document.createElement("p");
    comment.innerText = review.attributes.comment;

    let authorDiv = document.createElement("div");
    authorDiv.classList.add("author");

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
    authorDiv.append(author, rating);
    list.append(authorDiv, comment);
    reviewsDiv.appendChild(list);
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
