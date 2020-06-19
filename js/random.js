'use strict';

(function () {
  var createRandom = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var chooseRandomArrayItems = function (array, size) {
    return array
      .slice(0, size)
      .sort(function () {
        return Math.random() - 0.5;
      });
  };


  window.random = {
    create: createRandom,
    chooseArrayItems: chooseRandomArrayItems
  };

})();
