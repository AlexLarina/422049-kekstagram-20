'use strict';

(function () {
  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageFormElement = document.querySelector('.img-upload__form');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');

  var effectsFieldsetElement = uploadImageOverlayElement.querySelector('.img-upload__effects');
  var effectPinElement = uploadImageOverlayElement.querySelector('.effect-level__pin');
  var scaleFieldsetElement = uploadImageOverlayElement.querySelector('.img-upload__scale');
  // duplicates in form-validation
  var hashtagsInputElement = uploadImageOverlayElement.querySelector('.text__hashtags');
  var commentInputElement = uploadImageOverlayElement.querySelector('.text__description');

  var resetUploadForm = function () {
    window.formEffect.setOriginal();
    window.formResize.toDefault();
    uploadImageFormElement.reset();
  };

  var closeEscUploadFormHandler = function (evt) {
    if (evt.key === window.util.KEY_ESCAPE) {
      closeUploadFormHandler();
    }
  };

  var showUploadFormHandler = function () {
    uploadImageOverlayElement.classList.remove('hidden');

    effectsFieldsetElement.addEventListener('click', window.formEffect.apply);

    effectPinElement.addEventListener('mouseup', window.formEffect.tuneDepth);

    scaleFieldsetElement.addEventListener('click', window.formResize.preview);

    document.addEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.addEventListener('input', window.formValidation.hashtag);

    commentInputElement.addEventListener('blur', window.formValidation.commentValidationHandler);
  };

  var closeUploadFormHandler = function () {
    uploadImageOverlayElement.classList.add('hidden');
    uploadImageElement.value = '';

    resetUploadForm();

    effectsFieldsetElement.removeEventListener('click', window.formEffect.apply);

    effectPinElement.removeEventListener('mouseup', window.formEffect.tuneDepth);

    scaleFieldsetElement.removeEventListener('click', window.formResize.preview);

    document.removeEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.removeEventListener('input', window.formValidation.hashtag);

    commentInputElement.removeEventListener('blur', window.formValidation.commentValidationHandler);
  };

  uploadImageFormElement.addEventListener('submit', function (evt) {
    window.formUpload.upload(
        new FormData(uploadImageFormElement),
        function () {
          closeUploadFormHandler();
          window.modals.showSuccess();
        }
    );
    evt.preventDefault();
  });

  window.form = {
    show: showUploadFormHandler,
    close: closeUploadFormHandler
  };

})();
