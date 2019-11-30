'use strict';

// показ модального окна
(function () {

  var ESC_KEYCODE = 27;

  var modal = document.querySelector('.modal');
  var openBtn = document.querySelector('.nav__btn');
  var closeBtn = document.querySelector('.modal__closeBtn');
  var name = document.querySelector('.modal__name');
  var phone = document.querySelector('.modal__phone');
  var text = document.querySelector('.modal__text');
  var html = document.querySelector('html');

  var setFocus = function () {
    document.querySelector('.modal__name').focus();
  };

  var onBtnClickEvent = function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal--closed');
    html.style.overflowY = 'hidden';
    setFocus();
    document.addEventListener('keydown', onPressEsc);
    modal.addEventListener('click', onOverlayClickEvent);
    name.value = localStorage.getItem('name');
    phone.value = localStorage.getItem('phone');
    text.textContent = localStorage.getItem('text');
  };

  var onCloseBtnEvent = function () {
    modal.classList.add('modal--closed');
    html.style.overflowY = 'scroll';
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
      html.style.overflowY = 'scroll';
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

  // проверка на валидность чекбокса в модалке

  var modalSubmit = document.querySelector('.modal__submit');
  var modalAccept = document.querySelector('.modal__accept');
  var modalDescription = document.querySelector('.modal__checkbox');

  var modalValidityCheck = function (evt) {
    if (!modalAccept.checked) {
      evt.preventDefault();
      modalDescription.style.color = 'red';
    } else {
      modalDescription.style.color = '#ffffff'
    }
  };

  modalSubmit.addEventListener("click", modalValidityCheck);

  // проверка на валидность чекбокса в форме

  var formSubmit = document.querySelector('.question__submit');
  var formAccept = document.querySelector('.question__accept');
  var formDescription = document.querySelector('.question__checkbox');

  var formValidityCheck = function (evt) {
    if (!formAccept.checked) {
      evt.preventDefault();
      formDescription.style.color = 'red';
    } else {
      formDescription.style.color = '#ffffff'
    }
  };

  formSubmit.addEventListener("click", formValidityCheck);
})();

// показ/скрытие меню в футере

(function () {

  var nojs = document.querySelectorAll('.nojs');

  for (var i = 0; i < nojs.length; i++) {
    nojs[i].classList.remove('nojs');
    nojs[i].classList.add('accordeon-closed');
  }

  var accordeon = document.querySelectorAll('.accordeon');
  var accordeonBtn = document.querySelectorAll('.accordeon-btn');
  var accordeonMenu = document.querySelectorAll('.accordeon-item');

  var onButtonclick = function () {
    var node = this.nextElementSibling;
    var btn = this.lastChild.previousSibling;

    if (node.classList.contains('accordeon-closed')) {
      for (var i = 0; i < accordeonMenu.length; i++) {
        accordeonMenu[i].classList.add('accordeon-closed');
        accordeonBtn[i].classList.add('accordeon-btn--hide');
      }
      node.classList.remove('accordeon-closed');
      btn.classList.remove('accordeon-btn--hide');
    } else {
      node.classList.add('accordeon-closed');
      btn.classList.add('accordeon-btn--hide');
    }
  };

  for (var j = 0; j < accordeon.length; j++) {
    accordeon[j].addEventListener('click', onButtonclick);
  }
})();

// скролл вниз к якорю()

(function () {
  var linkNav = document.querySelectorAll('.scroll-link');

  var SPEED = 0.5;
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(evt) {
        evt.preventDefault();

        var height = window.pageYOffset;
        var hash = this.href.replace(/[^#]*(.*)/, '$1');
        var top = document.querySelector(hash).getBoundingClientRect().top;
        var start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            var progress = time - start;
            var result = (top < 0 ? Math.max(height - progress/SPEED, height + top) : Math.min(height + progress/SPEED, height + top));
            window.scrollTo(0,result);
            if (result != height + top) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash;
            }
        }
    }, false);
  }
})();
