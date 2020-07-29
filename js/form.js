'use strict';

(function () {
  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageFormElement = document.querySelector('.img-upload__form');
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');

  var effectsFieldsetElement = uploadImageOverlayElement.querySelector('.img-upload__effects');
  var effectPinElement = uploadImageOverlayElement.querySelector('.effect-level__pin');
  var scaleFieldsetElement = uploadImageOverlayElement.querySelector('.img-upload__scale');

  var hashtagsInputElement = uploadImageOverlayElement.querySelector('.text__hashtags');
  var commentInputElement = uploadImageOverlayElement.querySelector('.text__description');

  var resetUploadForm = function () {
    window.formEffect.setOriginal();
    window.formResize.toDefault();
    uploadImageFormElement.reset();
  };

  var closeEscUploadFormHandler = function (evt) {
    if (evt.key === window.util.KEY_ESCAPE &&
        evt.target !== hashtagsInputElement &&
        evt.target !== commentInputElement) {
      closeUploadFormHandler();
    }
  };

  var showUploadFormHandler = function () {
    uploadImageOverlayElement.classList.remove('hidden');

    effectsFieldsetElement.addEventListener('click', window.formEffect.effectClickHandler);

    effectPinElement.addEventListener('mouseup', window.formEffect.pinMouseUpHandler);

    scaleFieldsetElement.addEventListener('click', window.formResize.scaleClickHandler);

    document.addEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.addEventListener('input', window.formValidation.hashtagInputHandler);

    commentInputElement.addEventListener('blur', window.formValidation.commentBlurHandler);
  };

  var closeUploadFormHandler = function () {
    uploadImageOverlayElement.classList.add('hidden');
    uploadImageElement.value = '';

    resetUploadForm();

    effectsFieldsetElement.removeEventListener('click', window.formEffect.effectClickHandler);

    effectPinElement.removeEventListener('mouseup', window.formEffect.pinMouseUpHandler);

    scaleFieldsetElement.removeEventListener('click', window.formResize.scaleClickHandler);

    document.removeEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.removeEventListener('input', window.formValidation.hashtagInputHandler);

    commentInputElement.removeEventListener('blur', window.formValidation.commentBlurHandler);

  };

  uploadImageFormElement.addEventListener('submit', function (evt) {
    window.formUpload.upload(
        new FormData(uploadImageFormElement),
        function () {
          closeUploadFormHandler();
          window.modals.showSuccess();
        },
        function () {
          closeUploadFormHandler();
          window.modals.showError();
        }
    );
    evt.preventDefault();
  });

  window.form = {
    showFormHandler: showUploadFormHandler,
    closeFormHandler: closeUploadFormHandler
  };

})();
