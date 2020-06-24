'use strict';

(function () {
  var HASHTAGS_LIMIT = 5;

  var HashtagRegex = {
    '^#.*$': 'Первый символ тега должен быть #. ',
    '^#[a-zA-Zа-яА-я0-9]*$': 'Тег может состоять только из букв или цифр. ',
    '^.{2,}$': 'Тег не может состоять только из символа #. ',
    '^.{0,20}$': 'Максимальная длина одного тега 20 символов, включая #. '
  };

  var uploadImageFormElement = document.querySelector('.img-upload__overlay');
  var hashtagsInputElement = uploadImageFormElement.querySelector('.text__hashtags');

  var validateHashtagsQuantity = function (hashtags) {
    return (hashtags.length > HASHTAGS_LIMIT) ?
      'Укажите не более ' + HASHTAGS_LIMIT + ' тегов' :
      '';
  };

  var validateUniqueHashtags = function (hashtags) {
    var hashtagsLowerCase = hashtags.map(function (tag) {
      return tag.toLowerCase();
    });

    var hashtagObj = {};
    hashtagsLowerCase.map(function (tag) {
      hashtagObj[tag] = '';
    });

    return (hashtagsLowerCase.length === Object.keys(hashtagObj).length) ?
      '' :
      'Теги не должны повторяться';
  };

  var applyHashtagValidationRegex = function (tag) {
    var errorRegex = Object.keys(HashtagRegex).find(function (regex) {
      return (new RegExp(regex).test(tag) === false);
    });

    return errorRegex;
  };

  var validateHashTagArray = function (hashtags) {
    var badTag = hashtags.find(function (tag) {
      return applyHashtagValidationRegex(tag);
    });

    if (badTag) {
      return HashtagRegex[applyHashtagValidationRegex(badTag)];
    }

    return null;
  };

  var hashtagValidationHandler = function (evt) {
    var hashtags = evt.target.value
    .trim()
    .split(' ');

    if (validateHashtagsQuantity(hashtags)) {
      hashtagsInputElement.setCustomValidity(validateHashtagsQuantity(hashtags));
    } else if (validateUniqueHashtags(hashtags)) {
      hashtagsInputElement.setCustomValidity(validateUniqueHashtags(hashtags));
    } else if (validateHashTagArray(hashtags)) {
      hashtagsInputElement.setCustomValidity(validateHashTagArray(hashtags));
    } else {
      hashtagsInputElement.setCustomValidity('');
    }
  };

  window.formValidation = {
    hashtag: hashtagValidationHandler
  };
})();
