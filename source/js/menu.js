var closeMobileMenu = function (mobileMenu, toggleMobileMenuButton) {
  mobileMenu[0].classList.add("main-navigation--mobile-closed");
  toggleMobileMenuButton[0].classList.remove("page-header__toggle--opened");
  toggleMobileMenuButton[0].classList.add("page-header__toggle--closed");
}

var openMobileMenu = function (mobileMenu, toggleMobileMenuButton) {
  mobileMenu[0].classList.remove("main-navigation--mobile-closed");
  toggleMobileMenuButton[0].classList.remove("page-header__toggle--closed");
  toggleMobileMenuButton[0].classList.add("page-header__toggle--opened");
}

var toggleMobileMenu = function () {
  var toggleMobileMenuButton = document.getElementsByClassName("page-header__toggle");
  var mobileMenu = document.getElementsByClassName("main-navigation");
  var isMenuClosed = mobileMenu[0].classList.contains("main-navigation--mobile-closed");

  if(isMenuClosed) {
    openMobileMenu(mobileMenu, toggleMobileMenuButton);
  } else {
    closeMobileMenu(mobileMenu, toggleMobileMenuButton);
  }
}

var toggleMobileMenuButton = document.getElementsByClassName("page-header__toggle");
toggleMobileMenuButton[0].addEventListener("click", toggleMobileMenu);
