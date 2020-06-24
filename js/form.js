'use strict';

(function () {
  var uploadImageElement = document.querySelector('#upload-file');
  var uploadImageFormElement = document.querySelector('.img-upload__overlay');

  var effectsFieldsetElement = uploadImageFormElement.querySelector('.img-upload__effects');
  var effectPinElement = uploadImageFormElement.querySelector('.effect-level__pin');
  var scaleFieldsetElement = uploadImageFormElement.querySelector('.img-upload__scale');
  // duplicates in form-validation
  var hashtagsInputElement = uploadImageFormElement.querySelector('.text__hashtags');

  var resetUploadForm = function () {
    window.formEffect.setOriginal();
    window.formResize.toDefault();
  };

  var closeEscUploadFormHandler = function (evt) {
    if (evt.key === window.util.KEY_ESCAPE) {
      closeUploadFormHandler();
    }
  };

  var showUploadFormHandler = function () {
    uploadImageFormElement.classList.remove('hidden');

    effectsFieldsetElement.addEventListener('click', window.formEffect.apply);

    effectPinElement.addEventListener('mouseup', window.formEffect.tuneDepth);

    scaleFieldsetElement.addEventListener('click', window.formResize.preview);

    document.addEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.addEventListener('input', window.formValidation.hashtag);
  };

  var closeUploadFormHandler = function () {
    uploadImageFormElement.classList.add('hidden');
    uploadImageElement.value = '';

    resetUploadForm();

    effectsFieldsetElement.removeEventListener('click', window.formEffect.apply);

    effectPinElement.removeEventListener('mouseup', window.formEffect.tuneDepth);

    scaleFieldsetElement.removeEventListener('click', window.formResize.preview);

    document.removeEventListener('keydown', closeEscUploadFormHandler);

    hashtagsInputElement.removeEventListener('input', window.formValidation.hashtag);
  };

  window.form = {
    show: showUploadFormHandler,
    close: closeUploadFormHandler
  };

})();
