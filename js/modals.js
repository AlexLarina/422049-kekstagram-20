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

  var closeEscModalHandler = function (evt, modal) {
    if (evt.key === window.util.KEY_ESCAPE) {
      modal.remove();

      document.removeEventListener('keydown', closeEscModalHandler);
    }
  };

  var closeClickModalHandler = function (modal) {
    modal.remove();
    document.removeEventListener('click', closeClickModalHandler);
  };

  var showSuccessModalElement = function () {
    var successModalElement = renderSuccessModalElement();

    document.body.appendChild(successModalElement);

    document.addEventListener('keydown', function (evt) {
      closeEscModalHandler(evt, successModalElement);
    });

    document.addEventListener('click', function () {
      closeClickModalHandler(successModalElement);
    });
  };

  var showErrorModalElement = function () {
    var errorModalElement = renderErrorModalElement();

    document.body.appendChild(errorModalElement);

    document.addEventListener('keydown', function (evt) {
      closeEscModalHandler(evt, errorModalElement);
    });

    document.addEventListener('click', function () {
      closeClickModalHandler(errorModalElement);
    });
  };

  window.modals = {
    showSuccess: showSuccessModalElement,
    showError: showErrorModalElement
  };
})();
