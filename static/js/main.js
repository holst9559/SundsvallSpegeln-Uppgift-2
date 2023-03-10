import NavMenuTrigger from "./navMenu.js";
import displayScreenings from "./commingScreenings.js";
window.onload = () => {
  new NavMenuTrigger();
  if (window.location.pathname == "/homepage") {
    return;
  } else {
    displayScreenings();
  }
};
