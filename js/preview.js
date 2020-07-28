'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadPreviewInputElement = document.querySelector('.img-upload__input');
  var previewElement = document.querySelector('.img-upload__preview img');

  uploadPreviewInputElement.addEventListener('change', function () {
    var filePreview = uploadPreviewInputElement.files[0];
    var filePreviewName = filePreview.name.toLowerCase();

    var endingMatches = FILE_TYPES.some(function (fileType) {
      return filePreviewName.endsWith(fileType);
    });

    if (endingMatches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(filePreview);
    }
  });

})();
