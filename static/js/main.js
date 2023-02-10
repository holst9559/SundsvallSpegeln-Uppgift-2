import NavMenuTrigger from "./navMenu.js";
import displayScreenings from './commingScreenings.js'
window.onload = () => {
    new NavMenuTrigger();
    displayScreenings();
}

