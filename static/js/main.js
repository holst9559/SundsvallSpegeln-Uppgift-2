import NavMenuTrigger from "./navMenu.js";
import handleReviewForm from "./reviewForm.js";
import getReviews from "./getReviews.js";



window.onload = () => {
    new NavMenuTrigger();
    handleReviewForm();
    getReviews()
  
   
}

