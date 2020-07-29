'use strict';

(function () {
  var successModalTemplateElement = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorModalTemplateElement = document.querySelector('#error')
    .content
    .querySelector('.error');

  var renderSuccessModalElement = function () {
    var successModalElement = successModalTemplateElement.cloneNode(true);

    var successButtonElement = successModalElement.querySelector('.success__button');
    successButtonElement.addEventListener('click', function () {
      successModalElement.remove();
    });

    return successModalElement;
  };

  var renderErrorModalElement = function () {
    var errorModalElement = errorModalTemplateElement.cloneNode(true);

    var errorButtonElement = errorModalElement.querySelector('.error__button');
    errorButtonElement.addEventListener('click', function () {
      errorModalElement.remove();
    });

    return errorModalElement;
  };

  var closeEscModalHandler = function (evt) {
    var modal = document.querySelector('.success') || document.querySelector('.error');

    if (evt.key === window.util.KEY_ESCAPE && modal) {
      modal.remove();
    }

    document.removeEventListener('keydown', closeEscModalHandler);
    document.removeEventListener('keydown', closeClickModalHandler);
  };

  var closeClickModalHandler = function () {
    var modal = document.querySelector('.success') || document.querySelector('.error');

    if (modal) {
      modal.remove();
    }

    document.removeEventListener('keydown', closeEscModalHandler);
    document.removeEventListener('click', closeClickModalHandler);
  };

  var showSuccessModalElement = function () {
    var successModalElement = renderSuccessModalElement();

    document.body.appendChild(successModalElement);

    document.addEventListener('keydown', closeEscModalHandler);
    document.addEventListener('click', closeClickModalHandler);
  };

  var showErrorModalElement = function () {
    var errorModalElement = renderErrorModalElement();

    document.body.appendChild(errorModalElement);

    document.addEventListener('keydown', closeEscModalHandler);
    document.addEventListener('click', closeClickModalHandler);
  };

  window.modals = {
    showSuccess: showSuccessModalElement,
    showError: showErrorModalElement
  };
})();
