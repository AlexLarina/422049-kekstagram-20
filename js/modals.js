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

  var addModalCloseHandlers = function (modal) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.KEY_ESCAPE) {
        modal.remove();
      }
    });

    document.addEventListener('click', function () {
      modal.remove();
    });
  };

  var showSuccessModalElement = function () {
    var successModalElement = renderSuccessModalElement();

    document.body.appendChild(successModalElement);

    addModalCloseHandlers(successModalElement);
  };

  var showErrorModalElement = function () {
    var errorModalElement = renderErrorModalElement();

    document.body.appendChild(errorModalElement);

    addModalCloseHandlers(errorModalElement);
  };

  window.modals = {
    showSuccess: showSuccessModalElement,
    showError: showErrorModalElement
  };
})();
