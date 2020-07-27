'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.formUpload = {
    upload: upload
  };
})();
