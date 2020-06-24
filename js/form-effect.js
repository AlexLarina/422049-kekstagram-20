'use strict';

(function () {
  var EFFECT_RANGE = {
    PHOBOS: {
      MIN: 0,
      MAX: 3
    },
    HEAT: {
      MIN: 1,
      MAX: 3
    }
  };

  var Effects = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var uploadImageFormElement = document.querySelector('.img-upload__overlay');

  var uploadPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview');
  var effectSliderElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
  var effectLineElement = uploadImageFormElement.querySelector('.effect-level__line');
  var effectDepthElement = uploadImageFormElement.querySelector('.effect-level__depth');

  var removePreviousImageEffect = function () {
    var currentEffect = window.util.getModificator(uploadPreviewElement, 'effects__preview--');
    if (currentEffect) {
      uploadPreviewElement.classList.remove(currentEffect);
    }
  };

  var setOriginalEffect = function () {
    effectSliderElement.classList.add('hidden');
    uploadPreviewElement.removeAttribute('style');
    removePreviousImageEffect();
  };

  var addImageEffect = function (effect) {
    uploadPreviewElement.classList.add('effects__preview--' + effect);
    effectSliderElement.classList.remove('hidden');

    if (effect === 'none') {
      setOriginalEffect();
    }
  };

  var setImageEffect = function (effect, depth) {
    switch (effect) {
      case Effects.CHROME:
        uploadPreviewElement.setAttribute('style',
            'filter: grayscale(' + depth / 100 + ')');
        break;
      case Effects.SEPIA:
        uploadPreviewElement.setAttribute('style',
            'filter: sepia(' + depth / 100 + ')');
        break;
      case Effects.MARVIN:
        uploadPreviewElement.setAttribute('style',
            'filter: invert(' + depth + '%)');
        break;
      case Effects.PHOBOS:
        uploadPreviewElement.setAttribute('style',
            'filter: blur('
            + depth * (EFFECT_RANGE.PHOBOS.MAX - EFFECT_RANGE.PHOBOS.MIN) / 100
            + 'px)');
        break;
      case Effects.HEAT:
        uploadPreviewElement.setAttribute('style',
            'filter: brightness('
            + depth * (EFFECT_RANGE.HEAT.MAX - EFFECT_RANGE.HEAT.MIN) / 100
            + 'px)');
        break;
      default:
        uploadPreviewElement.removeAttribute('style', 'filter');
    }
  };

  var tuneEffectDepthHandler = function () {
    var effectDepthPersentage = Math.round(
        effectDepthElement.offsetWidth * 100 / effectLineElement.offsetWidth
    );
    var currentEffect = window.util.getModificator(
        uploadPreviewElement, 'effects__preview--')
                          .split('--')[1];
    setImageEffect(currentEffect, effectDepthPersentage);
  };

  var applyEffectHandler = function (evt) {
    if (evt.target
        && evt.target.matches('input[type="radio"]')) {
      removePreviousImageEffect();
      addImageEffect(evt.target.value);
    }
  };

  window.formEffect = {
    apply: applyEffectHandler,
    tuneDepth: tuneEffectDepthHandler,
    setOriginal: setOriginalEffect
  };
})();
