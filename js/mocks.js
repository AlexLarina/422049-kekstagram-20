'use strict';

(function () {
  // var PICTURES_COUNT = 25;

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

  var generatePictureData = function () {
    return {
      url: 'photos/'
        + window.random.create(1, window.constants.PICTURES_COUNT)
        + '.jpg',
      description: 'Здесь могло быть Ваше описание.',
      likes: window.random.create(LIKES.MIN, LIKES.MAX),
      comments: window.random.chooseArrayItems(
          COMMENTS,
          window.random.create(1, COMMENTS.length))
    };
  };

  var generatePictureDataArray = function (count) {
    return Array(count).fill('').map(generatePictureData);
  };

  window.mocks = {
    generatePictures: generatePictureDataArray
  };
})();
