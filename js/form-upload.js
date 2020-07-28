'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';
  var SUCCESS_STATUS_CODE = 200;

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status !== SUCCESS_STATUS_CODE) {
        onError(xhr.response);
      }
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.formUpload = {
    upload: upload
  };
})();
