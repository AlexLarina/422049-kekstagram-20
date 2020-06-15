'use strict';

var PICTURES_COUNT = 25;
var COMMENTS_LIMIT_PER_PAGE = 5;

var LIKES = {
  MIN: 15,
  MAX: 200
};

var AVATAR = {
  MIN: 1,
  MAX: 6
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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

var SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var ScaleContol = {
  SMALL: 'smaller',
  BIG: 'bigger'
};

var KEY_ESCAPE = 'Escape';

var Effects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

var pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesContainerElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');

var uploadImageElement = document.querySelector('#upload-file');
var uploadImageFormElement = document.querySelector('.img-upload__overlay');
var closeImageFormElement = uploadImageFormElement.querySelector('#upload-cancel');

var uploadPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview');
var effectSliderElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
var effectsFieldsetElement = uploadImageFormElement.querySelector('.img-upload__effects');

var effectPinElement = uploadImageFormElement.querySelector('.effect-level__pin');
var effectLineElement = uploadImageFormElement.querySelector('.effect-level__line');
var effectDepthElement = uploadImageFormElement.querySelector('.effect-level__depth');

var scaleFieldsetElement = uploadImageFormElement.querySelector('.img-upload__scale');
var scaleValueElement = uploadImageFormElement.querySelector('.scale__control--value');
var uploadPreviewImgElement = uploadImageFormElement.querySelector('.img-upload__preview img');

var hashtagsInputElement = uploadImageFormElement.querySelector('.text__hashtags');

var createRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var chooseRandomArrayItems = function (array, size) {
  return array
    .slice(0, size)
    .sort(function () {
      return Math.random() - 0.5;
    });
};

var generatePictureData = function () {
  return {
    url: 'photos/' + createRandom(1, PICTURES_COUNT) + '.jpg',
    description: 'Здесь могло быть Ваше описание.',
    likes: createRandom(LIKES.MIN, LIKES.MAX),
    comments: chooseRandomArrayItems(COMMENTS, createRandom(1, COMMENTS.length))
  };
};

var generatePictureDataArray = function (count) {
  return Array(count).fill('').map(generatePictureData);
};

var createPictureElement = function (picture) {
  var pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderComments = function (comments) {
  return comments.map(function (comment) {
    return (
      '<li class="social__comment">'
      + '<img class="social__picture" src="img/avatar-'
      + createRandom(AVATAR.MIN, AVATAR.MAX)
      + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
      + '<p class="social__text">' + comment + '</p>'
      + '</li>'
    );
  })
  .join('');
};

var pluralize = function (quantity, variants) {
  return quantity === 1
    ? variants[0]
    : variants[1];
};

var renderCommentsQuantity = function (comments) {
  var quantity = (comments.length >= COMMENTS_LIMIT_PER_PAGE) ?
    COMMENTS_LIMIT_PER_PAGE : comments.length;

  return (
    quantity
   + ' из <span class="comments-count">'
   + comments.length + '</span> '
   + pluralize(comments.length, ['комментария', 'комментариев'])
  );
};

var renderBigPictureElement = function (picture) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  bigPictureElement.querySelector('.social__comment-count').innerHTML = renderCommentsQuantity(picture.comments);
  bigPictureElement.querySelector('.social__comments').innerHTML = renderComments(picture.comments);

  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
};

var renderPictures = function (pictures) {
  var fragment = new DocumentFragment();

  pictures.forEach(function (dataItem) {
    var node = createPictureElement(dataItem);
    fragment.appendChild(node);
  });

  return fragment;
};

var getModificator = function (element, modificator) {
  return Array.from(element.classList)
              .find(function (className) {
                return className.includes(modificator);
              });
};

var setOriginalEffect = function () {
  effectSliderElement.classList.add('hidden');
  uploadPreviewElement.removeAttribute('style');
  removePreviousImageEffect();
};

var removePreviousImageEffect = function () {
  var currentEffect = getModificator(uploadPreviewElement, 'effects__preview--');
  if (currentEffect) {
    uploadPreviewElement.classList.remove(currentEffect);
  }
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

var rescalePreview = function (button) {
  var currentScaleValue = parseInt(scaleValueElement.value, 10);
  scaleValueElement.value = setScaleControlValue(button, currentScaleValue);
  scalePreview(scaleValueElement.value / 100);
  scaleValueElement.value += '%';
};

var closeEscUploadFormHandler = function (evt) {
  if (evt.key === KEY_ESCAPE) {
    closeUploadFormHandler();
  }
};

var resetScaleToDefault = function () {
  uploadPreviewImgElement.removeAttribute('style');
};

var resetUploadForm = function () {
  setOriginalEffect();
  resetScaleToDefault();
};

var applyEffectHandler = function (evt) {
  if (evt.target
      && evt.target.matches('input[type="radio"]')) {
    removePreviousImageEffect();
    addImageEffect(evt.target.value);
  }
};

var resizePreviewHandler = function (evt) {
  if (evt.target
    && evt.target.matches('button')) {
    var scaleControl = getModificator(evt.target, 'scale__control--')
                      .split('--')[1];
    rescalePreview(scaleControl);
  }
};

var tuneEffectDepthHandler = function () {
  var effectDepthPersentage = Math.round(effectDepthElement.offsetWidth * 100 / effectLineElement.offsetWidth);
  var currentEffect = getModificator(uploadPreviewElement, 'effects__preview--')
                        .split('--')[1];
  setImageEffect(currentEffect, effectDepthPersentage);
};

var hashtagRegex = /^#[a-zа-я0-9]{1,19}$/gm;

var HASHTAGS_LIMIT = 5;

var validateHashtagsQuantity = function (hashtags) {
  var validityMessage = (hashtags.length > HASHTAGS_LIMIT) ?
    'Укажите не более ' + HASHTAGS_LIMIT + ' тегов' :
    '';
  return validityMessage;
};

var validateUniqueHashtags = function (hashtags) {
  var hashtagsLowerCase = hashtags.map(function (tag) {
    return tag.toLowerCase();
  });

  var validityMessage = (hashtagsLowerCase.length === new Set(hashtagsLowerCase).size) ?
    'Теги не должны повторяться' :
    '';

  return validityMessage;
};


var hashtagValidationHandler = function (evt) {
  var hashtags = evt.target.value
  .trim()
  .split(' ');

  hashtagsInputElement.setCustomValidity(validateHashtagsQuantity(hashtags));
  hashtagsInputElement.setCustomValidity(validateUniqueHashtags(hashtags));

  hashtags.forEach(function (tag) {
    if (hashtagRegex.test(tag) === false) {
      hashtagsInputElement.setCustomValidity('Проверь свои кривые теги');
    } else {
      hashtagsInputElement.setCustomValidity('');
    }
  });
};

var showUploadFormHandler = function () {
  uploadImageFormElement.classList.remove('hidden');

  effectsFieldsetElement.addEventListener('click', applyEffectHandler);

  effectPinElement.addEventListener('mouseup', tuneEffectDepthHandler);

  scaleFieldsetElement.addEventListener('click', resizePreviewHandler);

  document.addEventListener('keydown', closeEscUploadFormHandler);

  hashtagsInputElement.addEventListener('input', hashtagValidationHandler);
};

var closeUploadFormHandler = function () {
  uploadImageFormElement.classList.add('hidden');
  uploadImageElement.value = '';

  resetUploadForm();

  effectsFieldsetElement.removeEventListener('click', applyEffectHandler);

  effectPinElement.removeEventListener('mouseup', tuneEffectDepthHandler);

  scaleFieldsetElement.removeEventListener('click', resizePreviewHandler);

  document.removeEventListener('keydown', closeEscUploadFormHandler);

  hashtagsInputElement.removeEventListener('input', hashtagValidationHandler);
};

var pictures = renderPictures(generatePictureDataArray(PICTURES_COUNT));

picturesContainerElement.appendChild(pictures);

uploadImageElement.addEventListener('change', showUploadFormHandler);
closeImageFormElement.addEventListener('click', closeUploadFormHandler);
