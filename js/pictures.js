'use strict';

(function () {
  var COMMENTS_LIMIT_PER_PAGE = 5;

  var pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

  var removeAllPictures = function (node) {
    var pictures = node.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      node.removeChild(picture);
    });
  };

  var createPictureElement = function (picture) {
    var pictureElement = pictureTemplateElement.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', function () {
      renderBigPictureElement(picture);
      bigPictureElement.classList.remove('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.KEY_ESCAPE) {
        bigPictureElement.classList.add('hidden');
      }
    });

    return pictureElement;
  };

  var renderComments = function (comments) {
    return comments.map(function (comment) {
      return (
        '<li class="social__comment">'
        + '<img class="social__picture" src="'
        + comment.avatar
        + '" alt="Аватар комментатора фотографии" width="35" height="35">'
        + '<p class="social__text">' + comment.message + '</p>'
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

    bigPictureCloseElement.addEventListener('click', function () {
      bigPictureElement.classList.add('hidden');
    });
  };

  var renderPictures = function (pictures) {
    var fragment = new DocumentFragment();

    pictures.forEach(function (dataItem) {
      var node = createPictureElement(dataItem);
      fragment.appendChild(node);
    });

    return fragment;
  };

  var updatePictures = function (container, pictures) {
    var updatedPictures = renderPictures(pictures);

    removeAllPictures(container);
    container.appendChild(updatedPictures);
  };

  window.pictures = {
    render: renderPictures,
    updatePictures: updatePictures
  };
})();
