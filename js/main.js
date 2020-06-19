'use strict';

(function () {
  var picturesContainerElement = document.querySelector('.pictures');

  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageFormElement = document.querySelector('.img-upload__overlay');
  var closeImageFormElement = uploadImageFormElement.querySelector('#upload-cancel');

  var pictures = window.pictures.render(
      window.mocks.generatePictures(window.constants.PICTURES_COUNT)
  );

  picturesContainerElement.appendChild(pictures);

  uploadImageElement.addEventListener('change', window.form.show);
  closeImageFormElement.addEventListener('click', window.form.close);

})();
