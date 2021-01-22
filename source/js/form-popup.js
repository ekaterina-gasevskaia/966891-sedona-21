var openPopupSuccessfully = function () {
  var popupSuccessfully = document.getElementsByClassName("page-form__popup--successfully");
  popupSuccessfully[0].classList.remove("page-form__popup--closed");
}

var closePopupSuccessfully= function () {
  var popupSuccessfully = document.getElementsByClassName("page-form__popup--successfully");
  popupSuccessfully[0].classList.add("page-form__popup--closed");
}

var openPopupError = function () {
  var popupError = document.getElementsByClassName("page-form__popup--error");
  popupError[0].classList.remove("page-form__popup--closed");
}

var closePopupError = function () {
  var popupError = document.getElementsByClassName("page-form__popup--error");
  popupError[0].classList.add("page-form__popup--closed");
}

var formSubmit = function (e) {
  e.preventDefault();
  var pageForm = document.getElementsByClassName("page-form");
  var XHR = new XMLHttpRequest();

  XHR.addEventListener("load", openPopupSuccessfully);
  XHR.addEventListener("error", openPopupError);
  XHR.open( pageForm[0].getAttribute("method"), pageForm[0].getAttribute("action"));

  var formData = new FormData(pageForm[0]);
  XHR.send(formData);
}

var bindEvents = function () {
  var pageForm = document.getElementsByClassName("page-form");
  pageForm[0].addEventListener("submit", formSubmit);

  var pageFormButtonSuccessfully = document.getElementsByClassName("page-form__button-successfully");
  pageFormButtonSuccessfully[0].addEventListener("click", closePopupSuccessfully);

  var pageFormButtonError = document.getElementsByClassName("page-form__button-error");
  pageFormButtonError[0].addEventListener("click", closePopupSuccessfully);
}

bindEvents();
