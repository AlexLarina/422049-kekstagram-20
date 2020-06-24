'use strict';

(function () {
  var StatusCodes = {
    SUCCESS: 200,
    ERROR_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var ErrorMessage = {
    ERROR_REQUEST: 'Неверный запрос',
    NOT_AUTHORIZED: 'Пользователь не авторизован',
    NOT_FOUND: 'Ничего не найдено',
    CONNECTION_LOST: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };

  var load = function (URL, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCodes.SUCCESS:
          onSuccess(xhr.response);
          break;

        case StatusCodes.ERROR_REQUEST:
          error = ErrorMessage.ERROR_REQUEST;
          break;
        case StatusCodes.NOT_AUTHORIZED:
          error = ErrorMessage.NOT_AUTHORIZED;
          break;
        case StatusCodes.NOT_FOUND:
          error = ErrorMessage.NOT_FOUND;
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorMessage.CONNECTION_LOST);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.dataLoad = {
    load: load
  };
})();
