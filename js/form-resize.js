'use strict';

(function () {
  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');

  var uploadPreviewImgElement = uploadImageOverlayElement.querySelector('.img-upload__preview img');
  var scaleValueElement = uploadImageOverlayElement.querySelector('.scale__control--value');

  var SCALE = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var ScaleContol = {
    SMALL: 'smaller',
    BIG: 'bigger'
  };

  var scalePreview = function (scale) {
    uploadPreviewImgElement.setAttribute('style', 'transform: scale(' + scale + ')');
  };

  var setScaleControlValue = function (button, currentScale) {
    var scaleValue;
    switch (button) {
      case ScaleContol.SMALL:
        scaleValue = currentScale > SCALE.MIN ?
          currentScale - SCALE.STEP :
          SCALE.MIN;
        break;
      case ScaleContol.BIG:
        scaleValue = currentScale < SCALE.MAX ?
          currentScale + SCALE.STEP :
          SCALE.MAX;
        break;
    }

    return scaleValue;
  };

  var rescalePreview = function (scaleType) {
    var currentScaleValue = parseInt(scaleValueElement.value, 10);
    scaleValueElement.value = setScaleControlValue(scaleType, currentScaleValue);
    scalePreview(scaleValueElement.value / 100);
    scaleValueElement.value += '%';
  };

  var resetScaleToDefault = function () {
    uploadPreviewImgElement.removeAttribute('style');
  };

  var scaleClickHandler = function (evt) {
    if (evt.target
      && evt.target.matches('button')) {
      var scaleType = window.util.getModificator(evt.target, 'scale__control--')
                        .split('--')[1];
      rescalePreview(scaleType);
    }
  };

  window.formResize = {
    scaleClickHandler: scaleClickHandler,
    toDefault: resetScaleToDefault
  };
})();
