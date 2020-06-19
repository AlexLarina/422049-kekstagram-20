'use strict';

(function () {
  var COMMENTS_LIMIT_PER_PAGE = 5;

  var AVATAR = {
    MIN: 1,
    MAX: 6
  };

  var pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var bigPictureElement = document.querySelector('.big-picture');

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
        + window.random.create(AVATAR.MIN, AVATAR.MAX)
        + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
        + '<p class="social__text">' + comment + '</p>'
        + '</li>'
      );
    })
    .join('');
  };

  var renderCommentsQuantity = function (comments) {
    var quantity = (comments.length >= COMMENTS_LIMIT_PER_PAGE) ?
      COMMENTS_LIMIT_PER_PAGE : comments.length;

    return (
      quantity
     + ' из <span class="comments-count">'
     + comments.length + '</span> '
     + window.util.pluralize(comments.length, ['комментария', 'комментариев'])
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

  window.pictures = {
    render: renderPictures,
    renderBigElement: renderBigPictureElement
  };
})();
