'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var picturesContainerElement = document.querySelector('.pictures');

  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
  var closeImageFormElement = uploadImageOverlayElement.querySelector('#upload-cancel');
  var filtersFormElement = document.querySelector('.img-filters__form');

  var onError = function () {

  };

  var onSuccess = function (data) {
    var pictures = window.pictures.render(data);
    picturesContainerElement.appendChild(pictures);

    window.filter.showFilters();

    filtersFormElement.addEventListener('click', function (evt) {
      window.debounce(
          window.filter.filterClickHandler(evt, data, picturesContainerElement)
      );
    });
  };

  window.dataLoad.load(URL, onSuccess, onError);

  uploadImageElement.addEventListener('change', window.form.show);
  closeImageFormElement.addEventListener('click', window.form.close);

})();
