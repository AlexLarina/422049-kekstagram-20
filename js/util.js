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

  var removeAllChildren = function (node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  };

  window.util = {
    pluralize: pluralize,
    getModificator: getModificator,
    removeAllChildren: removeAllChildren,
    KEY_ESCAPE: KEY_ESCAPE
  };

})();
