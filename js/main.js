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

var pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesContainerElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');

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


var pictures = renderPictures(generatePictureDataArray(PICTURES_COUNT));

picturesContainerElement.appendChild(pictures);

renderBigPictureElement(generatePictureDataArray(PICTURES_COUNT)[0]);

document.body.classList.add('modal-open');
bigPictureElement.classList.remove('hidden');
