'use strict';

(function () {
  var KEY_ESCAPE = 'Escape';

  var pluralize = function (quantity, variants) {
    return quantity === 1
      ? variants[0]
      : variants[1];
  };

  var getModificator = function (element, modificator) {
    return Array.from(element.classList)
                .find(function (className) {
                  return className.includes(modificator);
                });
  };

  window.util = {
    pluralize: pluralize,
    getModificator: getModificator,
    KEY_ESCAPE: KEY_ESCAPE
  };

})();
