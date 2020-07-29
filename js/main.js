'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var picturesContainerElement = document.querySelector('.pictures');

  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
  var closeImageFormElement = uploadImageOverlayElement.querySelector('#upload-cancel');
  var filtersFormElement = document.querySelector('.img-filters__form');

  var filtratePicturesHandler = window.debounce(function (evt, data) {
    window.filter.filterClickHandler(evt, data, picturesContainerElement);
  });

  var errorLoadHandler = function () {

  };

  var successLoadHandler = function (data) {
    var pictures = window.pictures.render(data);
    picturesContainerElement.appendChild(pictures);

    window.filter.show();

    filtersFormElement.addEventListener('click', function (evt) {
      filtratePicturesHandler(evt, data);
    });
  };

  window.dataLoad.load(URL, successLoadHandler, errorLoadHandler);

  uploadImageElement.addEventListener('change', window.form.showFormHandler);
  closeImageFormElement.addEventListener('click', window.form.closeFormHandler);

})();
