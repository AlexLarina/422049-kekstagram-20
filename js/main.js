'use strict';

var PICTURES_LIMIT = 25;

var LIKES = {
  MIN: 15,
  MAX: 200
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

var createRandom = function (max, min) {
  min = (typeof min !== 'undefined') ? min : 1;

  return Math.round(Math.random() * (max - min) + min);
};

var chooseRandomArrayItems = function (array, size) {
  return array
    .sort(function () {
      return Math.random() - 0.5;
    })
    .slice(0, size);
};

var createPictureData = function () {
  return {
    url: 'photos/' + createRandom(PICTURES_LIMIT) + '.jpg',
    description: 'Здесь могло быть Ваше описание.',
    likes: createRandom(LIKES.MAX, LIKES.MIN),
    comments: chooseRandomArrayItems(COMMENTS, createRandom(COMMENTS.length))
  };
};

var createPicturesArray = function (limit) {
  return Array.apply(null, {length: limit}).map(function () {
    return createPictureData();
  });
};

var createPictureNode = function (picture) {
  var pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fillFragment = function (dataArray) {
  var fragment = new DocumentFragment();

  dataArray.forEach(function (dataItem) {
    var node = createPictureNode(dataItem);
    fragment.appendChild(node);
  });

  return fragment;
};


picturesContainerElement.appendChild(
    fillFragment(
        createPicturesArray(PICTURES_LIMIT)
    ));
