(() => {

  'use strict';

  angular
    .module('HRA')
    .directive('hraAppTypes', hraAppTypes);

  function hraAppTypes() {
    let directive = {
      restrict: 'E',
      scope: {},
      controller: 'appTypesCtrl',
      controllerAs: 'appTypes',
      templateUrl: rootTemplatePath + '/components/appType/views/appTypes.view.html'
    };

    return directive;
  }

})();
