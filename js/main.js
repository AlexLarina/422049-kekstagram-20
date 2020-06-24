'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var picturesContainerElement = document.querySelector('.pictures');

  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageFormElement = document.querySelector('.img-upload__overlay');
  var closeImageFormElement = uploadImageFormElement.querySelector('#upload-cancel');

  var onError = function () {

  };

  var onSuccess = function (data) {
    var pictures = window.pictures.render(data);
    picturesContainerElement.appendChild(pictures);
  };

  window.dataLoad.load(URL, onSuccess, onError);

  uploadImageElement.addEventListener('change', window.form.show);
  closeImageFormElement.addEventListener('click', window.form.close);

})();
