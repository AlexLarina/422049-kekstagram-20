'use strict';

(function () {
  var COMMENTS_CHUNK_SIZE = 5;

  var pictureTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
  var bigPictureCommentLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var bigPictureCommentContainerElement = bigPictureElement.querySelector('.social__comments');

  var onCommentLoaderClick = null;

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

  var renderCommentsQuantity = function (currentAmount, totalAmount) {
    return (
      currentAmount
     + ' из <span class="comments-count">'
     + totalAmount + '</span> '
     + window.util.pluralize(totalAmount, ['комментария', 'комментариев'])
    );
  };

  var showLoader = function () {
    bigPictureCommentLoaderElement.classList.remove('hidden');
  };

  var hideLoader = function () {
    bigPictureCommentLoaderElement.classList.add('hidden');
  };

  var renderBigPictureElement = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    var comments = picture.comments;
    var commentsShown = (comments.length < COMMENTS_CHUNK_SIZE) ?
      comments.length : COMMENTS_CHUNK_SIZE;

    showComments(comments, commentsShown);

    if (comments.length > COMMENTS_CHUNK_SIZE) {
      showLoader();
    }

    onCommentLoaderClick = function () {
      commentsShown = commentsShown + COMMENTS_CHUNK_SIZE > comments.length
        ? comments.length
        : commentsShown + COMMENTS_CHUNK_SIZE;

      showComments(comments, commentsShown);
    };

    bigPictureCommentLoaderElement.addEventListener('click', onCommentLoaderClick);
    bigPictureCloseElement.addEventListener('click', closeBigPictureHandler);
    document.addEventListener('keydown', closeEscBigPictureHandler);

    setPopupVisible(true);
  };

  var closeBigPictureHandler = function () {
    setPopupVisible(false);
  };

  var closeEscBigPictureHandler = function (evt) {
    if (evt.key === window.util.KEY_ESCAPE) {
      setPopupVisible(false);
      document.removeEventListener('keydown', closeEscBigPictureHandler);
    }
  };

  var setPopupVisible = function (visible) {
    if (visible) {
      bigPictureElement.classList.remove('hidden');
    } else {
      bigPictureElement.classList.add('hidden');
      bigPictureCommentLoaderElement.removeEventListener('click', onCommentLoaderClick);
      onCommentLoaderClick = null;
    }
  };

  var showComments = function (comments, amount) {
    if (amount === comments.length) {
      hideLoader();
    }

    bigPictureElement.querySelector('.social__comment-count').innerHTML =
      renderCommentsQuantity(amount, comments.length);
    bigPictureCommentContainerElement.innerHTML = renderComments(comments.slice(0, amount));
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
