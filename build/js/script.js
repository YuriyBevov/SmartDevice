'use strict';
/*var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');

pageHeader.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
});*/

// показ модального окна

(function () {

var ESC_KEYCODE = 27;

var modal = document.querySelector(".modal");
var modalContent = document.querySelector(".modal__wrapper");
var openBtn = document.querySelector(".nav__btn");
var closeBtn = document.querySelector(".modal__closeBtn");

var onBtnClickEvent = function (evt) {
  evt.preventDefault();
  modal.classList.remove("modal--closed");
  document.addEventListener("keydown", onPressEsc);
  modal.addEventListener("click", onOverlayClickEvent);
};

var onCloseBtnEvent = function () {
  modal.classList.add("modal--closed");
}

var onPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseBtnEvent();
    document.removeEventListener('keydown', onPressEsc);
  }
};

var onOverlayClickEvent = function (evt) {
  if(evt.target === modal) {
    modal.classList.add("modal--closed");
    modal.removeEventListener("click", onOverlayClickEvent);
  }
};

closeBtn.addEventListener("click", onCloseBtnEvent);
openBtn.addEventListener("click", onBtnClickEvent);

})();
