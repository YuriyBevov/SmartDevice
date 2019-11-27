'use strict';
/* var pageHeader = document.querySelector('.page-header');
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
}); */

// показ модального окна

(function () {

  var ESC_KEYCODE = 27;

  var modal = document.querySelector('.modal');
  var openBtn = document.querySelector('.nav__btn');
  var closeBtn = document.querySelector('.modal__closeBtn');

  var name = document.querySelector('.modal__name');
  var phone = document.querySelector('.modal__phone');
  var text = document.querySelector('.modal__text');

  var setFocus = function () {
    document.querySelector('.modal__name').focus();
  };

  var onBtnClickEvent = function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal--closed');
    setFocus();
    document.addEventListener('keydown', onPressEsc);
    modal.addEventListener('click', onOverlayClickEvent);
    name.value = localStorage.getItem('name');
    phone.value = localStorage.getItem('phone');
    text.value = localStorage.getItem('text');
  };

  var onCloseBtnEvent = function () {
    modal.classList.add('modal--closed');
  };

  var onPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseBtnEvent();
      document.removeEventListener('keydown', onPressEsc);
    }
  };

  var onOverlayClickEvent = function (evt) {
    if (evt.target === modal) {
      modal.classList.add('modal--closed');
      modal.removeEventListener('click', onOverlayClickEvent);
    }
  };

  closeBtn.addEventListener('click', onCloseBtnEvent);
  openBtn.addEventListener('click', onBtnClickEvent);

  // сохранение в localStorage

  var submit = document.querySelector('.modal__submit');

  var onSubmitClickHandler = function () {
    if (name.value !== '') {
      localStorage.setItem('name', name.value);
    } if (phone.value !== '') {
      localStorage.setItem('phone', phone.value);
    } if (text.value !== '') {
      localStorage.setItem('text', text.value);
    }
  };
  submit.addEventListener('click', onSubmitClickHandler);
})();

// показ/скрытие меню в футере

(function () {

  var nojs = document.querySelectorAll('.nojs');

  for (var i = 0; i < nojs.length; i++) {
    nojs[i].classList.remove('nojs');
    nojs[i].classList.add('closed');
  }

  var toggleBtn = document.querySelectorAll('.toggleBtn');

  var onToggleClickEvent = function () {
    var _this = this;
    var node = _this.parentNode.nextSibling;
    if (_this.classList.contains('contacts__btn')) {
      if (_this.classList.contains('contacts__btn--hide')) {
        _this.classList.remove('contacts__btn--hide');
        _this.classList.add('contacts__btn--show');
        node.nextSibling.classList.remove('closed');
      } else {
        _this.classList.remove('contacts__btn--show');
        _this.classList.add('contacts__btn--hide');
        node.nextSibling.classList.add('closed');
      }
    } else {
      if (_this.classList.contains('sections__btn--hide')) {
        _this.classList.remove('sections__btn--hide');
        _this.classList.add('sections__btn--show');
        node.nextSibling.classList.remove('closed');
      } else {
        _this.classList.remove('sections__btn--show');
        _this.classList.add('sections__btn--hide');
        node.nextSibling.classList.add('closed');
      }
    }
  };

  for (var j = 0; j < toggleBtn.length; j++) {
    toggleBtn[j].addEventListener('click', onToggleClickEvent);
  }
})();
