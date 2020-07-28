'use strict';

(function () {
  var RANDOM_COUNT = 10;

  var showFilters = function () {
    var filtersContainer = document.querySelector('.img-filters');
    filtersContainer.classList.remove('img-filters--inactive');
  };

  var filtratePictures = function (filter, pictures) {
    var filteredPictures = [];
    switch (filter) {
      case 'default':
        filteredPictures = pictures;
        break;
      case 'random':
        filteredPictures = window.random.chooseArrayItems(pictures, RANDOM_COUNT);
        break;
      case 'discussed':
        filteredPictures = pictures.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      default:
        filteredPictures = pictures;
    }

    return filteredPictures;
  };

  var removeActiveFilter = function () {
    var activeFilterElement = document.querySelector('.img-filters__button--active');
    if (activeFilterElement) {
      activeFilterElement.classList.remove('img-filters__button--active');
    }
  };

  var filterClickHandler = function (evt, data, container) {
    var filterName = null;
    if (evt.target.classList.contains('img-filters__button')) {
      filterName = evt.target.id.split('-')[1];
    }

    removeActiveFilter();
    evt.target.classList.add('img-filters__button--active');

    var filteredData = window.filter.filtratePictures(filterName, data);
    window.pictures.updatePictures(container, filteredData);
  };

  window.filter = {
    show: showFilters,
    filtratePictures: filtratePictures,
    filterClickHandler: filterClickHandler
  };
})();
