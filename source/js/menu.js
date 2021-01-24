var closeMobileMenu = function (mobileMenu, toggleMobileMenuButton) {
  mobileMenu[0].classList.add("main-navigation__list--mobile-closed");
  toggleMobileMenuButton[0].classList.remove("main-navigation__toggle--opened");
  toggleMobileMenuButton[0].classList.add("main-navigation__toggle--closed");
}

var openMobileMenu = function (mobileMenu, toggleMobileMenuButton) {
  mobileMenu[0].classList.remove("main-navigation__list--mobile-closed");
  toggleMobileMenuButton[0].classList.remove("main-navigation__toggle--closed");
  toggleMobileMenuButton[0].classList.add("main-navigation__toggle--opened");
}

var toggleMobileMenu = function () {
  var toggleMobileMenuButton = document.getElementsByClassName("main-navigation__toggle");
  var mobileMenu = document.getElementsByClassName("main-navigation__list");
  var isMenuClosed = mobileMenu[0].classList.contains("main-navigation__list--mobile-closed");

  if(isMenuClosed) {
    openMobileMenu(mobileMenu, toggleMobileMenuButton);
  } else {
    closeMobileMenu(mobileMenu, toggleMobileMenuButton);
  }
}

var initMobileMenu = function () {
  var toggleMobileMenuButton = document.getElementsByClassName("main-navigation__toggle");
  toggleMobileMenuButton[0].classList.remove("main-navigation__toggle--hidden");
  toggleMobileMenuButton[0].addEventListener("click", toggleMobileMenu);
}

initMobileMenu();
