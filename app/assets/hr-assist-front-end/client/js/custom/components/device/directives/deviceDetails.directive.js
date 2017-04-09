(() => {

  'use strict';

  angular
    .module('HRA')
    .directive('hraDeviceDetails', hraDeviceDetails);

  function hraDeviceDetails() {
    let directive = {
      restrict: 'E',
      scope: {},
      controller: 'deviceDetailsCtrl',
      controllerAs: 'deviceDetails',
      templateUrl: rootTemplatePath + 'components/device/views/deviceDetails.view.html'
    };

    return directive;
  }

})();
