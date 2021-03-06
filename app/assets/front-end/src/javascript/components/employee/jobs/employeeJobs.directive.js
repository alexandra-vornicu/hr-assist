(function() {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------
  angular
    .module('HRA')
    .directive('hraJobs', hraJobs);

  function hraJobs() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'hraJobsCtrl',
      controllerAs: 'employeeJobs',
      templateUrl: rootTemplatePath + '/employee/views/employeeJobs.view.html',
    };
  }

})();
