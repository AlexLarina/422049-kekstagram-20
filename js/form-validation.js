'use strict';

(function () {
  var HASHTAGS_LIMIT = 5;
  var MAX_COMMENT_LENGTH = 140;

  var HashtagRegex = {
    '^#.*$': 'Первый символ тега должен быть #. ',
    '^#[a-zA-Zа-яА-я0-9]*$': 'Тег может состоять только из букв или цифр. ',
    '^.{2,}$': 'Тег не может состоять только из символа #. ',
    '^.{0,20}$': 'Максимальная длина одного тега 20 символов, включая #. '
  };

  var uploadImageOverlayElement = document.querySelector('.img-upload__overlay');
  var hashtagsInputElement = uploadImageOverlayElement.querySelector('.text__hashtags');
  var commentInputElement = uploadImageOverlayElement.querySelector('.text__description');

  var validateHashtagsQuantity = function (hashtags) {
    return (hashtags.length > HASHTAGS_LIMIT) ?
      'Укажите не более ' + HASHTAGS_LIMIT + ' тегов' :
      '';
  };

  var applyHashtagValidationRegex = function (tag) {
    var errorRegex = Object.keys(HashtagRegex).find(function (regex) {
      return (new RegExp(regex).test(tag) === false);
    });

    return errorRegex;
  };

  var hashtagValidationHandler = function (evt) {
    var hashtags = evt.target.value
    .trim()
    .split(' ');

    var errorMessage = null;

    errorMessage = validateHashtagsQuantity(hashtags);

    for (var i = 0; i < hashtags.length; i++) {
      var tag = hashtags[i].toLowerCase();

      for (var j = 0; j < i; j++) {
        if (hashtags[j].toLowerCase() === tag) {
          errorMessage = 'Теги не должны повторяться. ';
          break;
        }
      }

      if (applyHashtagValidationRegex(tag)) {
        errorMessage = HashtagRegex[applyHashtagValidationRegex(tag)];
      }

      if (errorMessage) {
        break;
      }
    }

    if (errorMessage) {
      hashtagsInputElement.setCustomValidity(errorMessage);
    } else {
      hashtagsInputElement.setCustomValidity('');
    }
  };

  var validateCommentLength = function (comment) {
    return (comment.length >= MAX_COMMENT_LENGTH) ?
      'Длина комментария не должна превышать' + MAX_COMMENT_LENGTH + ' символов' :
      '';
  };

  var commentValidationHandler = function (evt) {
    var comment = evt.target.value;

    var validityMessage = validateCommentLength(comment) ?
      validateCommentLength(comment) : '';

    commentInputElement.setCustomValidity(validityMessage);
  };

  window.formValidation = {
    hashtagValidationHandler: hashtagValidationHandler,
    commentValidationHandler: commentValidationHandler
  };
})();
