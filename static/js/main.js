import NavMenuTrigger from "./navMenu.js";
import handleReviewForm from "./reviewForm.js";
import getReviews from "./getReviews.js";
import displayScreenings from './commingScreenings.js'


window.onload = () => {
    new NavMenuTrigger();
    handleReviewForm();
    getReviews()
    displayScreenings();
   
}

