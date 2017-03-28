'use strict';

/*jshint esversion: 6 */

var rootTemplatePath = './views/custom/';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @HRA MODULE
  // ------------------------------------------------------------------------

  angular.module('HRA', ['ngMaterial', 'ngMessages', 'ngFileUpload', 'md.data.table', 'ui.router', 'ngResource', 'ngSelectable', 'ngSanitize', 'ngCsv', 'datePicker', 'angular-loading-bar', 'permission', 'permission.ui']);

  angular.module('HRA').config(setConfig);
  angular.module('HRA').run(setRoles);

  if (location.hostname === 'localhost') {
    angular.module('HRA').constant('apiUrl', 'http://192.168.200.115:3000/api/v1');
  } else {
    angular.module('HRA').constant('apiUrl', 'http://192.168.200.115:3000/api/v1');
  }

  // ------------------------------------------------------------------------
  // @HRAssistConfig
  // ------------------------------------------------------------------------

  setConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function setConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
    // @DASHBOARD
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: rootTemplatePath + 'components/dashboard/views/dashboard.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-dashboard'
      }
    })
    // @EMPLOYEES
    .state('employeesParent', {
      url: '/employees',
      templateUrl: rootTemplatePath + 'components/employee/views/employeesParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN', 'EMPLOYEE'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('employeesParent.list', {
      url: '/list',
      template: '<hra-employees md-whiteframe="6"></hra-employees>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-employees'
      }
    }).state('employeesParent.details', {
      url: '/:id',
      template: '<hra-employee-details></hra-employee-details>',
      data: {
        permissions: {
          only: ['ADMIN', 'EMPLOYEE'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-employee-details'
      }
    }).state('employeesParent.cv', {
      url: '/:id/cv',
      template: '<hra-employee-cv></hra-employee-cv>',
      data: {
        permissions: {
          only: ['ADMIN', 'EMPLOYEE'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-employee-cv'
      }
    }).state('employeesParent.holiday', {
      url: '/:id/holiday/:holidayIndex',
      template: '<hra-employee-holiday-preview></hra-employee-holiday-preview>',
      data: {
        permissions: {
          only: ['ADMIN', 'EMPLOYEE'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-employee-holidays'
      }
    })
    // @HOLIDAYS
    .state('holidayParent', {
      url: '/holidays',
      templateUrl: rootTemplatePath + 'components/holiday/views/holidayParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('holidayParent.list', {
      url: '/list',
      template: '<hra-holidays></hra-holidays>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-holidays'
      }
    }).state('holidayParent.details', {
      url: '/:id',
      template: '<hra-holiday-details></hra-holiday-details>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-holidays-details'
      }
    })
    // @PROJECTS
    .state('projectsParent', {
      url: '/projects',
      templateUrl: rootTemplatePath + 'components/project/views/projectsParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('projectsParent.list', {
      url: '/list',
      template: '<hra-projects md-whiteframe="6"></hra-projects>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-projects'
      }
    }).state('projectsParent.details', {
      url: '/:id',
      template: '<hra-project-details></hra-project-details>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-project-details'
      }
    })
    // @SKILLS
    .state('skillsParent', {
      url: '/skills',
      templateUrl: rootTemplatePath + 'components/skill/views/skillsParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('skillsParent.list', {
      url: '/list',
      templateUrl: rootTemplatePath + 'components/skill/views/skill.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-skills'
      }
    }).state('skillsParent.details', {
      url: '/:id',
      template: '<hra-skill-details></hra-skill-details>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-skills-details'
      }
    })
    // @EQUIPMENTS
    .state('equipmentsParent', {
      url: '/equipments',
      templateUrl: rootTemplatePath + 'components/equipments/views/equipmentParentView.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('equipmentsParent.list', {
      url: '/list',
      template: '<hra-equipments md-whiteframe="6"></hra-equipments>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-equipments'
      }
    }).state('equipmentsParent.details', {
      url: '/:id',
      template: '<hra-equipment-details></hra-equipment-detail>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-equipment-details'
      }
    })
    // @CANDIDATES
    .state('candidateParent', {
      url: '/candidate',
      templateUrl: rootTemplatePath + 'components/employee/views/employeesParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('candidateParent.list', {
      url: '/list',
      template: '<hra-employees md-whiteframe="6" candidate=true></hra-employees>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-candidates'
      }
    }).state('candidateParent.details', {
      url: '/:id',
      template: '<hra-employee-details candidate=true></hra-employee-details>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-candidate-details'
      }
    }).state('candidateParent.cv', {
      url: '/:id/cv',
      template: '<hra-employee-cv candidate=true></hra-employee-cv>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-candidate-cv'
      }
    })
    // EXTRA
    .state('extraParent', {
      url: '/extra',
      templateUrl: rootTemplatePath + 'components/extra/views/extraParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('extraParent.list', {
      url: '/list',
      template: '<hra-extra-list md-whiteframe="6"></hra-extra-list>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-extras'
      }
    })
    // @INDUSTRIES
    .state('industriesParent', {
      url: '/industries',
      templateUrl: rootTemplatePath + 'components/extra/views/industriesParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('industriesParent.list', {
      url: '/list',
      template: '<hra-extra-list-industries extra="{\'type\': \'industries\'}">' + '</hra-extra-list-industries>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-industries'
      }
    })
    // @CUSTOMERS
    .state('customersParent', {
      url: '/customers',
      templateUrl: rootTemplatePath + 'components/extra/views/customersParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('customersParent.list', {
      url: '/list',
      template: '<hra-extra-list-customers extra="{\'type\': \'customers\'}">' + '</hra-extra-list-customers>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-customers'
      }
    })
    // @APP TYPES
    .state('appTypesParent', {
      url: '/appTypes',
      templateUrl: rootTemplatePath + 'components/extra/views/appTypesParent.view.html',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        }
      }
    }).state('appTypesParent.list', {
      url: '/list',
      template: '<hra-extra-list-app-types extra="{\'type\': \'appTypes\'}">' + '</hra-extra-list-app-types>',
      data: {
        permissions: {
          only: ['ADMIN'],
          except: ['isAnonymous'],
          redirectTo: 'login'
        },
        cssClassNames: 'view-app-types'
      }
    })
    // @LOGIN
    .state('login', {
      url: '/login',
      templateUrl: rootTemplatePath + 'components/login/views/login.view.html',
      data: {
        permissions: {
          only: ['isAnonymous'],
          except: ['ADMIN', 'EMPLOYEE'],
          redirectTo: getCurrentState
        },
        cssClassNames: 'view-login'
      }
    })
    // @LOGOUT
    .state('logout', {
      url: '/logout',
      resolve: {
        removeRoles: removeToken
      },
      data: {
        cssClassNames: 'view-logout'
      }
    });
  }

  // ------------------------------------------------------------------------
  // @PERMISSIONS
  // ------------------------------------------------------------------------

  setRoles.$inject = ['PermPermissionStore', 'PermRoleStore'];

  function setRoles(PermPermissionStore, PermRoleStore) {

    PermRoleStore.defineManyRoles({
      'EMPLOYEE': ['seeOwnProfileOnly'],
      'ADMIN': ['seeEverything']
    });

    PermPermissionStore.definePermission('isLoggedIn', isLoggedIn);

    PermPermissionStore.definePermission('isAnonymous', isAnonymous);

    PermPermissionStore.definePermission('seeOwnProfileOnly', seeOwnProfileOnly);

    PermPermissionStore.definePermission('seeEverything', seeEverything);
  }

  // If user is looged in
  isLoggedIn.$inject = ['tokenService'];

  function isLoggedIn(tokenService) {

    var token = tokenService.getToken('user_token');

    if (token) {

      return true;
    } else {

      return false;
    }
  }

  // Permission for LOGGED OUT ONLY
  isAnonymous.$inject = ['tokenService'];

  function isAnonymous(tokenService) {

    var token = tokenService.getToken('user_token');

    if (!token) {

      return true;
    } else {

      return false;
    }
  }

  // Permission for EMPLOYEES ONLY
  seeOwnProfileOnly.$inject = ['tokenService', '$rootScope', 'transitionProperties'];

  function seeOwnProfileOnly(tokenService, $rootScope, transitionProperties) {

    var token = tokenService.getToken('user_token');
    var decodeToken = tokenService.decodeToken(token);

    var userIdApi = ''; // user id that comes from api
    var userIdTransition = ''; // user id from state params
    var isHisProfie = null;
    var isEmployee = null;

    if (decodeToken) {
      userIdApi = parseInt(decodeToken.user_id);
      userIdTransition = parseInt(transitionProperties.toParams.id);

      // [ userIdApi ] and [ userIdTransition ] should be the same
      // in order to PREVENT an Employee
      // to access other Employee profile
      // ONLY ADMIN can access all profiles
      isHisProfie = userIdApi === userIdTransition;
      isEmployee = decodeToken.role_id === 2;

      if (isHisProfie && isEmployee) {

        toggleMenuClassesFor('EMPLOYEE');
        $rootScope.isAdmin = false;

        return true;
      } else {

        return false;
      }
    } else {

      return false;
    }
  }

  // Permission for ADMIN ONLY
  seeEverything.$inject = ['tokenService', '$rootScope'];

  function seeEverything(tokenService, $rootScope) {

    var token = tokenService.getToken('user_token');
    var decodeToken = tokenService.decodeToken(token);

    if (decodeToken && decodeToken.role_id === 1) {

      toggleMenuClassesFor('ADMIN');
      $rootScope.isAdmin = true;
      return true;
    } else {

      return false;
    }
  }

  // Removing Token.
  removeToken.$inject = ['$timeout', '$state', 'PermRoleStore', 'tokenService'];

  function removeToken($timeout, $state, PermRoleStore, tokenService) {

    // Removing token / Set an empty one
    tokenService.setAuthToken();

    // Redirecting to login
    $timeout(function () {
      $state.go('login');
    }, 1);
  }

  // @PERMISSIONS @END PERMISSIONS
  // ------------------------------------------------------------------------


  // Toggle menu extra classes for ADMIN or EMPLOYEE
  function toggleMenuClassesFor(menuType) {

    var $body = angular.element(document.getElementsByTagName('body'));

    if (menuType === 'ADMIN') {

      $body.removeClass('pages-employee pages-admin');
      $body.addClass('pages-admin');
    } else if (menuType === 'EMPLOYEE') {

      $body.removeClass('pages-employee pages-admin');
      $body.addClass('pages-employee');
    }
  }

  getCurrentState.$inject = ['$state'];

  function getCurrentState($state) {

    if ($state.current.name) {
      return $state.current.name;
    } else {
      $state.current.name = 'logout';
      $state.go('logout');
      return null;
    }
  }
})();
'use strict';

// autocomplete service
// ------------------------------------------------------------------------
angular.module('HRA').service('autocompleteService', autocompleteService);

autocompleteService.$inject = [];

function autocompleteService() {

  // Public methods
  // ------------------------------------------------------------------------
  return {
    querySearch: querySearch,
    buildList: buildList
  };

  // Public methods declaration
  // ------------------------------------------------------------------------
  function querySearch(query, list) {
    var results = query ? list.filter(createFilterFor(query)) : list;
    return results;
  }

  //  Build `components` list of key/value pairs
  function buildList(list, attributes) {
    var index = 0;
    return list.map(function (item) {
      item.autoCompleteVal = '';
      for (index = 0; index < attributes.length; index++) {
        if (index !== 0) {
          item.autoCompleteVal = item.autoCompleteVal + ' ' + item[attributes[index]].toLowerCase();
        } else {
          item.autoCompleteVal = item.autoCompleteVal + item[attributes[index]].toLowerCase();
        }
      }

      return item;
    });
  }

  // Private methods declaration
  // ------------------------------------------------------------------------
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(item) {
      return item.autoCompleteVal.indexOf(lowercaseQuery) === 0;
    };
  }
}
'use strict';

// autocomplete service
// ------------------------------------------------------------------------
angular.module('HRA').service('getIdsService', getIdsService);

getIdsService.$inject = [];

function getIdsService() {

  // Public methods
  // ------------------------------------------------------------------------
  return {
    getIds: getIds
  };

  // Public methods declaration
  // ------------------------------------------------------------------------
  function getIds(list) {
    if (list.length > 0) {
      list = list.map(function (item) {
        return parseInt(item.id);
      });
    } else {
      list = [];
    }
    return list;
  }
}
'use strict';

// spliceArray service
// ------------------------------------------------------------------------
angular.module('HRA').service('miscellaneousService', miscellaneousService);

miscellaneousService.$inject = [];

function miscellaneousService() {

  // Public methods
  // ------------------------------------------------------------------------
  return {
    getItemIndex: getItemIndex
  };

  // Public methods declaration
  // ------------------------------------------------------------------------
  function getItemIndex(array, id) {
    var itemToRemoveIndex = array.map(function (item) {
      return item.id;
    }).indexOf(parseInt(id));

    return itemToRemoveIndex;
  }
}
'use strict';

(function () {
  'use strict';

  function StoreObj() {

    var store = {};

    this.setObject = function (oBj) {
      store = oBj;
    };

    this.getObject = function () {
      return store;
    };
  }

  angular.module('HRA').service('StoreObj', StoreObj);
})();
'use strict';

(function () {

  'use strict';

  function Callback($mdToast, $rootScope) {
    return {
      success: function success(message) {
        $rootScope.showToast(message || 'Success!');
      },
      error: function error(message) {
        $rootScope.showToast(message || 'Failed!');
      }
    };
  }

  Callback.$inject = ['$mdToast', '$rootScope'];
  angular.module('HRA').factory('Callback', Callback);
})();
'use strict';

(function () {

	'use strict';

	function listEquipmentsFactory() {

		return {
			getByParam: function getByParam(info) {
				return $http.post(url, data);
			}
		};
	}

	listEquipmentsFactory.$inject = ['$http', '$resource'];

	angular.module('HRA').factory('listDetailsEquipments', listEquipmentsFactory);
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // set Interceptors
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['tokenService'];

  function AuthInterceptor(tokenService) {

    return {
      request: addToken
    };

    function addToken(config) {
      var token = tokenService.getToken('auth_token');

      if (token) {
        config.headers = config.headers || {};
        config.headers.token = token;
      }
      return config;
    }
  }
})();
'use strict';

/*jshint esversion: 6 */

(function () {

  'use strict';

  // GET/SET token
  // ------------------------------------------------------------------------

  angular.module('HRA').service('tokenService', tokenService);

  tokenService.$inject = ['apiUrl', '$window'];

  function tokenService(apiUrl, $window) {
    var store = $window.localStorage;
    var userToken = 'user_token';
    var authToken = 'auth_token';

    // Public API here
    return {
      setTokens: setTokens,
      getToken: getToken,
      decodeToken: decodeToken
    };

    function setTokens(tokens) {
      // var authToken = store.getItem('auth_token');
      // var userToken = store.getItem('user_token');
      // debugger;

      if (tokens) {
        store.setItem(userToken, tokens[0]);
        store.setItem(authToken, tokens[1]);
      } else {
        store.removeItem(userToken);
        store.removeItem(authToken);
      }
    }

    function getToken(type) {
      return store.getItem(type);
    }

    function decodeToken(token) {
      if (token) {
        var base64Url = '';
        var base64 = '';

        base64Url = token.split('.')[1];
        base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse($window.atob(base64));
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // login services request
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$q', '$http', 'apiUrl', '$window', '$resource'];

  function UserFactory($q, $http, apiUrl, $window, $resource) {

    // Public API here
    return {
      login: login
    };

    function login(username, password) {
      var myInfo = {};
      myInfo.email = username;
      myInfo.password = password;

      function promise(resolve, reject) {
        loginMethod(myInfo).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    }

    function loginMethod(data) {
      var url = apiUrl + "/login";
      return $resource(url).save(data);
    }
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('appType', appType);

  appType.$inject = ['$q', '$resource', 'apiUrl'];

  function appType($q, $resource, apiUrl) {

    function applicationType() {
      this.projects = projects || [];
    }
    var url = '';
    var projects;

    // Static methods asigned to class
    // ------------------------------------------------------------------------
    applicationType.create = function (data) {

      return angular.extend(new applicationType(), data);
    };

    applicationType.getAll = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getProjectData().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(applicationType.create(item));
          });
          return resolve(processed);
        }, function (err) {
          console.log("Something wrong", err);
        });
      }
      return $q(promise);
    };

    applicationType.saveAll = function (data) {
      function promise(resolve, reject) {
        saveProjectData(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject("wut", error);
        });
      }
      return $q(promise);
    };

    applicationType.remove = function (id) {
      function promise(resolve, reject) {
        removeProjectData(id).$promise.then(function (id) {
          return resolve('Project was deleted successfuly!');
        }, function (error) {
          return reject('Something gone wrong! ( ', error, ' )');
        });
      }

      return $q(promise);
    };

    applicationType.update = function (data) {
      function promise(resolve, reject) {
        updateProjectData(data).$promise.then(function (data) {
          resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    applicationType.getFromApi = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAppTypeFromApi().$promise.then(function (data) {
          raw = data.applicationTypes;
          angular.forEach(raw, function (item, index) {
            processed.push({
              name: item
            });
          });
          saveProjectData(processed);
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------

    function getProjectData() {
      url = apiUrl + "/applicationtype";
      return $resource(url).query();
    }

    function getProjectDataById(id) {
      url = apiUrl + "/applicationtype/" + id;
      return $resource(url).get();
    }

    function saveProjectData(data) {
      url = apiUrl + "/applicationtype";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function updateProjectData(appToUpdate) {
      url = apiUrl + "/applicationtype/" + appToUpdate.id;

      return $resource(url, appToUpdate, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeProjectData(appToRemove) {
      url = apiUrl + "/applicationtype";
      return $resource(url).delete(appToRemove);
    }

    function getAppTypeFromApi() {
      url = 'https://assist-software.net/api/technologiesandapplicationtypes';
      return $resource(url).get();
    }

    return applicationType;
  }
})();
'use strict';

(function () {

  'use strict';

  // customer Model
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('customerModel', customerModel);

  customerModel.$inject = ['$resource', '$q', 'apiUrl'];

  function customerModel($resource, $q, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function customerModel() {}
    var url = '';

    // angular.extend(Equipments.prototype, {
    //   getFullName: function() {
    //     return this.name + ' ' + this.description;
    //   }
    // });


    // Static methods asigned to class
    // ------------------------------------------------------------------------
    customerModel.create = function (data) {
      return angular.extend(new customerModel(), data);
    };

    customerModel.getAllCustomers = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAllCustomers().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(customerModel.create(item));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    customerModel.save = function (data) {
      function promise(resolve, reject) {
        saveCustomer(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    customerModel.getFromApi = function () {
      var raw = [];
      var processed = [];
      // getAllIndustries();

      function promise(resolve, reject) {
        getIndustryFromApi().$promise.then(function (data) {
          raw = data.customers;
          //console.log(raw);
          angular.forEach(raw, function (item, index) {
            processed.push({
              name: item
            });
          });
          //removeIndustry();
          saveCustomer(processed);
          //console.log(processed);
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------

    function getAllCustomers() {
      url = apiUrl + "/customer";
      return $resource(url).query();
    }

    function saveCustomer(data) {
      url = apiUrl + "/customer";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function getIndustryFromApi() {
      url = 'https://assist-software.net/api/technologiesandapplicationtypes';
      return $resource(url).get();
    }

    function removeCustomer(customer) {
      url = apiUrl + "/customer";
      return $resource(url).delete(customer);
    }

    return customerModel;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('Employee', Employee);

  Employee.$inject = ['$q', '$resource', 'apiUrl'];

  function Employee($q, $resource, apiUrl) {

    var url = '';
    var holidayTransferIndex = 0;

    // ----------------------------------------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------------------------------------

    function Employee(employee) {
      // GENERAL INFO
      this.firstName = employee.firstName ? employee.firstName : '';
      this.middleName = employee.middleName ? employee.middleName : '';
      this.lastName = employee.lastName ? employee.lastName : '';
      this.address = employee.address ? employee.address : null;
      this.phone = employee.phone ? employee.phone : undefined;
      this.emailAssist = employee.emailAssist ? employee.emailAssist : undefined;
      this.emailOther = employee.emailOther ? employee.emailOther : undefined;
      this.urgentContact = employee.urgentContact ? employee.urgentContact : {};

      // JOB RELATED
      this.status = employee.status ? employee.status : true;
      this.jobTitle = employee.jobTitle ? employee.jobTitle : '';
      this.dateOfEmployment = employee.dateOfEmployment ? employee.dateOfEmployment : new Date();
      this.languages = employee.languages ? employee.languages : [];
      this.education = employee.education ? employee.education : [];
      this.diplomas = employee.diplomas ? employee.diplomas : [];
      this.coursesAndCertifications = employee.coursesAndCertifications ? employee.coursesAndCertifications : [];
      this.schedule = employee.schedule ? employee.schedule : [];
      this.department = employee.department ? employee.department : '';
      this.holidays = employee.holidays ? employee.holidays : [];
      this.skills = employee.skills ? employee.skills : [];
      this.skillsLevel = employee.skillsLevel ? employee.skillsLevel : [];
      this.equipments = employee.equipments ? employee.equipments : [];
      this.projects = employee.projects ? employee.projects : [];
    }

    // ----------------------------------------------------------------------
    // PUBLIC METHODS ASIGNED TO PROTOTYPE
    // ----------------------------------------------------------------------

    angular.extend(Employee.prototype, {
      getFullName: function getFullName() {
        return this.firstName + ' ' + this.lastName;
      }
    });

    // ----------------------------------------------------------------------
    // STATIC METHODS ASIGNED TO CLASS
    // ----------------------------------------------------------------------
    Employee.create = function (data) {
      return angular.extend(new Employee(data), data);
    };

    Employee.addIndex = function (clickedIndex) {
      holidayTransferIndex = clickedIndex;
    };

    Employee.getIndex = function () {
      return holidayTransferIndex;
    };

    Employee.getAll = function (candidate) {
      var raw = [];
      var processed = [];
      var newItem = {};

      function promise(resolve, reject) {
        getAllEmployees(candidate).$promise.then(function (data) {
          raw = data;

          angular.forEach(raw, function (item, index) {
            processed.push(Employee.create(item));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    Employee.getById = function (id, candidate) {
      function promise(resolve, reject) {
        getEmployeeById(id, candidate).$promise.then(function (data) {
          return resolve(Employee.create(data));
        }, function (error) {
          return reject('Something gone wrong: ', error);
        });
      }

      return $q(promise);
    };

    Employee.save = function (data, candidate) {
      function promise(resolve, reject) {
        saveEmployee(data, candidate).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Employee.savefromJson = function (data, candidate) {
      function promise(resolve, reject) {
        saveFromJson(data, candidate).$promise.then(function (data) {
          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    Employee.remove = function (id, candidate) {
      function promise(resolve, reject) {
        removeEmployee(id, candidate).$promise.then(function (id) {
          return resolve('User was deleted successfuly!');
        }, function (error) {
          return reject('Something gone wrong! ( ', error, ' )');
        });
      }

      return $q(promise);
    };

    Employee.update = function (data, candidate) {
      // De investigat de ce cand skills e empty nu face update
      function promise(resolve, reject) {
        updateEmployee(data, candidate).$promise.then(function (data) {
          resolve('User was updated successfuly!');
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Employee.getLanguages = function () {

      function promise(resolve, reject) {
        getAllLanguages().$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    // ----------------------------------------------------------------------
    // PRIVATE METHODS
    // ----------------------------------------------------------------------

    function getAllEmployees(candidate) {
      if (candidate) {
        url = apiUrl + "/candidate";
      } else {
        url = apiUrl + "/users";
      }

      return $resource(url).query();
    }

    function getEmployeeById(id, candidate) {
      if (candidate) {
        url = apiUrl + "/candidate/" + id;
      } else {
        url = apiUrl + "/users/" + id;
      }

      return $resource(url).get();
    }

    function saveEmployee(data, candidate) {
      if (candidate) {
        url = apiUrl + "/candidate";
      } else {
        url = apiUrl + "/employee";
      }

      return $resource(url).save(data);
    }

    function saveFromJson(data, candidate) {
      if (candidate) {
        url = apiUrl + "/candidate";
      } else {
        url = apiUrl + "/employee";
      }

      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function updateEmployee(employeeToUpdate, candidate) {
      if (candidate) {
        url = apiUrl + "/candidate/" + employeeToUpdate.id;
      } else {
        url = apiUrl + "/employee/" + employeeToUpdate.id;
      }

      if (employeeToUpdate.skills) {
        employeeToUpdate.skills = employeeToUpdate.skills.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        employeeToUpdate.skills = null;
      }
      if (employeeToUpdate.projects) {
        employeeToUpdate.projects = employeeToUpdate.projects.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        employeeToUpdate.projects = null;
      }

      if (employeeToUpdate.equipments) {
        employeeToUpdate.equipments = employeeToUpdate.equipments.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        employeeToUpdate.equipments = null;
      }

      if (employeeToUpdate.holidays) {
        employeeToUpdate.holidays = employeeToUpdate.holidays.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        employeeToUpdate.holidays = null;
      }

      return $resource(url, employeeToUpdate, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeEmployee(employeeToRemove, candidate) {
      if (candidate) {
        url = apiUrl + "/candidate";
      } else {
        url = apiUrl + "/employee";
      }

      return $resource(url).delete(employeeToRemove);
    }

    function getAllLanguages() {
      url = rootTemplatePath + "/_common/data/languages.json";
      return $resource(url).query();
    }

    return Employee;
  }
})();
'use strict';

(function () {

  'use strict';

  // equipmentsModel
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('Equipments', equipmentsModel);

  equipmentsModel.$inject = ['$resource', '$q', 'apiUrl'];

  function equipmentsModel($resource, $q, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Equipments() {}
    var url = '';

    angular.extend(Equipments.prototype, {
      getFullName: function getFullName() {
        return this.name + ' ' + this.description;
      }
    });

    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Equipments.create = function (data) {
      return angular.extend(new Equipments(), data);
    };

    Equipments.list = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAllEquipments().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(Equipments.create(item));
          });

          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    Equipments.save = function (data) {
      function promise(resolve, reject) {
        saveEquipments(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Equipments.saveJson = function (data) {
      function promise(resolve, reject) {
        saveFromJson(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Equipments.remove = function (id) {
      function promise(resolve, reject) {
        removeEquipments(id).$promise.then(function (id) {
          return resolve('User was deleted successfuly!');
        }, function (error) {
          return reject('Something gone wrong! ( ', error, ' )');
        });
      }

      return $q(promise);
    };

    Equipments.update = function (data) {
      if (data.ownerss != undefined) {
        data.ownerss = data.ownerss.map(function (item) {
          return item.id;
        });
      }

      function promise(resolve, reject) {
        updateEquipments(data).$promise.then(function (data) {
          resolve('User was updated successfuly!');
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Equipments.getEquipmentsById = function (id) {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getEquipmentsById(id).$promise.then(function (data) {
          return resolve(Equipments.create(data));
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------

    function getAllEquipments() {
      url = apiUrl + "/equipment";
      return $resource(url).query();
    }

    function saveEquipments(data) {
      url = apiUrl + "/equipment";
      return $resource(url).save(data);
    }

    function updateEquipments(equipmentToUpdate) {
      url = apiUrl + "/equipment/" + equipmentToUpdate.id;
      return $resource(url, equipmentToUpdate, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function saveFromJson(data) {
      url = apiUrl + "/equipment";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function removeEquipments(equipmentToRemove) {
      console.log(equipmentToRemove);
      url = apiUrl + "/equipment";
      return $resource(url).delete(equipmentToRemove);
    }

    function getEquipmentsById(id) {
      url = apiUrl + "/equipment/" + id;
      return $resource(url).get();
    }

    return Equipments;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('ExtraModel', ExtraModel);

  ExtraModel.$inject = ['$q', '$resource', 'skillModel', 'Equipments', 'apiUrl'];

  function ExtraModel($q, $resource, skillModel, Equipments, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Extra(employee) {}
    var url = '';
    var holidayTransferIndex = 0;

    // Public methods asigned to prototype
    // ------------------------------------------------------------------------


    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Extra.getAllExtra = function (extraType) {
      function promise(resolve, reject) {
        getAllExtra(extraType).$promise.then(function (data) {

          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Extra.save = function (data, extraType) {
      function promise(resolve, reject) {
        save(data, extraType).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Extra.update = function (data, extraType) {
      function promise(resolve, reject) {
        updateExtra(data, extraType).$promise.then(function (data) {
          //resolve(data);
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };

    Extra.remove = function (id, extraType) {
      function promise(resolve, reject) {
        removeExtra(id, extraType).$promise.then(function (id, extraType) {
          return resolve('User was deleted successfuly!');
        }, function (error) {
          return reject('Something gone wrong! ( ', error, ' )');
        });
      }

      return $q(promise);
    };

    Extra.savefromJson = function (data, extraType) {
      function promise(resolve, reject) {
        saveFromJson(data, extraType).$promise.then(function (data) {
          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------
    function getAllExtra(extraType) {
      url = getURL(extraType);
      return $resource(url).query();
    }

    function save(data, extraType) {
      url = getURL(extraType);
      return $resource(url).save(data);
    }

    function updateExtra(data, extraType) {
      url = getURL(extraType);
      var url2 = url + '/' + data.id;
      return $resource(url2, data, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeExtra(id, extraType) {

      url = getURL(extraType);
      return $resource(url).delete(id);
    }

    function saveFromJson(data, extraType) {
      url = getURL(extraType);

      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function getURL(extraType) {
      var appUrl = '';

      switch (extraType) {
        case 'industries':
          appUrl = apiUrl + "/industry";
          break;

        case 'appTypes':
          appUrl = apiUrl + "/applicationtype";
          break;

        case 'customers':
          appUrl = apiUrl + "/customer";
          break;

        default:
          break;
      }

      return appUrl;
    }

    return Extra;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('HolidayModel', HolidayModel);

  HolidayModel.$inject = ['$q', '$resource', 'Employee', 'apiUrl'];

  function HolidayModel($q, $resource, Employee, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Holiday(employeeName, employee) {
      this.employee = employee || [];
    }
    var url = '';

    // Public methods asigned to prototype
    // ------------------------------------------------------------------------
    angular.extend(Holiday.prototype, {
      getFullName: function getFullName() {
        return this.firstName + ' ' + this.lastName;
      }
    });

    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Holiday.create = function (data) {
      return angular.extend(new Holiday(), data);
    };

    Holiday.getAll = function () {
      var raw = [];
      var processed = [];
      var newItem = {};

      function promise(resolve, reject) {
        getAllHolidays().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(Holiday.create(item));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    Holiday.getHolidayById = function (id) {
      function promise(resolve, reject) {
        getHolidayById(id).$promise.then(function (data) {
          return resolve(Holiday.create(data));
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    Holiday.save = function (data) {
      function promise(resolve, reject) {
        saveHoliday(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Holiday.savefromJson = function (data) {
      function promise(resolve, reject) {
        saveFromJson(data).$promise.then(function (data) {
          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    Holiday.remove = function (id) {
      function promise(resolve, reject) {
        removeHoliday(id).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Holiday.update = function (data) {
      function promise(resolve, reject) {
        updateHoliday(data).$promise.then(function (data) {
          resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------
    function getAllHolidays() {
      url = apiUrl + "/holiday";
      return $resource(url).query();
    }

    function getHolidayById(id) {
      url = apiUrl + "/holiday/" + id;
      return $resource(url).get();
    }

    function saveHoliday(data) {

      if (data.replacementEmployees) {
        data.replacementEmployees = data.replacementEmployees.map(function (item) {
          return parseInt(item.id);
        });
      }

      if (data.replacementProjects) {
        data.replacementProjects = data.replacementProjects.map(function (item) {
          return parseInt(item.id);
        });
      }

      if (data.employee) {
        data.employee = data.employee.id;
      }

      if (data.teamLeader) {
        data.teamLeader = data.teamLeader.id;
      }

      url = apiUrl + "/holiday";

      return $resource(url).save(data);
    }

    function saveFromJson(data) {

      url = apiUrl + "/holiday";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function updateHoliday(data) {

      url = apiUrl + "/holiday/" + data.id;

      if (data.replacementEmployees) {
        data.replacementEmployees = data.replacementEmployees.map(function (item) {
          return parseInt(item.id);
        });
      }

      if (data.replacementProjects) {
        data.replacementProjects = data.replacementProjects.map(function (item) {
          return parseInt(item.id);
        });
      }

      if (data.employee) {
        data.employee = data.employee.id;
      }

      if (data.teamLeader) {
        data.teamLeader = data.teamLeader.id;
      }

      return $resource(url, data, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeHoliday(holidayToRemove) {
      url = apiUrl + "/holiday";
      return $resource(url).delete(holidayToRemove);
    }

    return Holiday;
  }
})();
'use strict';

(function () {

  'use strict';

  // industriesModel
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('Industries', industriesModel);

  industriesModel.$inject = ['$resource', '$q', 'apiUrl'];

  function industriesModel($resource, $q, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Industries() {}
    var url = '';

    // angular.extend(Equipments.prototype, {
    //   getFullName: function() {
    //     return this.name + ' ' + this.description;
    //   }
    // });


    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Industries.create = function (data) {
      return angular.extend(new Industries(), data);
    };

    Industries.getAllIndustries = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAllIndustries().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(Industries.create(item));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    Industries.save = function (data) {
      function promise(resolve, reject) {
        saveIndustry(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Industries.getFromApi = function () {
      var raw = [];
      var processed = [];
      // getAllIndustries();

      function promise(resolve, reject) {
        getIndustryFromApi().$promise.then(function (data) {
          //console.log("data ", data);
          raw = data.industries;
          //console.log(raw);
          angular.forEach(raw, function (item, index) {
            processed.push({
              name: item
            });
          });
          //removeIndustry();
          saveIndustry(processed);
          //console.log(processed);
          return resolve(processed);
        }, function (error) {
          console.log(error.status);
          return reject('Something gone wrong!');
        });
      }

      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------

    function getAllIndustries() {
      url = apiUrl + "/industry";
      return $resource(url).query();
    }

    function saveIndustry(data) {
      url = apiUrl + "/industry";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function getIndustryFromApi() {
      url = 'https://assist-software.net/api/technologiesandapplicationtypes';
      return $resource(url).get();
    }

    function removeIndustry(industry) {
      url = apiUrl + "/industry";
      return $resource(url).delete(industry);
    }

    return Industries;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('ProjectModel', ProjectModel);

  ProjectModel.$inject = ['Employee', '$q', '$resource', 'customerModel', 'Industries', 'appType', 'getIdsService', 'apiUrl'];

  function ProjectModel(Employee, $q, $resource, customerModel, Industries, appType, getIdsService, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Project(employees, manager, startDate, deadline, applicationTypes, industries, customers, technologies, mainActivities, projectUrl, description) {
      this.manager = manager || "";
      this.employees = employees || [];
      this.startDate = new Date();
      this.deadline = new Date();
      this.applicationTypes = applicationTypes || [];
      this.industries = industries || [];
      this.description = description || "";
      this.customers = customers || [];
      this.technologies = technologies || [];
      this.mainActivities = mainActivities || [];
      this.projectUrl = projectUrl || "";
    }

    var url = '';
    var employees;
    var customers = [];
    var industries = [];
    var applicationTypes = [];

    // Static methods asigned to class
    // ------------------------------------------------------------------------

    Project.create = function (data) {
      return angular.extend(new Project(), data);
    };

    Project.getAll = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAllProjects().$promise.then(function (data) {
          raw = data;
          Employee.getAll().then(function (data) {
            angular.forEach(raw, function (item, index) {
              employees = data;
              if (item.employees[0] === '') {
                item.employees = [];
              }
              processed.push(Project.create(item));
              return resolve(processed);
            });
          }, function (data) {});
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    Project.getProjectById = function (id) {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getProjectById(id).$promise.then(function (data) {
          return resolve(Project.create(data));
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    Project.getTecho = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getProjectsFromApi().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(item.technologies);
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    getCustomers();
    Project.getFromApi = function (app, ind, cust, technologies) {
      var raw = [];
      var processed = [];
      var numb = [];
      var indAccumulator = [];
      var appAccumulator = [];
      var technologiesAccumulator = [];
      var temp1 = [];
      var temp2 = [];
      var temp3 = [];
      var temp4 = []; // Used to technologies
      customers = cust;
      industries = ind;
      applicationTypes = app;

      function promise(resolve, reject) {
        getProjectsFromApi().$promise.then(function (data) {
          getCustomers();
          raw = data;
          angular.forEach(raw, function (itm, indexx) {
            angular.forEach(customers, function (item, index) {
              for (var q = 0; q < itm.customers.length; q++) {
                if (item.name === itm.customers[q]) temp1.push(item.id);
              }
            });
            numb[indexx] = temp1;
            temp1 = [];
            angular.forEach(industries, function (item, index) {
              for (var w = 0; w < itm.industries.length; w++) {
                if (item.name === itm.industries[w]) temp2.push(item.id);
              }
            });
            indAccumulator[indexx] = temp2;
            temp2 = [];
            angular.forEach(applicationTypes, function (item, index) {
              for (var p = 0; p < itm.applicationTypes.length; p++) {
                if (item.name === itm.applicationTypes[p]) temp3.push(item.id);
              }
            });
            appAccumulator[indexx] = temp3;
            temp3 = [];
            // Save technologies
            angular.forEach(technologies, function (item, index) {
              for (var techIndex = 0; techIndex < itm.technologies.length; techIndex++) {
                var ceva = [];
                if (item.name === itm.technologies[techIndex]) {
                  temp4.push(parseInt(item.id));
                }
              }
            });
            technologiesAccumulator[indexx] = temp4;
            temp4 = [];
          });

          angular.forEach(raw, function (item, index) {

            processed.push(Project.create({
              name: item.name,
              //description: item.description,
              industries: indAccumulator[index],
              customers: numb[index],
              technologies: technologiesAccumulator[index],
              projectUrl: item.projectUrl,
              mainActivities: item.mainActivities,
              applicationTypes: appAccumulator[index]
            }));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };
    Project.save = function (data) {
      function promise(resolve, reject) {
        saveProject(data).$promise.then(function (data) {
          getProjectById(data.id).$promise.then(function (data) {
            return resolve(data);
          }, function (error) {
            return reject('Something gone wrong!');
          });
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };

    Project.savefromJson = function (data) {
      function promise(resolve, reject) {
        saveFromJson(data).$promise.then(function (data) {
          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    Project.saveApi = function (projectsToUpdate) {
      function promise(resolve, reject) {
        saveFromApi(projectsToUpdate).$promise.then(function (data) {

          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    Project.remove = function (id) {
      function promise(resolve, reject) {
        removeProject(id).$promise.then(function (id) {
          return resolve('Project was deleted successfuly!');
        }, function (error) {
          return reject('Something gone wrong! ( ', error, ' )');
        });
      }
      return $q(promise);
    };
    Project.update = function (data) {
      function promise(resolve, reject) {
        updateProject(data).$promise.then(function (data) {
          resolve(data);
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };
    // Private methods
    // ------------------------------------------------------------------------
    function getAllProjects() {
      url = apiUrl + "/projects";
      return $resource(url).query();
    }

    function getCustomers() {
      customerModel.getAllCustomers().then(function (data) {
        customers = data;
        getIndustries();
        getAppData();
      }, function (error) {});
    }

    function getIndustries() {
      Industries.getAllIndustries().then(function (data) {
        industries = data;
      }, function (error) {});
    }

    function getAppData() {
      appType.getAll().then(function (data) {
        applicationTypes = data;
      }, function (data) {
        console.log("err", data);
      });
    }

    function getProjectsFromApi() {
      url = 'https://assist-software.net/api/projects/getprojects';
      return $resource(url).query();
    }

    function getProjectById(id) {
      url = apiUrl + "/project/" + id;
      return $resource(url).get();
    }

    function saveProject(data) {
      if (data.employees) {
        data.employees = data.employees.map(function (item) {
          return parseInt(item.id);
        });
      }
      url = apiUrl + "/project";
      return $resource(url).save(data);
    }

    function saveFromJson(data) {
      url = apiUrl + "/project";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function saveFromApi(data) {
      url = apiUrl + "/project";
      return $resource(url, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function updateProject(projectToUpdate) {
      url = apiUrl + "/project/" + projectToUpdate.id;

      // @!TODO: De folosit serviciul getIdsService la toate modelele
      projectToUpdate.technologies = getIdsService.getIds(projectToUpdate.technologies);

      if (projectToUpdate.industries) {
        projectToUpdate.industries = projectToUpdate.industries.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        projectToUpdate.industries = [];
      }

      if (projectToUpdate.customers) {
        projectToUpdate.customers = projectToUpdate.customers.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        projectToUpdate.customers = [];
      }

      if (projectToUpdate.applicationTypes) {
        projectToUpdate.applicationTypes = projectToUpdate.applicationTypes.map(function (item) {
          return parseInt(item.id);
        });
      } else {
        projectToUpdate.applicationTypes = [];
      }

      if (projectToUpdate.employees) {
        projectToUpdate.employees = projectToUpdate.employees.map(function (item) {
          return parseInt(item.id);
        });
      }

      return $resource(url, projectToUpdate, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeProject(projectToRemove) {
      url = apiUrl + "/project";
      return $resource(url).delete(projectToRemove);
    }

    return Project;
  }
})();
'use strict';

(function () {

  'use strict';

  angular.module('HRA').factory('TrainingModel', TrainingModel);

  TrainingModel.$inject = ['$q', '$resource', 'apiUrl'];

  function TrainingModel($q, $resource, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Training(training) {}
    var url = '';

    // Public methods asigned to prototype
    // ------------------------------------------------------------------------


    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Training.getAll = function () {
      function promise(resolve, reject) {
        getAllTrainings().$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Training.save = function (data) {
      function promise(resolve, reject) {
        save(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    Training.update = function (data) {
      function promise(resolve, reject) {
        updateTraining(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };

    Training.remove = function (id, extraType) {
      function promise(resolve, reject) {
        removeTraining(id).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    // Private methods
    // ------------------------------------------------------------------------
    function getAllExtra(extraType) {
      url = apiUrl + "/training";
      return $resource(url).query();
    }

    function save(data, extraType) {
      url = apiUrl + "/training";
      return $resource(url).save(data);
    }

    function updateExtra(data, extraType) {
      url = apiUrl + "/training" + '/' + data.id;
      return $resource(url, data, {
        'update': {
          method: 'PUT'
        }
      }).save();
    }

    function removeExtra(id) {
      url = apiUrl + "/training";
      return $resource(url).delete(id);
    }

    return Extra;
  }
})();
'use strict';

(function () {

  'use strict';

  // skillModel
  // ------------------------------------------------------------------------

  angular.module('HRA').factory('skillModel', skillModel);

  skillModel.$inject = ['$resource', '$q', 'apiUrl'];

  function skillModel($resource, $q, apiUrl) {

    // Constructor
    // ------------------------------------------------------------------------
    function Skill() {}
    var url = '';

    //Private methods
    // ------------------------------------------------------------------------

    function getAllSkills() {
      url = apiUrl + "/technologies";
      return $resource(url).query();
    }

    function getSkillById(id) {
      url = apiUrl + "/skill/" + id;
      return $resource(url).get();
    }

    function saveSkill(data) {
      url = apiUrl + "/skill";
      return $resource(url).save(data);
    }

    function updateSkill(skillToUpdate) {
      url = apiUrl + "/skill/" + skillToUpdate.id;
      return $resource(url, skillToUpdate, {
        'update': {
          method: 'PUT'
        }

      }).save();
    }

    function saveJson(data) {
      url = apiUrl + "/skill";
      return $resource(url, data, {
        'save': {
          method: 'POST',
          isArray: true
        }
      }).save(data);
    }

    function removeSkill(skillToRemove) {
      url = apiUrl + "/skill";
      return $resource(url).delete(skillToRemove);
    }

    // Static methods asigned to class
    // ------------------------------------------------------------------------
    Skill.create = function (data) {
      return angular.extend(new Skill(), data);
    };

    Skill.getAll = function () {
      var raw = [];
      var processed = [];

      function promise(resolve, reject) {
        getAllSkills().$promise.then(function (data) {
          raw = data;
          angular.forEach(raw, function (item, index) {
            processed.push(Skill.create(item));
          });
          return resolve(processed);
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    Skill.save = function (data) {
      function promise(resolve, reject) {
        saveSkill(data).$promise.then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };

    Skill.saveJsons = function (data) {
      function promise(resolve, reject) {
        saveJson(data).$promise.then(function (data) {
          return resolve(data);
        }, function (err) {
          return reject(err);
        });
      }
      return $q(promise);
    };

    Skill.update = function (data) {
      data.owners = data.owners.map(function (item) {
        return item.id;
      });

      function promise(resolve, reject) {
        updateSkill(data).$promise.then(function (data) {
          resolve('The skill has been updated!');
        }, function (error) {
          return reject(error);
        });
      }
      return $q(promise);
    };

    Skill.remove = function (id) {
      function promise(resolve, reject) {
        removeSkill(id).$promise.then(function (id) {
          return resolve('The skill has been deleted!');
        }, function (error) {
          return reject('Something gone wrong!');
        });
      }
      return $q(promise);
    };

    return Skill;
  }
})();
'use strict';

(function (rootTemplatePath) {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraDateSelect
  // ------------------------------------------------------------------------

  // https://www.bennadel.com/blog/2969-passing-ngmodelcontroller-into-a-component-directive-controller-in-angularjs.htm

  angular.module('HRA').directive('hraDateSelect', hraDateSelect);

  function hraDateSelect() {

    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: rootTemplatePath + '/_common/dateSelect/dateSelect.view.html',
      require: 'ngModel',

      link: function link(scope, elem, attrs, model) {

        scope.val = {};

        var min = scope.min = moment(attrs.min || '1920-01-01');
        var max = scope.max = moment(attrs.max); // Defaults to now

        scope.years = [];

        for (var i = max.year(); i >= min.year(); i--) {

          scope.years.push(i);
        }

        scope.$watch('val.year', function () {

          updateMonthOptions();
        });

        scope.$watchCollection('[val.month, val.year]', function () {

          updateDateOptions();
        });

        scope.$watchCollection('[val.date, val.month, val.year]', function () {

          if (scope.val.year && scope.val.month && scope.val.date) {

            var m = moment([scope.val.year, scope.val.month - 1, scope.val.date]);
            model.$setViewValue(m.format('YYYY-MM-DD'));
          } else {

            model.$setViewValue();
          }
        });

        function updateMonthOptions() {

          // Values begin at 1 to permit easier boolean testing
          scope.months = [];

          var minMonth = scope.val.year && min.isSame([scope.val.year], 'year') ? min.month() : 0;
          var maxMonth = scope.val.year && max.isSame([scope.val.year], 'year') ? max.month() : 11;

          var monthNames = moment.months();

          for (var j = minMonth; j <= maxMonth; j++) {

            scope.months.push({

              name: monthNames[j],
              value: j + 1

            });
          }

          if (scope.val.month - 1 > maxMonth || scope.val.month - 1 < minMonth) {

            delete scope.val.month;
          }
        }

        function updateDateOptions() {

          var minDate, maxDate;

          if (scope.val.year && scope.val.month && min.isSame([scope.val.year, scope.val.month - 1], 'month')) {

            minDate = min.date();
          } else {

            minDate = 1;
          }

          if (scope.val.year && scope.val.month && max.isSame([scope.val.year, scope.val.month - 1], 'month')) {

            maxDate = max.date();
          } else if (scope.val.year && scope.val.month) {

            maxDate = moment([scope.val.year, scope.val.month - 1]).daysInMonth();
          } else {

            maxDate = 31;
          }

          scope.dates = [];

          for (var i = minDate; i <= maxDate; i++) {

            scope.dates.push(i);
          }

          if (scope.val.date < minDate || scope.val.date > maxDate) {

            delete scope.val.date;
          }
        }

        // model -> view
        model.$render = function () {

          if (!model.$viewValue) {

            return;
          }

          var m = moment(model.$viewValue);

          // Always use a dot in ng-model attrs...
          scope.val = {

            year: m.year(),
            month: m.month() + 1,
            date: m.date()

          };
        };
      }

    };
  }
})(rootTemplatePath);
'use strict';

(function () {

  'use strict';

  // hraRouteCssClass directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraRouteCssClass', hraRouteCssClass);

  hraRouteCssClass.$inject = ['$rootScope'];

  function hraRouteCssClass($rootScope) {

    return {

      restrict: 'A',
      scope: {},
      link: function link(scope, elem) {

        $rootScope.$on('$stateChangeSuccess', addCustomClass);

        addCustomClass.$inject = ['event', 'toState', 'toParams', 'fromState'];

        function addCustomClass(event, toState, toParams, fromState) {

          var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.cssClassNames) ? fromState.data.cssClassNames : null;
          var toClassNames = angular.isDefined(toState.data) && angular.isDefined(toState.data.cssClassNames) ? toState.data.cssClassNames : null;

          // don't do anything if they are the same
          if (fromClassnames !== toClassNames) {

            if (fromClassnames) {

              elem.removeClass(fromClassnames);
            }

            if (toClassNames) {

              elem.addClass(toClassNames);
            }
          }
        }
      }

    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraCard directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraCard', hraCard);

  function hraCard() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        card: '='
      },
      controller: 'dashboardInfoController',
      controllerAs: 'dashboardInfo',
      templateUrl: rootTemplatePath + '/components/dashboard/views/card.view.html'
    };
  }

  // dashboardInfoController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('dashboardInfoController', dashboardInfoController);

  dashboardInfoController.$inject = ['$rootScope', '$scope', '$stateParams', 'Employee', 'Equipments', 'skillModel', 'ProjectModel', 'HolidayModel'];

  function dashboardInfoController($rootScope, $scope, $stateParams, Employee, Equipments, skillModel, ProjectModel, HolidayModel) {

    var vm = this;
    vm.list = [];
    vm.counter = 0;
    checkCardType();

    // Public methods
    // ------------------------------------------------------------------------


    // Public methods declaration
    // ------------------------------------------------------------------------

    // Private methods declaration
    // ------------------------------------------------------------------------
    function checkCardType() {
      switch (vm.card.type) {
        case 'employee':
          getAllEmployyes();
          break;

        case 'project':
          getAllProjects();
          break;

        case 'holiday':
          getAllHolidays();
          break;

        case 'equipment':
          getAllEquipments();
          break;

        case 'skills':
          getAllSkills();
          break;
      }
    }

    function getAllEmployyes() {
      Employee.getAll().then(function (data) {

        vm.counter = data.length;
      }, function () {});
    }

    function getAllProjects() {
      ProjectModel.getAll().then(function (data) {

        vm.counter = data.length;
      }, function () {});
    }

    function getAllHolidays() {
      HolidayModel.getAll().then(function (data) {
        vm.counter = data.length;
      }, function (data) {});
    }

    function getAllEquipments() {
      Equipments.list().then(function (data) {
        vm.counter = data.length;
      }, function () {});
    }

    function getAllSkills() {
      skillModel.getAll().then(function (data) {
        vm.counter = data.length;
      }, function () {});
    }

    function getAllProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.counter = data.length;
      }, function (err) {
        console.log(err);
      });
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @hraEmployeeCv
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeCv', hraEmployeeCv);

  function hraEmployeeCv() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        'candidate': '='
      },
      controller: 'hraEmployeeCvController',
      controllerAs: 'employeeCv',
      templateUrl: rootTemplatePath + '/components/employee/views/employee.cv.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @hraEmployeeCourse
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeCourse', hraEmployeeCourse);

  function hraEmployeeCourse() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeCourseController',
      controllerAs: 'employeeCourse',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeCourses.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeDetails
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeDetails', hraEmployeeDetails);

  function hraEmployeeDetails() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        'candidate': '='
      },
      controller: 'employeeDetailsController',
      controllerAs: 'employeeDetails',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeDetails.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeEducation
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeEducation', hraEmployeeEducation);

  function hraEmployeeEducation() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeEducationController',
      controllerAs: 'employeeEducation',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeEducation.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeEquipments', hraEmployeeEquipments);

  function hraEmployeeEquipments() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'hraEquipmentsCtrl',
      controllerAs: 'employeeEquipments',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeEquipments.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeForm', hraEmployeeForm);

  function hraEmployeeForm() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        employee: '=',
        employeeIndex: '=',
        formTitle: '=',
        candidate: '='
      },
      controller: 'employeeFormController',
      controllerAs: 'employeeForm',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeForm.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraGeneralInfo', hraGeneralInfo);

  function hraGeneralInfo() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        candidate: '=',
        progress: '='
      },
      controller: 'emplyeeGeneralInfoCtrl',
      controllerAs: 'employeeGeneralInfo',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeGeneralInfo.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeHoliday
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeHoliday', hraEmployeeHoliday);

  function hraEmployeeHoliday() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeHolidayController',
      controllerAs: 'employeeHoliday',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeHoliday.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeHoliday
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeHolidayPreview', hraEmployeeHolidayPreview);

  function hraEmployeeHolidayPreview() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeHolidayPreviewController',
      controllerAs: 'holidayPreview',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeHolidayPreview.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraJobs', hraJobs);

  function hraJobs() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'hraJobsCtrl',
      controllerAs: 'employeeJobs',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeJobs.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraLanguage', hraLanguage);

  function hraLanguage() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'hraLanguageCtrl',
      controllerAs: 'employeeLanguage',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeLanguage.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeObservations
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeObservations', hraEmployeeObservations);

  function hraEmployeeObservations() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        candidate: '='
      },
      controller: 'employeeObservationsController',
      controllerAs: "observations",
      templateUrl: rootTemplatePath + '/components/employee/views/employeeObservations.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeProject
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeProject', hraEmployeeProject);

  function hraEmployeeProject() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeProjectController',
      controllerAs: 'employeeProject',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeProjects.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeForm
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraSchedule', hraSchedule);

  function hraSchedule() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'hraScheduleCtrl',
      controllerAs: 'hraSchedule',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeSchedule.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeSkills
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeSkills', hraEmployeeSkills);

  function hraEmployeeSkills() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeSkillsController',
      controllerAs: 'employeeSkills',
      templateUrl: rootTemplatePath + '/components/employee/views/employeeSkills.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployees
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployees', hraEmployees);

  function hraEmployees() {
    return {
      restrict: 'EA',
      replace: true,
      bindToController: {
        'candidate': '='
      },
      controller: 'employeesCtrl',
      controllerAs: 'employees',
      templateUrl: rootTemplatePath + '/components/employee/views/employees.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @hraEmployeeUpload
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeeUpload', hraEmployeeUpload);

  function hraEmployeeUpload() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'employeeUploadController',
      controllerAs: 'uploadFiles',
      templateUrl: rootTemplatePath + '/components/employee/views/uploadFiles.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // equipmetsDetailsDirectives directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEquipmentDetails', hraEquipmentDetails);

  function hraEquipmentDetails() {
    return {
      restrict: 'EA',
      controller: 'equipmentDetailsController',
      templateUrl: rootTemplatePath + 'components/equipments/views/equipmentDetails.html'
    };
  }
})();
'use strict';

(function () {
  'use strict';

  // viewlistequipments directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraEquipments', hraEquipments);

  function hraEquipments() {
    return {
      restrict: 'EA',
      controller: 'allEquipmentsController',
      templateUrl: rootTemplatePath + '/components/equipments/views/equipments.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraSkillDetails directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraSkillDetails', hraSkillDetails);

  function hraSkillDetails() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'skillDetailsController',
      controllerAs: 'skillDetails',
      templateUrl: rootTemplatePath + '/components/skill/views/skillDetails.view.html'
    };
  }

  // skillDetailsController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('skillDetailsController', skillDetailsController);

  skillDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'skillModel', '$mdToast', 'ProjectModel'];

  function skillDetailsController($rootScope, $scope, $stateParams, skillModel, $mdToast, ProjectModel) {

    var vm = this;
    vm.viewLists = null;
    vm.viewObject = null;
    var ids = $stateParams.id;
    vm.employees = [];
    vm.candidates = [];
    vm.allProjects = [];
    vm.projects = [];

    // public methods
    // ------------------------------------------------------------------------
    vm.getSkills = getSkills;

    // public methods declaration
    // ------------------------------------------------------------------------


    // private methods declaration
    // ------------------------------------------------------------------------

    function getSkills() {
      skillModel.getAll().then(function (res) {
        vm.viewObject = res.filter(function (obj) {
          return obj.id == ids;
        });
        getProjects();
      }, function (err) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    };

    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.allProjects = data;
        getStatistics();
      }, function (data) {
        $rootScope.showToast('Holiday update failed!');
      });
    }

    function getStatistics() {
      if (vm.viewObject[0].employees.length > 0) vm.employees = vm.viewObject[0].employees;

      if (vm.viewObject[0].candidates.length > 0) vm.candidates = vm.viewObject[0].candidates;

      for (var i = 0; i < vm.allProjects.length; i++) {
        for (var j = 0; j < vm.allProjects[i].technologies.length; j++) {
          if (vm.allProjects[i].technologies[j] === vm.viewObject[0].label) vm.projects.push(vm.allProjects[i].name);
        }
      }
    }

    vm.getSkills();
  }
})();
'use strict';

(function () {

	'use strict';

	// extraForm Directive
	// ------------------------------------------------------------------------

	angular.module('HRA').directive('hraExtraForm', formDirective);

	formDirective.$inject = [];

	function formDirective() {
		return {
			restrict: 'EA',
			controller: 'extraFormCtrl',
			controllerAs: 'extraForm',
			templateUrl: rootTemplatePath + '/components/extra/views/extraForm.view.html'
		};
	}
})();
'use strict';

(function () {

  'use strict';

  // hraExtraListAppTypes directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraExtraListAppTypes', hraExtraListAppTypes);

  function hraExtraListAppTypes() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        extra: '='
      },
      controller: 'extraListController',
      controllerAs: 'extraList',
      templateUrl: rootTemplatePath + '/components/extra/views/extraList.appTypes.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraExtraListCustomers directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraExtraListCustomers', hraExtraListCustomers);

  function hraExtraListCustomers() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        extra: '='
      },
      controller: 'extraListController',
      controllerAs: 'extraList',
      templateUrl: rootTemplatePath + '/components/extra/views/extraList.customers.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraExtraList directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraExtraList', hraExtraList);

  function hraExtraList() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        'extra': '='
      },
      controller: 'extraAllListsController',
      controllerAs: 'extraAllLists',
      templateUrl: rootTemplatePath + '/components/extra/views/extraList.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraExtraListIndustries directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraExtraListIndustries', hraExtraListIndustries);

  function hraExtraListIndustries() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        extra: '='
      },
      controller: 'extraListController',
      controllerAs: 'extraList',
      templateUrl: rootTemplatePath + '/components/extra/views/extraList.industries.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraHolidayDetails directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraHolidayDetails', hraHolidayDetails);

  function hraHolidayDetails() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'holidayDetailsController',
      controllerAs: 'holidayDetails',
      templateUrl: rootTemplatePath + 'components/holiday/views/holidayDetails.view.html'
    };
  }

  // holidayDetailsController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('holidayDetailsController', holidayDetailsController);

  holidayDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'HolidayModel', '$mdToast'];

  function holidayDetailsController($rootScope, $scope, $stateParams, HolidayModel, $mdToast) {

    var vm = this;
    vm.viewLists = null;
    vm.viewObject = null;
    var ids = $stateParams.id;

    // public methods
    // ------------------------------------------------------------------------
    vm.getHolidays = getHolidays;

    // public methods declaration
    // ------------------------------------------------------------------------

    function getHolidays() {
      HolidayModel.getAll().then(function (res) {
        vm.viewObject = res.filter(function (obj) {
          return obj.id == ids;
        });
      }, function (err) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    };
    vm.getHolidays();

    return $scope.se = vm;
  }
})();
'use strict';

(function () {

  'use strict';

  // hraHolidayForm directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraHolidayForm', hraHolidayForm);

  function hraHolidayForm() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        holiday: '=',
        holidayIndex: '=',
        formTitle: '='
      },
      controller: 'holidayFormController',
      controllerAs: 'holidayForm',
      templateUrl: rootTemplatePath + '/components/holiday/views/holidayForm.view.html'
    };
  }

  // holidayFormController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('holidayFormController', holidayFormController);

  holidayFormController.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'HolidayModel', 'Employee', 'ProjectModel'];

  function holidayFormController($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, HolidayModel, Employee, ProjectModel) {

    var vm = this;
    vm.serverErrors = false;
    vm.btnIsDisabled = false;
    vm.days = 0;
    vm.projList = [];
    vm.empList = [];
    vm.emps = [];
    vm.projs = [];
    vm.tba = [];
    vm.projadd = [];
    var replaced = [];
    vm.dateList = [];
    vm.projManager = [];
    vm.managerList = [];
    var today = new Date();
    vm.today = today;
    vm.holidayIncrement = [{}];
    vm.holidaySend = []; //{teamLeader: "", replacement:{project: "", employee:""}}
    vm.holidayDateIncrement = [{}];
    vm.holidayReplaceIncrement = [{}];
    vm.holidayEmpIncrement = [{}];
    vm.allEmployees = [];
    vm.holidayLeader = [];
    vm.holidayRepProject = [];
    vm.holidayRepEmployee = [];
    vm.holidayDates = [];
    vm.searchProjectHold = [];
    vm.searchLeaderHold = [];
    vm.searchUser = [];
    vm.user = [];
    vm.leader = [];

    // Public methods
    // ------------------------------------------------------------------------
    vm.saveHoliday = saveHoliday;
    vm.querySearch = querySearch;
    vm.querySearchProj = querySearchProj;
    vm.addProject = addProject;
    vm.removeProject = removeProject;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;
    vm.addEmployee = addEmployee;
    vm.removeEmployee = removeEmployee;
    vm.createPDF = createPDF;
    vm.changeHolidayView = changeHolidayView;
    vm.addNewHoliday = addNewHoliday;
    vm.addNewDateHoliday = addNewDateHoliday;
    vm.addNewReplaceHoliday = addNewReplaceHoliday;
    vm.saveHoliday = saveHoliday;
    vm.addTeamLeader = addTeamLeader;
    vm.addRepProject = addRepProject;
    vm.addRepEmployee = addRepEmployee;
    vm.print = print;
    vm.addUser = addUser;

    // Public methods declaration
    // ------------------------------------------------------------------------

    function print() {
      var printContents = document.getElementById('printable').innerHTML;
      var popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" href="/styles/importer.css"><style>' + '#print-hide {display: none !important;}' + '.ng-hide { display: none !important; }' + '</style></head><body onload="window.print(); window.close();">' + printContents + '</body></html>');
      popupWin.document.close();
    }

    function createPDF() {
      var specialElementHandlers = {
        '#editor': function editor(element, renderer) {
          return true;
        }
      };
      html2canvas(document.getElementById('printable'), {
        onrendered: function onrendered(canvas) {
          var data = canvas.toDataURL();
          var docDefinition = {
            content: [{
              image: data,
              width: canvas.width

            }]
          };
          pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
        }
      });

      // var doc = new jsPDF('p','pt','a4');
      // var source = popupWin;
      // doc.addHTML(source, function(){
      //   doc.save('concediu.pdf');
      // });
    }

    function saveHoliday(holiday) {
      saveHolidayToArr(holiday);
      holiday = vm.holidaySend;
      holiday.teamLeader = angular.toJson(vm.holidayLeader);
      holiday.replacement = angular.toJson(replaced);
      holiday.employee = vm.user;
      holiday.period = angular.toJson(vm.dateList);
      var currentHoliday = angular.copy(holiday);
      vm.btnIsDisabled = true;
      if (!currentHoliday.id) {
        return HolidayModel.save(currentHoliday).then(function (data) {
          $rootScope.showToast('Holiday created successfuly!');
          HolidayModel.getHolidayById(data.id).then(function (data) {
            onSaveSuccess('save', HolidayModel.create(data));
            $mdDialog.cancel();
          }, function () {});
        }, function (error) {
          $rootScope.showToast('Holiday creation failed!');
          onSaveError(error);
        });
      } else {
        return HolidayModel.update(currentHoliday).then(function (data) {
          $rootScope.showToast('Holiday updated successfuly!');
          HolidayModel.getHolidayById(currentHoliday.id).then(function (data) {
            onSaveSuccess('update', data);
            $mdDialog.cancel();
          }, function () {});
        }, function (error) {
          $rootScope.showToast('Holiday update failed!');
          onSaveError();
        });
      }
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.empList);
    }

    function querySearchProj(query) {
      return autocompleteService.querySearch(query, vm.projList);
    }

    function addEmployee(item, holiday) {

      var employeeIndex = '';
      if (item) {
        employeeIndex = miscellaneousService.getItemIndex(vm.empList, item.id);
        vm.empList.splice(employeeIndex, 1);
        vm.tba.push(item);
        vm.holiday.replacement.employee = "";
      } else {
        return;
      }
    }

    function addUser(item, holiday, index) {
      var userIndex = '';
      if (item) {
        userIndex = miscellaneousService.getItemIndex(vm.empList, item.id);
        vm.empList.splice(userIndex, 1);
        vm.user[0] = item;
      } else {
        return;
      }
    }

    function removeEmployee(item, holiday) {
      var employeeIndex = miscellaneousService.getItemIndex(vm.tba, item.id);
      vm.empList.push(vm.tba[employeeIndex]);
      vm.tba.splice(employeeIndex, 1);
    }

    function addProject(item, holiday) {
      var projectIndex = '';

      if (item) {
        projectIndex = miscellaneousService.getItemIndex(vm.projList, item.id);
        vm.projList.splice(projectIndex, 1);
        vm.projadd.push(item);
        vm.holiday.replacement.project = "";
      } else {
        return;
      }
    }

    function removeProject(item, holiday) {
      var projectIndex = miscellaneousService.getItemIndex(vm.projadd, item.id);
      vm.projList.push(vm.projadd[projectIndex]);
      vm.projadd.splice(projectIndex, 1);
    }

    function clearFields() {
      vm.holiday = {};
    }

    function closeDialog() {
      $mdDialog.cancel();
    }

    // Private methods declaration
    // ------------------------------------------------------------------------
    getEmployees();
    getProjects();
    //projectManagerList();

    function fillList() {
      for (var i = 0; i < vm.tba.length; i++) {
        replaced.push({
          project: vm.projadd[i],
          employee: vm.tba[i]
        });
      }
    }

    function projectManagerList() {
      vm.projManager = vm.managerList.filter(function (elem, index, array) {
        return array.indexOf(elem) === index;
      });
    }

    function datesCalculator() {

      var oneDay = 24 * 60 * 60 * 1000;
      var diffDays = 0;
      var firstDate = new Date();
      var secondDate = new Date();
      if (!vm.dateList[1]) {
        firstDate = new Date(vm.dateList[0].from);
        secondDate = new Date(vm.dateList[0].to);

        diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
      } else {
        firstDate = new Date(vm.dateList[0].from);
        secondDate = new Date(vm.dateList[0].to);
        var thirdDate = new Date(vm.dateList[1].from);
        var fourthDate = new Date(vm.dateList[1].to);

        diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
        diffDays += Math.round(Math.abs((thirdDate.getTime() - fourthDate.getTime()) / oneDay));
      }
      return diffDays;
    }

    function getEmployees() {
      Employee.getAll().then(function (data) {
        vm.empList = data;
        updateUser();
        updateTeamLeader();
        return autocompleteService.buildList(vm.empList, ['firstName', 'lastName']);
      }, function (data) {
        $rootScope.showToast('Holiday update failed!');
      });
    }

    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.projList = data;
        for (var i = 0; i < vm.projList.length; i++) {
          vm.projs.push(vm.projList[i]);
          vm.managerList.push(vm.projList[i].manager);
        }
        updateProject();
        updateDates();
        vm.projManager = vm.managerList.filter(function (elem, index, array) {
          return array.indexOf(elem) === index;
        });
        return autocompleteService.buildList(vm.projList, ['name']);
      }, function (data) {
        $rootScope.showToast('Holiday update failed!');
      });
    }

    function onSaveSuccess(action, holiday) {
      vm.btnIsDisabled = false;
      vm.serverErrors = false;
      $rootScope.$broadcast('holidaysListChanged', [action, holiday]);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }

    //remake

    function changeHolidayView() {
      vm.holidayInfo = false;
    }

    function addNewDateHoliday() {
      vm.holidayDateIncrement.push({});
    }

    function addNewReplaceHoliday() {
      vm.holidayReplaceIncrement.push({});
    }

    function addNewHoliday() {
      vm.holidayIncrement.push({});
    }

    function addTeamLeader(item, employee, index) {
      if (vm.holidayLeader) {
        vm.holidayLeader.splice(0, 1);
        vm.holidayLeader.push(item);
      } else vm.holidayLeader.push(item);
    }

    function addRepProject(item, employee, index) {
      vm.holidayRepProject[index] = item;
    }

    function addRepEmployee(item, employee, index) {
      vm.holidayRepEmployee[index] = item;
    }

    function saveHolidayToArr(holiday) {
      var day = datesCalculator();
      var sign = new Date();
      var idx = holiday.id;
      for (var i = 0; i < vm.holidayRepProject.length; i++) {
        replaced.push({
          project: vm.holidayRepProject[i],
          employee: vm.holidayRepEmployee[i]
        });
      }vm.holidaySend = {
        days: day,
        signingDate: sign,
        id: idx
      };
    }

    function updateProject() {
      if (vm.holiday.replacement !== null && vm.holiday.replacement !== undefined) {
        vm.holidayReplaceIncrement = vm.holiday.replacement;
        for (var i = 0; i < vm.holiday.replacement.length; i++) {
          vm.searchProjectHold[i] = vm.holiday.replacement[i].project ? vm.holiday.replacement[i].project.name : '';
          vm.holidayRepProject[i] = vm.holiday.replacement[i].project ? vm.holiday.replacement[i].project : '';
          vm.searchRepEmpHold[i] = vm.holiday.replacement[i].employee ? vm.holiday.replacement[i].employee.firstName + " " + vm.holiday.replacement[i].employee.lastName : '';
          vm.holidayRepEmployee[i] = vm.holiday.replacement[i].employee ? vm.holiday.replacement[i].employee : '';
        }
      }
    }

    function updateTeamLeader() {
      if (vm.holiday.teamLeader !== null && vm.holiday.teamLeader !== undefined) {
        vm.holidayLeader = vm.holiday.teamLeader;
        for (var i = 0; i < vm.holidayLeader.length; i++) {
          vm.searchLeaderHold[i] = vm.holiday.teamLeader[i] ? vm.holiday.teamLeader[i].firstName + " " + vm.holiday.teamLeader[i].lastName : '';
        }
      }
    }

    function updateUser() {
      if (vm.holiday.employee !== null && vm.holiday.employee !== undefined) {
        vm.user = vm.holiday.employee;
        vm.holidayEmpIncrement = vm.user;
        vm.searchUser[0] = vm.user[0] ? vm.user[0].firstName + " " + vm.user[0].lastName : '';
      }
    }

    function updateDates() {
      if (vm.holiday.period !== null && vm.holiday.period !== undefined) {
        vm.holidayDateIncrement = vm.holiday.period;
        for (var i = 0; i < vm.holiday.period.length; i++) {
          vm.dateList[i] = vm.holiday.period[i] ? {
            from: new Date(vm.holiday.period[i].from),
            to: new Date(vm.holiday.period[i].to)
          } : '';
        }
      }
    }

    //end remake


    // IDEAS FOR FUTURE HERE:  :)


    // /*
    // TO DO:
    // HARD REFACTORY FOR FILE UPLOAD
    // WORSK BUT NOT NEEDED AT THE MOMENT
    // */
    // $scope.$watch('files', function() {
    //   $scope.upload($scope.files);
    // });

    // $scope.$watch('file', function() {
    //   if ($scope.file !== null) {
    //     $scope.files = [$scope.file];
    //   }
    // });

    // $scope.log = 0;

    // $scope.upload = function(files) {
    //   if (files && files.length && files[0] !== undefined) {
    //     for (var i = 0; i < files.length; i++) {
    //       var file = files[i];
    //       if (!file.$error) {
    //         Upload.upload({
    //           url: apiUrl + '/fileupload/upload',
    //           data: {
    //             uploadFile: file
    //           }
    //         }).then(function(resp) {
    //           $timeout(function() {
    //             vm.employee.picture = '/images/' + resp.data.file[0].fd.substr(resp.data.file[0].fd.lastIndexOf('/') + 1);
    //           });
    //         }, null, function(evt) {
    //           var progressPercentage = parseInt(100.0 *
    //             evt.loaded / evt.total);
    //           $scope.log = progressPercentage;
    //         });
    //       }
    //     }
    //   }
    // };

  }
})();
'use strict';

(function () {

  'use strict';

  // hraHolidays directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraHolidays', hraHolidays);

  function hraHolidays() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'HolidaysController as holidays',
      templateUrl: rootTemplatePath + '/components/holiday/views/holidays.view.html'
    };
  }

  // employeesList controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('HolidaysController', HolidaysController);

  HolidaysController.$inject = ['$rootScope', '$scope', '$mdDialog', 'autocompleteService', 'miscellaneousService', 'HolidayModel', 'Employee'];

  function HolidaysController($rootScope, $scope, $mdDialog, autocompleteService, miscellaneousService, HolidayModel, Employee) {

    var vm = this;
    vm.ids = [];
    vm.holidayList = [];
    var date = new Date();
    var dateFrom = new Date();
    var dateTo = new Date();
    var filtru = [];
    vm.filterSwitch = true;
    vm.monthSelection = [];
    var final = [];
    vm.dateList = [];
    vm.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    vm.selectedMonth = [];
    var holCopy = [];
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'firstName',
        filter: '',
        limit: 10,
        page: 1
      },
      "limitOptions": [10, 15, 20],
      selected: []
    };

    getHoliday();
    getEmployees();

    // Public methods
    // ------------------------------------------------------------------------
    vm.querySearch = querySearch;
    vm.showFormDialog = showFormDialog;
    vm.showFormJsonDialog = showFormJsonDialog;
    vm.deleteConfirm = deleteConfirm;
    vm.multipleDelete = multipleDelete;
    vm.selectedMonthDate = selectedMonthDate;
    vm.searchFilter = searchFilter;
    vm.resetFilters = resetFilters;
    vm.searchPeriodFilter = searchPeriodFilter;

    // Public methods declaration
    // ------------------------------------------------------------------------
    function showFormDialog(event, holiday, index) {
      event.stopPropagation();

      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'holidayForm.tmpl.html',
        controller: 'holidayModal as holidayM',
        targetEvent: event,
        clickOutsideToClose: true,
        data: {
          holiday: angular.copy(holiday),
          holidayIndex: index
        }
      });
    }

    function showFormJsonDialog(event) {
      event.stopPropagation();

      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'holidayJsonForm.tmpl.html',
        controller: 'holidayJsonModal as holidayJsonM',
        targetEvent: event,
        clickOutsideToClose: true
      });
    }

    function deleteConfirm(event, holiday, hold) {
      event.stopPropagation();

      var confirm = $mdDialog.confirm().title('Delete the holiday ?').targetEvent(event).cancel('No').ok('Yes');

      $mdDialog.show(confirm).then(function () {
        removeHoliday(hold);
      });
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.empList);
    }

    function multipleDelete() {
      for (var i = 0; i < vm.table.selected.length; i++) {
        vm.ids.push(vm.table.selected[i].id);
        vm.holidays = _.without(vm.holidays, _.findWhere(vm.holidays, {
          id: vm.table.selected[i].id
        }));
      }
      removeHoliday(vm.ids);
      vm.table.selected = [];
    }

    function selectedMonthDate(data, index) {
      if (data !== undefined) {
        vm.monthSelection[index] = data;
        return vm.selectedMonth;
      } else {
        return "Pick a month";
      }
    }

    function getEmployees() {
      Employee.getAll().then(function (data) {
        vm.empList = data;
        return autocompleteService.buildList(vm.empList, ['firstName', 'lastName']);
      }, function (data) {
        $rootScope.showToast('Holiday update failed!');
      });
    }

    function searchFilter(index) {
      final = vm.holidays.map(function (holiday) {
        return holiday.period.map(function (per) {
          dateFrom = new Date(per.from);
          dateTo = new Date(per.to);
          if (vm.monthSelection[index] === vm.monthsList[dateFrom.getMonth()] || vm.monthSelection[index] === vm.monthsList[dateTo.getMonth()]) filtru.push(holiday);
          return filtru;
        });
      });
      vm.holidays = filtru;
    }

    function resetFilters() {
      vm.holidays = holCopy;
      filtru = [];
      vm.dateList = [];
      vm.selectedMonth = undefined;
    }

    function searchPeriodFilter(index) {
      final = vm.holidays.map(function (holiday) {
        return holiday.period.map(function (per) {
          dateFrom = new Date(per.from);
          dateTo = new Date(per.to);
          if (dateFrom.getTime() >= vm.dateList.from.getTime() && dateTo.getTime() <= vm.dateList.to.getTime()) filtru.push(holiday);
          return filtru;
        });
      });
      vm.holidays = filtru;
    }

    // Private methods declaration
    // ------------------------------------------------------------------------


    function getHoliday() {
      HolidayModel.getAll().then(function (data) {
        vm.holidays = data;
        holCopy = angular.copy(vm.holidays);
        //return autocompleteService.buildList(vm.holidays, ['employee']);
      }, function (data) {});
    }

    function removeHoliday(id) {

      HolidayModel.remove({
        id: id
      }).then(function (res) {
        vm.holidays = _.without(vm.holidays, _.findWhere(vm.holidays, {
          id: id
        }));
        $rootScope.showToast('Holiday deleted');
        vm.table.selected = [];
      }, function (err) {
        $rootScope.showToast('Error on deleting the holiday!');
      });
    }

    $scope.$on('holidaysListChanged', function (event, args) {
      var holiday = args[1];
      var holidayIndex = '';
      switch (args[0]) {
        case 'save':
          vm.holidays.push(holiday);
          break;

        case 'saveFromJson':
          vm.holidays = vm.holidays.concat(holiday);
          break;

        case 'update':
          holidayIndex = miscellaneousService.getItemIndex(vm.holidays, holiday.id);
          vm.holidays[holidayIndex] = angular.copy(holiday);
          break;

        default:
          getHoliday();
      }
    });
  }
})();
'use strict';

(function () {

  'use strict';

  // login directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hralogin', hraLogindDrectives);

  function hraLogindDrectives() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'loginController',
      controllerAs: 'loginCtrl',
      templateUrl: rootTemplatePath + 'components/login/views/login.form.view.html'
    };
  }

  // login controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('loginController', loginController);

  loginController.$inject = ['UserFactory', '$state', '$scope', '$window', 'tokenService'];

  function loginController(UserFactory, $state, $scope, $window, tokenService) {
    var vm = this;
    vm.login = login;

    function login(username, password) {
      //var user = false;
      UserFactory.login(username, password).then(function (data) {
        vm.user = data.user;

        // Set two tokens
        var userInfoToken = data.custom_token;
        var authToken = data.user.auth_token;

        // IMPORTANT
        // userInfoToken goes first
        //authToken is second
        tokenService.setTokens([userInfoToken, authToken]);

        $state.go('employeesParent.details', {
          id: vm.user.id
        });
      }, function (date) {
        console.log('Wrong credentials!');
      });
    }
  }
})();
'use strict';

(function () {
	'use strict';

	// logout directive
	// ------------------------------------------------------------------------

	angular.module('HRA').directive('hralogout', hralogout);

	function hralogout() {
		return {
			restrict: 'EA',
			scope: {},
			controller: 'logoutController',
			controllerAs: 'logoutCtrl',
			template: '<hralogin></hralogin>'
		};
	}

	// logout controller
	// ------------------------------------------------------------------------
	angular.module('HRA').controller('logoutController', logoutController);

	logoutController.$inject = ['tokenService'];

	function logoutController(tokenService) {
		tokenService.setTokens();
	}
})();
'use strict';

(function () {

  'use strict';

  // hraProjectDetails directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraProjectDetails', hraProjectDetails);

  function hraProjectDetails() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'projectDetailsController',
      controllerAs: 'projectDetails',
      templateUrl: rootTemplatePath + '/components/project/views/projectDetails.view.html'
    };
  }

  // projectDetailsController
  // --------------------------------------------------------------------------

  angular.module('HRA').controller('projectDetailsController', projectDetailsController);

  projectDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'ProjectModel', 'Employee'];

  function projectDetailsController($rootScope, $scope, $stateParams, ProjectModel, Employee) {

    var vm = this;

    // Private methods declaration
    // ------------------------------------------------------------------------

    getProjectById($stateParams.id);

    function getProjectById(id) {
      ProjectModel.getProjectById(id).then(function (data) {
        vm.project = data;
        $rootScope.$emit("projectIsLoadedEvent", vm.project);
      }, function (data) {});
    }

    var update = $rootScope.$on('callSaveMethodCardsProjects', function (event, project) {
      var project = angular.copy(project);
      if (!project.id) {

        var newProject = ProjectModel.create(project);
        ProjectModel.save(project).then(function (data) {
          $rootScope.showToast('Project ' + ' created successfuly!');
          onSaveSuccess('save', data);
          // vm.project = {};
          $mdDialog.cancel();
        }, function (error) {
          $rootScope.showToast('Project ' + ' creation failed!');
          onSaveError(error);
        });
      } else {
        ProjectModel.update(project).then(function (data) {
          $rootScope.showToast('Project ' + ' updated successfuly!');

          onSaveSuccess('update', data);
        }, function (error) {
          $rootScope.showToast('Project ' + ' update failed!');
          onSaveError();
        });
      }
    });

    $scope.$on('$destroy', function () {
      update();
    });

    function onSaveSuccess(action, project) {
      vm.btnIsDisabled = false;
      vm.serverErrors = false;
      $scope.projectform.$setUntouched();

      $rootScope.$broadcast('projectsListChanged', [action, project]);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  //hraEmployeesProject directives
  //----------------------------------------------------------------

  angular.module('HRA').directive('hraEmployeesProject', hraEmployeesProject);

  function hraEmployeesProject() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'projectEmployeesController',
      controllerAs: 'projectEmployess',
      templateUrl: rootTemplatePath + 'components/project/views/projectEmployees.view.html'
    };
  }

  //projectEmployees Controller
  //-----------------------------------------------------------

  angular.module('HRA').controller('projectEmployeesController', projectEmployeesController);

  projectEmployeesController.$inject = ['$rootScope', '$scope', 'autocompleteService', 'miscellaneousService', 'Employee'];

  function projectEmployeesController($rootScope, $scope, autocompleteService, miscellaneousService, Employee) {

    var vm = this;
    vm.searchText = '';
    vm.disableEmployeeCard = true;
    vm.employees = [];

    // Public methods
    //--------------------------------------------------------------

    vm.saveProject = saveProject;
    vm.querySearchEmployee = querySearchEmployee;
    vm.addEmployee = addEmployee;
    vm.removeEmployee = removeEmployee;

    //Private methods
    //---------------------------------------------------------------

    var getProjects = $rootScope.$on('projectIsLoadedEvent', function (event, project) {
      vm.project = project;
    });

    $scope.$on('$destroy', function () {
      getProjects();
    });

    getEmployees();

    // Private methods declarations
    //--------------------------------------------------------------------

    function getEmployees() {
      Employee.getAll().then(function (data) {
        vm.employees = data;
        // updateAutocompleteEmployees();
        autocompleteService.buildList(vm.employees, ['firstName', 'lastName']);
      }, function (data) {});
    }

    function updateAutocompleteEmployees() {
      var i = 0;
      var indexEmployeeToRemove = '';

      for (i; i < vm.project.employees.length; i++) {
        indexEmployeeToRemove = miscellaneousService.getItemIndex(vm.employees, vm.project.employees[i].id);
        vm.employees.splice(indexEmployeeToRemove, 1);
      }
    }

    // Public methods declarations
    //-------------------------------------------------------------------

    function saveProject(project) {
      $rootScope.$emit("callSaveMethodCardsProjects", project);
      vm.disableEmployeeCard = true;
    }

    function querySearchEmployee(query) {
      return autocompleteService.querySearch(query, vm.employees);
    }

    function addEmployee(item, project) {

      var employeeIndex = '';

      if (item) {
        employeeIndex = miscellaneousService.getItemIndex(vm.employees, item.id);
        vm.employees.splice(employeeIndex, 1);
        vm.project.employees.push(item);
        vm.searchText = "";
      }
      return;
    }

    function removeEmployee(item, project, index) {
      // var employeeIndex = miscellaneousService.getItemIndex(vm.project.employees, item);
      // vm.employees.unshift(vm.project.employees[employeeIndex]);
      vm.project.employees.splice(index, 1);
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // hraProjectForm directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraProjectForm', hraProjectForm);

  function hraProjectForm() {
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        projects: '=',
        project: '=',
        projectIndex: '=',
        formTitle: '='
      },
      controller: 'projectFormCtrl as projectForm',
      controllerAs: 'projectForm',
      templateUrl: rootTemplatePath + '/components/project/views/projectForm.view.html'
    };
  }

  // projectFormController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('projectFormCtrl', projectFormCtrl);

  projectFormCtrl.$inject = ['$rootScope', '$scope', '$http', '$mdToast', '$mdDialog', 'autocompleteService', 'miscellaneousService', 'ProjectModel', 'Employee', 'skillModel', 'Industries', 'customerModel', 'appType'];

  function projectFormCtrl($rootScope, $scope, $http, $mdToast, $mdDialog, autocompleteService, miscellaneousService, ProjectModel, Employee, skillModel, Industries, customerModel, appType) {

    var vm = this;
    vm.btnIsDisabled = false;
    vm.applicationTypes = [];
    vm.industries = [];

    // Convert string date to date instance
    vm.project.startDate = new Date(vm.project.startDate);
    vm.project.deadline = new Date(vm.project.deadline);

    vm.querySearch = querySearch;
    vm.addEmployee = addEmployee;
    vm.removeEmployee = removeEmployee;
    vm.addTechnology = addTechnology;
    vm.removeTechnology = removeTechnology;
    vm.addApp = addApp;
    vm.removeApp = removeApp;
    vm.addIndustry = addIndustry;
    vm.removeIndustry = removeIndustry;
    vm.addCustomer = addCustomer;
    vm.removeCustomer = removeCustomer;
    vm.saveProject = saveProject;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;
    vm.appSearch = appSearch;
    vm.industrySearch = industrySearch;
    vm.customerSearch = customerSearch;
    vm.technologySearch = technologySearch;
    vm.searchText = '';

    getEmployees();
    getIndustries();
    getCustomers();
    getTechnologies();

    // Public methods declaration
    // -----------------------------------------------------------------------

    function saveProject(project) {
      var project = angular.copy(project);
      vm.btnIsDisabled = true;

      if (!project.id) {

        var newProject = ProjectModel.create(project);

        ProjectModel.save(project).then(function (data) {
          $rootScope.showToast('Project created successfuly!');
          onSaveSuccess('save', data);
          // vm.project = {};
          $mdDialog.cancel();
        }, function (error) {
          $rootScope.showToast('Project creation failed!');
          onSaveError(error);
        });
      } else {
        console.log(project);
        ProjectModel.update(project).then(function (data) {
          $rootScope.showToast('Project ' + ' updated successfuly!');

          onSaveSuccess('update', data);
        }, function (error) {
          $rootScope.showToast('Project ' + ' update failed!');
          onSaveError();
        });
      }
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.employees);
    }

    function industrySearch(query) {
      return autocompleteService.querySearch(query, vm.industries);
    }

    function customerSearch(query) {
      return autocompleteService.querySearch(query, vm.customers);
    }

    function technologySearch(query) {
      return autocompleteService.querySearch(query, vm.skillList);
    }

    function addEmployee(item, project) {

      var employeeIndex = '';

      if (item) {
        employeeIndex = miscellaneousService.getItemIndex(vm.employees, item.id);
        vm.employees.splice(employeeIndex, 1);
        vm.project.employees.push(item);
        vm.searchText = "";
      }

      return;
    }

    function removeEmployee(item, project) {
      var employeeIndex = miscellaneousService.getItemIndex(vm.project.employees, item);
      vm.employees.unshift(vm.project.employees[employeeIndex]);
      vm.project.employees.splice(employeeIndex, 1);
    }

    function addTechnology(item, project) {
      var technologyIndex = '';

      if (item) {
        vm.project.technologies.push(item.label);
        vm.searchTech = "";
      }
      return;
    }

    function removeTechnology(item, project, index) {

      vm.project.technologies.splice(index, 1);
    }

    function addIndustry(index, item, project) {

      if (item) {
        vm.project.industries.push(item);
        vm.searchIndustry = "";
      }

      return;
    }

    function removeIndustry(item, project, index) {
      vm.project.industries.splice(index, 1);
    }

    function addCustomer(item, project) {

      var customerIndex = '';

      if (item) {

        vm.project.customers.push(item);
        vm.searchCustomer = "";
      }

      return;
    }

    function removeCustomer(item, project, index) {
      vm.project.customers.splice(index, 1);
    }

    function clearFields() {
      vm.project = {};
    };

    function closeDialog() {
      $mdDialog.cancel();
    };

    function getTechnologies() {
      skillModel.getAll().then(function (res) {
        vm.skillList = res;
        autocompleteService.buildList(vm.skillList, ['name']);
      }, function (res) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    }

    function getEmployees() {
      Employee.getAll().then(function (data) {
        vm.employees = data;
        //  updateAutocompleteEmployees();
        autocompleteService.buildList(vm.employees, ['firstName', 'lastName']);
      }, function (data) {});
    }

    function onSaveSuccess(action, project) {
      vm.btnIsDisabled = false;
      vm.serverErrors = false;
      $scope.projectform.$setUntouched();

      $rootScope.$broadcast('projectsListChanged', [action, project]);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }

    function getIndustries() {
      Industries.getAllIndustries().then(function (data) {
        vm.industries = data;
        autocompleteService.buildList(vm.industries, ['name']);
      }, function (error) {});
    }

    function getCustomers() {
      customerModel.getAllCustomers().then(function (data) {
        vm.customers = data;
        autocompleteService.buildList(vm.customers, ['name']);
      }, function (error) {});
    }

    getAppData();
    vm.addApp = addApp;
    vm.removeApp = removeApp;

    function getAppData() {
      appType.getAll().then(function (data) {
        vm.applicationTypes = data;
      }, function (data) {
        console.log("err", data);
      });
    }

    function appSearch(query) {
      return autocompleteService.querySearch(query, vm.applicationTypes);
    }

    function addApp(item, project) {

      if (item) {
        vm.project.applicationTypes.push(item);
        vm.searchApp = "";
      }

      return;
    }

    function removeApp(index, item, project) {
      vm.project.applicationTypes.splice(index, 1);
    }
  }
})();
'use strict';

(function () {

	'use strict';

	//hraGeneralInfoProject directive
	//---------------------------------------------------------------

	angular.module('HRA').directive('hraGeneralInfoProject', hraGeneralInfoProject);

	function hraGeneralInfoProject() {
		return {
			restrict: 'EA',
			scope: {},
			controller: 'projectGeneralInfoController',
			controllerAs: 'projectGeneralInfo',
			templateUrl: rootTemplatePath + '/components/project/views/projectGeneralInfo.view.html'
		};
	}

	// projectGeneralInfo Controller
	//------------------------------------------------------------

	angular.module('HRA').controller('projectGeneralInfoController', projectGeneralInfoController);

	projectGeneralInfoController.$inject = ['$rootScope', '$scope'];

	function projectGeneralInfoController($rootScope, $scope) {

		//get projects from details controller
		//--------------------------------------------------------------

		var vm = this;

		var getProjects = $rootScope.$on('projectIsLoadedEvent', function (event, project) {
			vm.project = project;
			vm.projectCpy = angular.copy(vm.project);
			vm.project.startDate = new Date(vm.project.startDate);
			vm.project.deadline = new Date(vm.project.deadline);
		});

		$scope.$on('$destroy', function () {
			getProjects();
		});

		// Public methods
		// ------------------------------------------------------------------------

		vm.saveProject = saveProject;
		vm.disabledgeneralInfo = true;
		vm.cancelAdd = cancelAdd;

		// Public methods declaration
		// ------------------------------------------------------------------------

		function saveProject(project) {
			$rootScope.$emit("callSaveMethodCardsProjects", project);
			vm.disabledgeneralInfo = true;
		}

		function cancelAdd() {
			vm.project.name = vm.projectCpy.name;
			vm.project.description = vm.projectCpy.description;
			vm.project.startDate = new Date(vm.projectCpy.startDate);
			vm.project.deadline = new Date(vm.projectCpy.deadline);
			vm.disabledgeneralInfo = true;
		}
	}
})();
'use strict';

(function () {

	'use strict';

	//hraTechnology Project directive
	//------------------------------------------------------------------

	angular.module('HRA').directive('hraTechnologyProject', hraTechnologyProject);

	function hraTechnologyProject() {
		return {
			restrict: 'EA',
			scope: {},
			controller: 'projectTechnologyController',
			controllerAs: 'projectTechnology',
			templateUrl: rootTemplatePath + '/components/project/views/projectTechnology.view.html'
		};
	}

	//hraTechnology Projects Controller
	//--------------------------------------------------------------------

	angular.module('HRA').controller('projectTechnologyController', projectTechnologyController);

	projectTechnologyController.$inject = ['skillModel', 'autocompleteService', '$rootScope', '$scope'];

	function projectTechnologyController(skillModel, autocompleteService, $rootScope, $scope) {

		var vm = this;
		vm.disableITechnologyCard = true;

		// Public methods
		//--------------------------------------------------------------

		vm.removeTechnology = removeTechnology;
		vm.addTechnology = addTechnology;
		vm.technologySearch = technologySearch;
		vm.saveProject = saveProject;

		//Private methods
		//---------------------------------------------------------------

		var getProjects = $rootScope.$on('projectIsLoadedEvent', function (event, project) {
			vm.project = project;
		});

		$scope.$on('$destroy', function () {
			getProjects();
		});

		getTechnologies();

		// Private methods declarations
		//-------------------------------------------------------------------

		function getTechnologies() {
			skillModel.getAll().then(function (res) {
				vm.skillList = res;
				autocompleteService.buildList(vm.skillList, ['name']);
			}, function (res) {
				$rootScope.showToast('Error on loading data! Please refresh!');
			});
		}

		// Public methods declarations
		//-----------------------------------------------------------------

		function saveProject(project) {
			$rootScope.$emit("callSaveMethodCardsProjects", project);
			vm.disableITechnologyCard = true;
		}

		function removeTechnology(item, project, index) {
			console.log(index);
			vm.project.technologies.splice(index, 1);
		}

		function addTechnology(item, project) {
			var technologyIndex = '';

			if (item) {
				vm.project.technologies.push(item);
				vm.searchTech = "";
			}
			return;
		}

		function technologySearch(query) {
			return autocompleteService.querySearch(query, vm.skillList);
		}
	}
})();
'use strict';

(function () {

	'use strict';

	// projectIndustry, Type, Customer directive
	//--------------------------------------------------------------

	angular.module('HRA').directive('hraIndustryProject', hraIndustryProject);

	function hraIndustryProject() {
		return {
			restrict: 'EA',
			scope: {},
			controller: 'projectIndustryController',
			controllerAs: 'projectIndustry',
			templateUrl: rootTemplatePath + '/components/project/views/projectTypeIndustryCustomer.view.html'
		};
	}

	// projectIndustry, Type, Customer controller
	//--------------------------------------------------------------
	angular.module('HRA').controller('projectIndustryController', projectIndustryController);

	projectIndustryController.$inject = ['$rootScope', '$scope', 'miscellaneousService', 'autocompleteService', 'appType', 'Industries', 'customerModel'];

	function projectIndustryController($rootScope, $scope, miscellaneousService, autocompleteService, appType, Industries, customerModel) {

		var vm = this;
		vm.applicationTypes = [];
		vm.industries = [];
		vm.disableIndustryCard = true;

		// Public methods
		//--------------------------------------------------------------

		vm.addApp = addApp;
		vm.appSearch = appSearch;
		vm.removeApp = removeApp;
		vm.removeIndustry = removeIndustry;
		vm.addIndustry = addIndustry;
		vm.industrySearch = industrySearch;
		vm.removeCustomer = removeCustomer;
		vm.addCustomer = addCustomer;
		vm.customerSearch = customerSearch;
		vm.saveProject = saveProject;

		//Private methods
		//---------------------------------------------------------------

		var getProjects = $rootScope.$on('projectIsLoadedEvent', function (event, project) {
			vm.project = project;
		});

		$scope.$on('$destroy', function () {
			getProjects();
		});

		getAppData();
		getIndustries();
		getCustomers();

		// Private methods declarations
		//-------------------------------------------------------------------------

		function getAppData() {
			appType.getAll().then(function (data) {
				vm.applicationTypes = data;
			}, function (data) {
				console.log("err", data);
			});
		}

		function getIndustries() {
			Industries.getAllIndustries().then(function (data) {
				vm.industries = data;
				autocompleteService.buildList(vm.industries, ['name']);
			}, function (error) {});
		}

		function getCustomers() {
			customerModel.getAllCustomers().then(function (data) {
				vm.customers = data;
				autocompleteService.buildList(vm.customers, ['name']);
			}, function (error) {});
		}

		// Public methods declarations
		//-------------------------------------------------------------------

		function saveProject(project) {
			$rootScope.$emit("callSaveMethodCardsProjects", project);
			vm.disableIndustryCard = true;
		}

		//ApplicationType functions
		function appSearch(query) {
			return autocompleteService.querySearch(query, vm.applicationTypes);
		}

		function addApp(item, project) {
			console.log("sec", item);

			if (item) {
				vm.project.applicationTypes.push(item);
				vm.searchApp = "";
			}

			return;
		}

		function removeApp(index, item, project) {
			console.log(index);
			vm.project.applicationTypes.splice(index, 1);
		}

		//Industry functions
		function removeIndustry(item, project, index) {
			vm.project.industries.splice(index, 1);
		}

		function addIndustry(index, item, project) {

			if (item) {
				vm.project.industries.push(item);
				vm.searchIndustry = "";
			}

			return;
		}

		function industrySearch(query) {
			return autocompleteService.querySearch(query, vm.industries);
		}

		//Customer functions
		function removeCustomer(item, project, index) {
			console.log(index);
			vm.project.customers.splice(index, 1);
		}

		function addCustomer(item, project) {

			var customerIndex = '';

			if (item) {

				vm.project.customers.push(item);
				vm.searchCustomer = "";
			}

			return;
		}

		function customerSearch(query) {
			return autocompleteService.querySearch(query, vm.customers);
		}
	}
})();
'use strict';

(function () {
  'use strict';
  // hraProjects directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraProjects', hraProjects);

  function hraProjects() {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'projectsCtrl as projects',
      templateUrl: rootTemplatePath + '/components/project/views/projects.view.html'
    };
  }
  // projectsList controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('projectsCtrl', projectsCtrl);
  projectsCtrl.$inject = ['$rootScope', '$scope', '$http', '$mdDialog', '$mdEditDialog', 'autocompleteService', 'miscellaneousService', 'ProjectModel', 'skillModel', 'customerModel', 'appType', 'Industries', '$timeout'];

  function projectsCtrl($rootScope, $scope, $http, $mdDialog, $mdEditDialog, autocompleteService, miscellaneousService, ProjectModel, skillModel, customerModel, appType, Industries, $timeout) {

    var vm = this;
    vm.selected = [];
    vm.limitOptions = [5, 10, 15];
    vm.showFilters = false;
    vm.countries = [];
    vm.applicationTypes = [];
    vm.industries = [];
    vm.timeLeft = timeLeft;
    var today = new Date();
    vm.today = today;
    vm.ids = [];
    vm.createSkill = [];
    vm.filteredDate = [];
    var startDateFilter = [];
    var dateFilter = [];
    var dateForFilter = new Date();
    vm.startDatefilter = startDatefilter;
    vm.years = '';
    vm.app = '';
    vm.industry = '';
    vm.customer = '';
    vm.technology = '';
    vm.resetFilters = resetFilters;
    //vm.yearsFilter = yearsFilter;
    vm.filteredYears = [];
    vm.apps = [];
    vm.industries = [];
    vm.customers = [];
    vm.technologies = [];
    vm.techs = [];
    vm.projects = [];
    vm.arrayTechnology = [];
    vm.projectCopy = [];
    vm.projCpy = [];
    vm.arrayCustomers = [];
    vm.arrayIndustries = [];
    vm.arrayAppType = [];
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'name',
        filter: '',
        limit: 10,
        page: 1
      },
      "limitOptions": [10, 15, 20],
      selected: []
    };
    getProjects();
    getTechs();
    getIndustrie();
    getApps();
    getCustomers();
    // Public methods
    // -------------------------------------------------------------------------------
    vm.querySearch = querySearch;
    vm.showFormDialog = showFormDialog;
    vm.showFormJsonDialog = showFormJsonDialog;
    vm.deleteConfirm = deleteConfirm;
    vm.removeMultipleProjects = removeMultipleProjects;
    vm.toggleFilters = toggleFilters;
    //  vm.addFromApi = addFromApi;
    vm.querySearchTechonology = querySearchTechonology;
    vm.selectedTechonologyChange = selectedTechonologyChange;
    vm.removeSearchTechnology = removeSearchTechnology;
    vm.querySearchCustomers = querySearchCustomers;
    vm.selectedCustomersChange = selectedCustomersChange;
    vm.removeSearchCustomers = removeSearchCustomers;
    vm.querySearchIndustry = querySearchIndustry;
    vm.selectedIndustryChange = selectedIndustryChange;
    vm.removeSearchIndustry = removeSearchIndustry;
    vm.querySearchAppType = querySearchAppType;
    vm.selectedAppTypeChange = selectedAppTypeChange;
    vm.removeSearchAppType = removeSearchAppType;
    vm.getHeader = getHeader;
    vm.getArray = getArray;
    // Public methods declarations
    // --------------------------------------------------------------------------------
    function toggleFilters() {
      vm.showFilters = !vm.showFilters;
    }

    function getHeader() {
      return ["Name", "Description", "Start Date", "Deadline", "Type", "Industry", "Customers", "Technologies", "Employees"];
    }

    function getArray() {
      var temporary = [];
      for (var i = 0; i < vm.projects.length; i++) {
        var appType = [];
        var industries = [];
        var customers = [];
        var employees = [];
        if (vm.projects[i].applicationTypes) {
          for (var j = 0; j < vm.projects[i].applicationTypes.length; j++) {
            appType.push(vm.projects[i].applicationTypes[j].name);
          }
        }
        if (vm.projects[i].industries) {
          for (var l = 0; l < vm.projects[i].industries.length; l++) {
            industries.push(vm.projects[i].industries[l].name);
          }
        }
        if (vm.projects[i].customers) {
          for (var e = 0; e < vm.projects[i].customers.length; e++) {
            customers.push(vm.projects[i].customers[e].name);
          }
        }
        if (vm.projects[i].employees) {
          for (var p = 0; p < vm.projects[i].employees.length; p++) {
            employees.push(vm.projects[i].employees[p].firstName + " " + vm.projects[i].employees[p].lastName);
          }
        }
        temporary.push({
          name: vm.projects[i].name,
          description: vm.projects[i].description,
          startDate: vm.projects[i].startDate.slice(0, 10),
          deadline: vm.projects[i].deadline.slice(0, 10),
          applicationTypes: appType.join(),
          industries: industries.join(),
          customers: customers.join(),
          technologies: vm.projects[i].technologies.join(),
          employees: employees.join()
        });
      }
      return temporary;
    }

    function startDatefilter(index) {
      dateFilter = vm.projects.map(function (item) {
        dateForFilter = new Date(item.startDate);
        if (dateForFilter.getTime() == vm.filteredDate.startDate.getTime()) startDateFilter.push(item);
        return startDateFilter;
      });
      vm.projects = startDateFilter;
    }

    function resetFilters() {
      //getProjects();
      vm.projects = vm.projectCopy;
      vm.searchTechonology = '';
      vm.arrayTechnology = [];
      vm.searchCustomers = '';
      vm.arrayCustomers = [];
      vm.searchIndustry = '';
      vm.arrayIndustries = [];
      vm.searchAppType = '';
      vm.arrayAppType = [];
      vm.filteredDate.startDate = '';
    }

    function timeLeft() {
      var days = vm.projects.map(function (project) {
        var oneDay = 24 * 60 * 60 * 1000;
        var daysLeft = 0;
        var deadline = new Date(project.deadline);
        var startDate = new Date(project.startDate);
        var currentDay = Date.parse(today);
        var deadlineProject = Date.parse(project.deadline);
        // daysLeft = Math.round(Math.abs((deadline.getTime() - today.getTime())/(oneDay)));
        daysLeft = deadlineProject - currentDay;
        project.daysLeft = Math.ceil(daysLeft / oneDay);
        return daysLeft;
      });
    }

    function removeMultipleProjects() {
      for (var i = 0; i < vm.table.selected.length; i++) {
        vm.ids.push(vm.table.selected[i].id);
        vm.projects = _.without(vm.projects, _.findWhere(vm.projects, {
          id: vm.table.selected[i].id
        }));
      }
      ProjectModel.remove({
        id: vm.ids
      }).then(function (res) {
        $rootScope.showToast('Projects deleted successfuly!');
        vm.table.selected = [];
      }, function (err) {
        $rootScope.showToast('Projects deleted failed!');
      });
    }

    function showFormDialog(event, projects, project, index, action) {
      event.stopPropagation();
      if (!project) {
        project = new ProjectModel();
      }
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'projectForm.tmpl.html',
        controller: 'projectModal as projectM',
        targetEvent: event,
        clickOutsideToClose: true,
        data: {
          projects: projects,
          project: project,
          projectIndex: index
        }
      });
    }

    function showFormJsonDialog(event) {
      event.stopPropagation();
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'projectJsonForm.tmpl.html',
        controller: 'projectJsonModal as projectJsonM',
        targetEvent: event,
        clickOutsideToClose: true
      });
    }

    // function addFunctions() {
    //     customerModel.getFromApi().then(function(res) {
    //         $rootScope.showToast("Customers loaded!");
    //     }, function(err) {
    //         $rootScope.showToast("Error on loading customers");
    //     });
    //     Industries.getFromApi().then(function(res) {
    //         $rootScope.showToast("Industries loaded!");
    //     }, function(err) {
    //         $rootScope.showToast("Error on loading industries");
    //     });
    //     appType.getFromApi().then(function(res) {
    //         $rootScope.showToast("Application types loaded!");
    //     }, function(err) {
    //         $rootScope.showToast("Error on loading application types");
    //     });
    // }

    // function addFromApi() {
    //     addFunctions();
    //     $timeout(function() {
    //         getApps();
    //         getIndustrie();
    //         getCustomers();
    //         getTechoFromApi();
    //     }, 4000); // De ce e cu timeout ?
    //     $timeout(function() {
    //         ProjectModel.getFromApi(vm.appType, vm.industryes, vm.customers, vm.newSkillFromApi).then(function(res) {
    //             ProjectModel.saveApi(res);
    //             $rootScope.showToast("Projects loaded!");
    //         }, function(err) {
    //             $rootScope.showToast("Error on loading projects");
    //         });
    //     }, 6000); // De ce e cu timeout ?
    // }

    function deleteConfirm(event, project, index) {
      event.stopPropagation();
      var confirm = $mdDialog.confirm().title('Delete ' + ' project ?').targetEvent(event).cancel('No').ok('Yes');
      $mdDialog.show(confirm).then(function () {
        removeProject(project, index);
      });
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.projects);
    }
    // Private methods declaration
    // ------------------------------------------------------------------------
    function getApps() {
      appType.getAll().then(function (data) {
        vm.appType = data;
        return autocompleteService.buildList(vm.appType, ['name']);
      }, function (err) {});
    }

    function getIndustrie() {
      Industries.getAllIndustries().then(function (data) {
        vm.industryes = data;
        return autocompleteService.buildList(vm.industryes, ['name']);
      }, function (err) {});
    }

    function getCustomers() {
      customerModel.getAllCustomers().then(function (data) {
        vm.customers = data;
        return autocompleteService.buildList(vm.customers, ['name']);
      }, function (err) {});
    }

    function getTechs() {
      skillModel.getAll().then(function (res) {
        vm.skillList = res;
        vm.techs = res;
        autocompleteService.buildList(vm.skillList, ['name']);
      }, function (res) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    }

    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.projects = data;
        vm.projectCopy = angular.copy(vm.projects);
        timeLeft();
        return autocompleteService.buildList(vm.projects, ['name']);
      }, function (data) {});
    }

    function getTechoFromApi() {
      ProjectModel.getTecho().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].length > 0) {
            for (var j = 0; j < data[i].length; j++) {
              vm.createSkill.push({
                name: data[i][j],
                label: data[i][j]
              });
            }
          }
        }
        vm.finalTechArr = removeDuplicates(vm.createSkill);
        skillModel.saveJsons(vm.finalTechArr).then(function (data) {
          vm.newSkillFromApi = data;
        });
      });
    }

    function removeDuplicates(arr) {
      var newTechArr = [];
      angular.forEach(arr, function (value, key) {
        var exists = false;
        angular.forEach(newTechArr, function (val2, key) {
          if (angular.equals(value.name, val2.name)) {
            exists = true;
          };
        });
        if (exists == false && value.name != "") {
          newTechArr.push(value);
        }
      });
      return newTechArr;
    }

    function removeProject(project, $index) {
      var projectToRemove = {
        id: project.id
      };
      ProjectModel.remove(projectToRemove).then(function (data) {
        var projectIndex = miscellaneousService.getItemIndex(vm.projects, project.id);
        vm.projects.splice(projectIndex, 1);
        $rootScope.showToast('Project deleted successfully!');
      }, function (data) {
        $rootScope.showToast('Failed to delete project');
      });
    }
    $scope.$on('projectsListChanged', function (event, args) {
      var project = args[1];
      var projectIndex = '';
      switch (args[0]) {
        case 'save':
          if (!vm.projects) {
            vm.projects = [];
          }
          vm.projects.push(project);
          timeLeft();
          break;
        case 'update':
          projectIndex = miscellaneousService.getItemIndex(vm.projects, project.id);
          vm.projects[projectIndex] = angular.copy(project);
          timeLeft();
          break;
        default:
          getProjects();
      }
    });
    // Filters
    // -------------------------------------------------------------------------
    //technology filter
    function querySearchTechonology(query) {
      return autocompleteService.querySearch(query, vm.skillList);
    }

    function selectedTechonologyChange(items, list) {
      if (items !== undefined) {
        vm.arrayTechnology.push(items);
        searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
      }
    }

    function removeSearchTechnology(index) {
      vm.arrayTechnology.splice(index, 1);
      searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
    }
    //customer filter
    function querySearchCustomers(query) {
      return autocompleteService.querySearch(query, vm.customers);
    }

    function selectedCustomersChange(items, list) {
      if (items !== undefined) {
        vm.arrayCustomers.push(items);
        searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
      }
    }

    function removeSearchCustomers(index) {
      vm.arrayCustomers.splice(index, 1);
      searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
    }
    //industry filter
    function querySearchIndustry(query) {
      return autocompleteService.querySearch(query, vm.industryes);
    }

    function selectedIndustryChange(items, list) {
      if (items !== undefined) {
        vm.arrayIndustries.push(items);
        searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
      }
    }

    function removeSearchIndustry(index) {
      vm.arrayIndustries.splice(index, 1);
      searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
    }
    //app type filter
    function querySearchAppType(query) {
      return autocompleteService.querySearch(query, vm.appType);
    }

    function selectedAppTypeChange(items, list) {
      if (items !== undefined) {
        vm.arrayAppType.push(items);
        searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
      }
    }

    function removeSearchAppType(index) {
      vm.arrayAppType.splice(index, 1);
      searchWhenRemove(vm.arrayTechnology, vm.arrayCustomers, vm.arrayIndustries, vm.arrayAppType);
    }

    function searchWhenRemove(technologyInfo, customersInfo, industryInfo, appTypeInfo) {
      var projCpy = vm.projectCopy;
      //technology search
      if (technologyInfo.length > 0) {
        var resFinal = _.filter(technologyInfo, function (items) {
          var result = _.filter(projCpy, function (item) {
            if (item.technologies.length > 0) {
              var final = _.filter(item.technologies, function (technologies) {
                if (technologies === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          projCpy = result;
          vm.projects = result;
        });
      } else {
        vm.projects = projCpy;
      }
      //customersearch
      if (customersInfo.length > 0) {
        var resFinal = _.filter(customersInfo, function (items) {
          var result = _.filter(projCpy, function (item) {
            if (item.customers.length > 0) {
              var final = _.filter(item.customers, function (customer) {
                if (customer.name === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          projCpy = result;
          vm.projects = result;
        });
      } else {
        vm.projects = projCpy;
      }
      //industry search
      if (industryInfo.length > 0) {
        var resFinal = _.filter(industryInfo, function (items) {
          var result = _.filter(projCpy, function (item) {
            if (item.industries.length > 0) {
              var final = _.filter(item.industries, function (industry) {
                if (industry.name === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          projCpy = result;
          vm.projects = result;
        });
      } else {
        vm.projects = projCpy;
      }
      //app type search
      if (appTypeInfo.length > 0) {
        var resFinal = _.filter(appTypeInfo, function (items) {
          var result = _.filter(projCpy, function (item) {
            if (item.applicationTypes.length > 0) {
              var final = _.filter(item.applicationTypes, function (apptype) {
                if (apptype.name === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          projCpy = result;
          vm.projects = result;
        });
      } else {
        vm.projects = projCpy;
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // hraTrainingDetails directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraTrainingDetails', hraTrainingDetails);

  function hraTrainingDetails() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'trainingDetailsController',
      controllerAs: 'employeeDetails',
      templateUrl: rootTemplatePath + '/components/training/views/trainingDetails.view.html'
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // hraTrainings directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraTrainings', hraTrainings);

  function hraTrainings() {
    return {
      restrict: 'EA',
      replace: true,
      bindToController: {
        'candidate': '='
      },
      controller: 'employeesCtrl as employees',
      templateUrl: rootTemplatePath + '/components/training/views/trainings.view.html'
    };
  }
})();
'use strict';

(function () {

	'use strict';

	// skillsForm Directive
	// ------------------------------------------------------------------------

	angular.module('HRA').directive('skillsForm', formDirective);

	formDirective.$inject = [];

	function formDirective() {
		return {
			restrict: 'EA',
			controller: 'skillForm',
			templateUrl: rootTemplatePath + '/components/skill/views/skillForm.view.html'
		};
	}

	// skillForm Controller
	// ------------------------------------------------------------------------
	angular.module('HRA').controller('skillForm', skillForm);

	skillForm.$inject = ['$scope', 'skillModel', '$mdToast', '$mdDialog', '$rootScope', 'data'];

	function skillForm($scope, skillModel, $mdToast, $mdDialog, $rootScope, data) {

		var vm = this;
		vm.skill = data.skill || {};

		// public methods
		// ------------------------------------------------------------------------
		vm.saveButton = saveButton;
		vm.closeButton = closeButton;
		vm.clearButton = clearButton;

		// private methods
		// ------------------------------------------------------------------------

		var addSkill = function addSkill() {
			skillModel.save(vm.skill).then(function (res) {
				$rootScope.$emit('newSkill', res);
				$rootScope.showToast('A new skill has been added');
				$mdDialog.cancel();
			}, function (err) {
				$rootScope.showToast('Error on adding a new skill!');
			});
		};

		var updateSkill = function updateSkill() {
			skillModel.update(vm.skill).then(function (res) {
				$rootScope.$emit('upSkill', res);
				$rootScope.showToast('Skill updated');
				$mdDialog.cancel();
			}, function (err) {
				$rootScope.showToast('Error on updating skill');
			});
		};

		// public methods declaration
		// ------------------------------------------------------------------------
		function saveButton() {
			vm.skill == data.skill ? updateSkill() : addSkill();
		}

		function closeButton() {
			$mdDialog.cancel();
		}

		function clearButton() {
			vm.skill = {};
		}

		return $scope.as = vm;
	}
})();
'use strict';

(function () {

  'use strict';

  // hraSkillDetails directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('hraSkillDetails', hraSkillDetails);

  function hraSkillDetails() {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'skillDetailsController',
      controllerAs: 'skillDetails',
      templateUrl: rootTemplatePath + '/components/skill/views/skillDetails.view.html'
    };
  }

  // skillDetailsController controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('skillDetailsController', skillDetailsController);

  skillDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'skillModel', '$mdToast', 'ProjectModel'];

  function skillDetailsController($rootScope, $scope, $stateParams, skillModel, $mdToast, ProjectModel) {

    var vm = this;
    vm.viewLists = null;
    vm.viewObject = null;
    var ids = $stateParams.id;
    vm.employees = [];
    vm.candidates = [];
    vm.allProjects = [];
    vm.projects = [];

    // public methods
    // ------------------------------------------------------------------------
    vm.getSkills = getSkills;

    // public methods declaration
    // ------------------------------------------------------------------------


    // private methods declaration
    // ------------------------------------------------------------------------

    function getSkills() {
      skillModel.getAll().then(function (res) {
        vm.viewObject = res.filter(function (obj) {
          return obj.id == ids;
        });
        getProjects();
      }, function (err) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    }

    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.allProjects = data;
        getStatistics();
      }, function (data) {
        $rootScope.showToast('Holiday update failed!');
      });
    }

    function getStatistics() {
      if (vm.viewObject[0].employees.length > 0) vm.employees = vm.viewObject[0].employees;

      if (vm.viewObject[0].candidates.length > 0) vm.candidates = vm.viewObject[0].candidates;

      for (var i = 0; i < vm.allProjects.length; i++) {
        for (var j = 0; j < vm.allProjects[i].technologies.length; j++) {
          if (vm.allProjects[i].technologies[j] === vm.viewObject[0].label) vm.projects.push(vm.allProjects[i].name);
        }
      }
    }

    vm.getSkills();
  }
})();
'use strict';

(function () {

  'use strict';

  // viewSkills Directive
  // ------------------------------------------------------------------------

  angular.module('HRA').directive('viewSkills', viewDirective);

  viewDirective.$inject = [];

  function viewDirective() {
    return {
      restrict: 'EA',
      controller: 'viewController',
      templateUrl: rootTemplatePath + '/components/skill/views/skillList.view.html'
    };
  }

  // skillForm Controller
  // ------------------------------------------------------------------------
  angular.module('HRA').controller('viewController', skillsCtrl);

  skillsCtrl.$inject = ['$scope', 'skillModel', '$mdToast', '$mdDialog', '$rootScope', 'autocompleteService', '$q', '$timeout', 'ProjectModel'];

  function skillsCtrl($scope, skillModel, $mdToast, $mdDialog, $rootScope, autocompleteService, $q, $timeout, ProjectModel) {

    var vm = this;
    vm.skillList = [];
    vm.viewList = [];
    vm.viewObject = [];
    vm.ids = [];
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'name',
        filter: '',
        limit: 10,
        page: 1
      },
      "limitOptions": [10, 15, 20],
      selected: []
    };

    // public methods
    // ------------------------------------------------------------------------
    vm.showAddForm = showAddForm;
    vm.showEditForm = showEditForm;
    vm.deleteConfirm = deleteConfirm;
    vm.querySearch = querySearch;
    vm.showJsonForm = showJsonForm;
    vm.multipleDelete = multipleDelete;
    vm.showApiForm = showApiForm;

    // public methods declaration
    // ------------------------------------------------------------------------
    function showAddForm(data, skill) {
      $mdDialog.show({
        templateUrl: rootTemplatePath + '/components/skill/views/skillForm.view.html',
        controller: 'skillForm',
        clickOutsideToClose: true,
        data: {
          skill: skill
        }
      });
    }

    function showJsonForm(event) {
      event.stopPropagation();

      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'skillJson.tmpl.html',
        controller: 'skillJsonM as skillM',
        targetEvent: event,
        clickOutsideToClose: true
      });
    }

    function deleteConfirm(skillName, id) {
      event.stopPropagation();

      var confirm = $mdDialog.confirm().title('Delete the ' + skillName + ' skill ?').targetEvent(event).cancel('No').ok('Yes');

      $mdDialog.show(confirm).then(function () {
        removeSkill(id);
      });
    }

    function showEditForm(id) {
      var editedSkill = vm.skillList.filter(function (item) {
        return item.id === id;
      })[0] || {};

      $mdDialog.show({
        templateUrl: rootTemplatePath + '/components/skill/views/skillForm.view.html',
        controller: 'skillForm',
        clickOutsideToClose: true,
        data: {
          skill: angular.copy(editedSkill)
        }
      });
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.skillList);
    }

    function showApiForm() {
      vm.temporary = [];
      var totalArray = [];
      vm.skillsApi = _.flatten(vm.skillsApi);
      vm.finalSkills = _.union(vm.skillsApi, vm.skillsList);

      for (var j = 0; j < vm.finalSkills.length; j++) {
        vm.temporary.push({
          name: vm.finalSkills[j].toLowerCase(),
          label: vm.finalSkills[j]
        });
      }

      var onlyInA = vm.temporary.filter(function (current) {
        return vm.skillList.filter(function (current_b) {
          return current_b.label == current.label && current_b.display == current.display;
        }).length == 0;
      });

      var onlyInB = vm.skillList.filter(function (current) {
        return vm.temporary.filter(function (current_a) {
          return current_a.label == current.label && current_a.display == current.display;
        }).length == 0;
      });

      totalArray = onlyInA.concat(onlyInB);
      if (totalArray.length !== 0) skillModel.saveJsons(totalArray).then(function (res) {
        vm.skillList = vm.skillList.concat(res);
      }, function (err) {
        $rootScope.showToast('Error on adding a new skill!');
      });
    }

    // private methods
    // ------------------------------------------------------------------------
    function removeSkill(id) {

      skillModel.remove({
        id: id
      }).then(function (res) {
        vm.skillList = _.without(vm.skillList, _.findWhere(vm.skillList, {
          id: id
        }));
        $rootScope.showToast('Skill deleted');
      }, function (err) {
        $rootScope.showToast('Error on deleting the skill!');
      });
    }

    function _getSkills() {
      skillModel.getAll().then(function (res) {
        vm.skillList = res;
        getProjects();
        return autocompleteService.buildList(vm.skillList, ['name']);
      }, function (res) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    }

    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.projects = data;
        vm.skillsApi = [];
        vm.finalSkills = [];
        vm.temporary = [];
        for (var i = 0; i < vm.projects.length; i++) {
          vm.skillsApi.push(vm.projects[i].technologies);
        }
      }, function (data) {});
    }

    function multipleDelete() {
      for (var i = 0; i < vm.table.selected.length; i++) {
        vm.ids.push(vm.table.selected[i].id);
        vm.skillList = _.without(vm.skillList, _.findWhere(vm.skillList, {
          id: vm.table.selected[i].id
        }));
      }
      removeSkill(vm.ids);
      vm.table.selected = [];
    }

    function init() {
      _getSkills();
    }

    $rootScope.$on('newSkill', function (event, data) {
      vm.skillList.push(data);
    });

    $rootScope.$on('json', function (event, data) {
      for (var i = 0; i < data.length; i++) {
        vm.skillList.push(data[i]);
      }
    });

    $rootScope.$on('upSkill', function (event, data) {
      _getSkills();
      vm.table.selected = [];
    });
    init();

    return $scope.sk = vm;
  }
})();
'use strict';

(function () {

  'use strict';

  // main controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('mainController', mainController);

  mainController.$inject = ['$rootScope', '$mdToast', '$scope'];

  function mainController($rootScope, $mdToast, $scope) {

    $rootScope.showToast = function (message) {
      $mdToast.show($mdToast.simple().textContent(message).position("top right").hideDelay(1200));
    };
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @hraEmployeeCvController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('hraEmployeeCvController', hraEmployeeCvController);

  hraEmployeeCvController.$inject = ['$rootScope', '$scope', '$stateParams', 'Employee', '$window'];

  function hraEmployeeCvController($rootScope, $scope, $stateParams, Employee, $window) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.formTitle = 'Employee Profile';
    vm.employeeCvData = '';
    vm.createJob = [];
    vm.educationIncrement = [];
    vm.courseIncrement = [];
    vm.print = print;

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    getEmployeeById($stateParams.id, vm.candidate);

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function getEmployeeById(id, candidate) {
      Employee.getById(id, candidate).then(function (data) {
        vm.employeeCvData = data;
        transformJob(vm.employeeCvData.jobDetail);
        transformEducation(vm.employeeCvData.education);
        transformCourses(vm.employeeCvData.coursesAndCertifications);
      }, function (data) {
        console.log(data);
      });
    }

    function transformJob(data) {
      if (data !== null && data !== undefined && data !== '') {
        if (data.length > 0) {
          for (var j = 0; j < data.length; j++) {
            vm.createJob.push(angular.fromJson(data[j]));
          }
        } else if (data.length === 0) {
          return;
        } else {
          vm.createJob.push(angular.fromJson(data));
        }
      }
    }

    function transformEducation(data) {
      if (data !== null && data !== undefined && data !== '') {
        if (data.length > 0) {
          for (var x = 0; x < data.length; x++) {
            vm.educationIncrement.push(angular.fromJson(data[x]));
          }
        } else if (data.length === 0) {
          return;
        } else {
          vm.educationIncrement.push(angular.fromJson(data));
        }
      }
    }

    function transformCourses(data) {

      if (data !== null && data !== undefined && data !== '') {
        if (data.length > 0) {
          for (var j = 0; j < data.length; j++) {
            vm.courseIncrement.push(angular.fromJson(data[j]));
          }
        } else if (data.length === 0) {
          return;
        } else {
          vm.courseIncrement.push(angular.fromJson(data));
        }
      }
    }

    function print(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" href="/styles/importer.css"><style>' + '#print-hide {display: none !important;}' + '.ng-hide { display: none !important; }' + '</style></head><body onload="window.print(); window.close();">' + printContents + '</body></html>');
      popupWin.document.close();
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @employeeCourseController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeCourseController', employeeCourseController);

  employeeCourseController.$inject = ['$rootScope', '$scope', '$stateParams'];

  function employeeCourseController($rootScope, $scope, $stateParams) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.disabledCourses = true;
    vm.courseIncrement = [];
    vm.courseDates = [];
    vm.courseList = [];
    vm.month = [];
    vm.copyCat = [];

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      updateCourses();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.addNewCourse = addNewCourse;
    vm.changeCourseView = changeCourseView;
    vm.saveEmployee = saveEmployee;
    vm.removeCourse = removeCourse;
    vm.cancelAdd = cancelAdd;
    vm.toggleCard = toggleCard;

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function addNewCourse() {
      vm.courseIncrement.push({});
    }

    function changeCourseView() {
      vm.disabledCourses = false;
    }

    function removeCourse(index) {
      vm.courseIncrement.splice(index, 1);
      vm.courseList.length = 0;
      vm.courseDates.length = 0;
      for (var i = 0; i < vm.courseIncrement.length; i++) {
        vm.courseList[i] = vm.courseIncrement[i] ? {
          title: vm.courseIncrement[i].title,
          diploma: vm.courseIncrement[i].diploma,
          issue: vm.courseIncrement[i].issue
        } : '';
        vm.courseDates[i] = vm.courseIncrement[i] ? {
          from: new Date(vm.courseIncrement[i].from),
          to: new Date(vm.courseIncrement[i].to)
        } : '';
      }
    }

    function saveEmployee(employee) {
      fill(employee);
      vm.disabledCourses = true;
      vm.copyCat = angular.copy(vm.courseIncrement);
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    function cancelAdd() {
      vm.disabledCourses = true;
      for (var i = vm.copyCat.length; i < vm.courseIncrement.length; i++) {
        vm.courseList[i] = '';
        vm.courseDates[i] = new Date();
      }
      vm.courseIncrement = _.initial(vm.courseIncrement, vm.courseIncrement.length - vm.copyCat.length);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function updateCourses() {
      vm.courseIncrement = [];
      vm.montPicker = [];

      if (vm.employee.coursesAndCertifications !== null && vm.employee.coursesAndCertifications !== undefined && vm.employee.coursesAndCertifications !== '') {
        if (vm.employee.coursesAndCertifications.length > 0) {
          for (var j = 0; j < vm.employee.coursesAndCertifications.length; j++) {
            vm.courseIncrement.push(angular.fromJson(vm.employee.coursesAndCertifications[j]));
          }
        } else if (vm.employee.coursesAndCertifications.length === 0) {
          return;
        } else {
          vm.courseIncrement.push(angular.fromJson(vm.employee.coursesAndCertifications));
        }
        vm.copyCat = angular.copy(vm.courseIncrement);
        for (var i = 0; i < vm.courseIncrement.length; i++) {
          vm.courseList[i] = vm.courseIncrement[i] ? {
            title: vm.courseIncrement[i].title,
            diploma: vm.courseIncrement[i].diploma,
            issue: vm.courseIncrement[i].issue
          } : '';
        }
        if (_.isString(vm.employee.coursesDate)) {
          vm.montPicker.push(vm.employee.coursesDate);
        } else {
          vm.montPicker = angular.fromJson(vm.employee.coursesDate);
        }
        for (var j in vm.montPicker) {
          vm.courseDates[j] = new Date(vm.montPicker[j]);
        }
      }
    }

    function fill(employee) {
      vm.month = [];
      for (var i = 0; i < vm.courseIncrement.length; i++) {
        vm.courseIncrement[i] = {
          title: vm.courseList[i].title,
          diploma: vm.courseList[i].diploma,
          issue: vm.courseList[i].issue
        };
      }for (var j in vm.courseDates) {
        vm.month.push(vm.courseDates[j]);
      }

      employee.coursesDate = angular.toJson(vm.month);

      vm.employee.coursesAndCertifications = angular.toJson(vm.courseIncrement);

      vm.employee.equipments = vm.employee.equipments;

      return employee;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeDetailsController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeDetailsController', employeeDetailsController);

  employeeDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'Employee', 'skillModel', 'ProjectModel', 'HolidayModel'];

  function employeeDetailsController($rootScope, $scope, $stateParams, Employee, skillModel, ProjectModel, HolidayModel) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    var employeeId = $stateParams.id;
    vm.employeeResources = {};
    vm.formTitle = 'Employee Profile';
    //vm.saveEmployee = saveEmployee;


    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------


    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    getEmployeeResources();
    $rootScope.$on('event:toggleCard', scrollToCard);

    // ----------------------------------------------------------------------
    // PUBLIC METHODS
    // ----------------------------------------------------------------------


    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function scrollToCard(event, card, action) {

      if (action === 'open') {
        card.addClass('is-opened');
      }

      if (action === 'close') {
        card.removeClass('is-opened');

        angular.element('html, body').animate({
          scrollTop: card.offset().top - 100
        }, 500);
      }
    }

    // ----------------------------------------------------------------------
    //  START LOADING EMPLOYEE RESOURCES

    function getEmployeeResources() {

      Employee.getById(employeeId, vm.candidate).then(getEmployeeById)
      // .then(getAllSkills)
      // .then(getAllProjects)
      // .then(getAllEmployees)
      // .then(getAllHolidays)
      .catch(handleErrorChain);
    }

    function getEmployeeById(employee) {

      console.log('CONTROLLER: Load employee by id');

      vm.employee = employee;
      vm.progress = getProfileProgress(vm.employee);

      // return skillModel.getAll();

      resourcesAreLoaded();
    }

    function getAllSkills(skills) {

      console.log('CONTROLLER: Load all skills');
      vm.employeeResources.skills = skills;

      return ProjectModel.getAll();
    }

    function getAllProjects(projects) {

      console.log('CONTROLLER: Load all projects');
      vm.employeeResources.projects = projects;

      return Employee.getAll();
    }

    function getAllEmployees(employees) {

      console.log('CONTROLLER: Load all employees');
      vm.employeeResources.employees = employees;

      return HolidayModel.getAll();
    }

    function getAllHolidays(holidays) {

      console.log('CONTROLLER: Load all holidays');
      vm.employeeResources.holidays = holidays;

      resourcesAreLoaded();
    }

    function resourcesAreLoaded() {
      // Sa scap de primele doua si sa ramana doar ultima
      $rootScope.$emit("employeeIsLoadedEvent", vm.employee, vm.candidate, vm.progress);

      $rootScope.$emit("event:employeeIsLoaded", vm.employee, vm.candidate, vm.progress);

      $rootScope.$emit("event:employeeResourcesLoaded", vm.employeeResources, vm.employee, vm.candidate, vm.progress);
    }

    function getProfileProgress(data) {

      console.log('CONTROLLER: Get profile progress');
      var allPropertiesLength = Object.keys(data).length;
      var completedPropertiesLength = '';
      var completedProperties = [];
      var profileProgress = 0;

      angular.forEach(data, function (value) {
        if (value) {
          completedProperties.push(value);
        }
      });

      completedPropertiesLength = completedProperties.length;
      profileProgress = completedPropertiesLength / allPropertiesLength * 100;
      return Math.round(profileProgress);
    }

    function handleErrorChain(error) {

      console.log('Error: ', error);
    }

    //  END LOADING EMPLOYEE RESOURCES
    // ----------------------------------------------------------------------


    var update = $rootScope.$on('callSaveMethodCards', function (event, employee) {
      // Update profile progress bar
      // Progress function ar putea fi pusa la comun poate
      vm.progress = getProfileProgress(employee);
      $rootScope.$emit("event:updateProgress", vm.progress);

      var currentEmployee = angular.copy(employee);
      if (!employee.id) {
        Employee.create(currentEmployee);
        return Employee.save(currentEmployee, vm.candidate).then(function (data) {

          $rootScope.showToast('Employee created successfuly!');
          // addUsedEquipment();
          Employee.getById(data.id, vm.candidate).then(function (data) {
            onSaveSuccess('save', Employee.create(data));
          }, function () {
            // De facut si la eroare
          });

          vm.employee = {};
        }, function (error) {
          $rootScope.showToast('Employee creation failed!');
          onSaveError(error);
        });
      } else {
        return Employee.update(currentEmployee, vm.candidate).then(function () {
          $rootScope.showToast('Employee updated successfuly!');
          Employee.getById(currentEmployee.id, vm.candidate).then(function (data) {
            onSaveSuccess('update', data);
          }, function () {

            // De facut si la eroare
          });
        }, function (error) {
          $rootScope.showToast('Employee update failed!', error);
          onSaveError();
        });
      }
    });

    // merge dar probabil nu este cea mai buna varianta(pentru a face doar
    //un update
    $scope.$on('$destroy', function () {
      update();
    });

    function onSaveSuccess(action, employee) {
      vm.btnIsDisabled = false;
      vm.serverErrors = false;
      $rootScope.$broadcast('employeesListChanged', [action, employee]);
      $rootScope.$emit("event:employeeDetailsUpdated", employee);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeEducationController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeEducationController', employeeEducationController);

  employeeEducationController.$inject = ['$rootScope', '$scope', '$stateParams', 'skillModel', 'Employee', 'autocompleteService', 'miscellaneousService'];

  function employeeEducationController($rootScope, $scope, $stateParams, skillModel, Employee, autocompleteService, miscellaneousService) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.disabledEducations = true;
    vm.educationIncrement = [];
    vm.educationDates = [];
    vm.educationList = [];
    vm.copyCat = [];

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      updateEducation();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.changeEducationView = changeEducationView;
    vm.removeEducation = removeEducation;
    vm.addNewEducation = addNewEducation;
    vm.saveEmployee = saveEmployee;
    vm.cancelAdd = cancelAdd;
    vm.toggleCard = toggleCard;

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function addNewEducation() {
      vm.educationIncrement.push({});
    }

    function changeEducationView() {
      vm.disabledEducations = false;
    }

    function removeEducation(index) {
      vm.educationIncrement.splice(index, 1);
      vm.educationList.length = 0;
      vm.educationDates.length = 0;
      for (var i = 0; i < vm.educationIncrement.length; i++) {
        vm.educationList[i] = vm.educationIncrement[i] ? {
          school: vm.educationIncrement[i].school,
          diploma: vm.educationIncrement[i].diploma,
          field: vm.educationIncrement[i].field
        } : '';
        vm.educationDates[i] = vm.educationIncrement[i] ? {
          from: new Date(vm.educationIncrement[i].from),
          to: new Date(vm.educationIncrement[i].to)
        } : '';
      }
    }

    function saveEmployee(employee) {
      fill(employee);
      vm.disabledEducations = true;
      vm.copyCat = angular.copy(vm.educationIncrement);
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    function cancelAdd() {
      vm.disabledEducations = true;
      for (var i = vm.copyCat.length; i < vm.educationIncrement.length; i++) {
        vm.educationList[i] = "";
        vm.educationDates[i] = "";
      }
      vm.educationIncrement = _.initial(vm.educationIncrement, vm.educationIncrement.length - vm.copyCat.length);
    }

    // ----------------------------------------------------------------------
    // Private methods declaration
    // ----------------------------------------------------------------------

    function updateEducation() {
      if (vm.employee.education !== null && vm.employee.education !== undefined && vm.employee.education !== '') {
        if (vm.employee.education.length > 0) {
          for (var x = 0; x < vm.employee.education.length; x++) {
            vm.educationIncrement.push(angular.fromJson(vm.employee.education[x]));
          }
        } else if (vm.employee.education.length === 0) {
          return;
        } else {
          vm.educationIncrement.push(angular.fromJson(vm.employee.education));
        }
        vm.copyCat = angular.copy(vm.educationIncrement);
        for (var i = 0; i < vm.educationIncrement.length; i++) {
          vm.educationList[i] = vm.educationIncrement[i] ? {
            school: vm.educationIncrement[i].school,
            diploma: vm.educationIncrement[i].diploma,
            field: vm.educationIncrement[i].field
          } : '';
          vm.educationDates[i] = vm.educationIncrement[i] ? {
            from: new Date(vm.educationIncrement[i].from),
            to: new Date(vm.educationIncrement[i].to)
          } : '';
        }
      }
    }

    function fill(employee) {
      for (var i = 0; i < vm.educationIncrement.length; i++) {
        vm.educationIncrement[i] = {
          school: vm.educationList[i].school,
          diploma: vm.educationList[i].diploma,
          field: vm.educationList[i].field,
          from: vm.educationDates[i].from,
          to: vm.educationDates[i].to
        };
      }vm.employee.education = angular.toJson(vm.educationIncrement);
      vm.employee.equipments = vm.employee.equipments;

      employee = vm.employee;
      return employee;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @emplyeeGeneralInfoCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('hraEquipmentsCtrl', hraEquipmentsCtrl);

  hraEquipmentsCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'Employee', 'Equipments', '$q'];

  function hraEquipmentsCtrl($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, Employee, Equipments, $q) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.serverErrors = false;
    vm.equipmentNr = [];
    vm.form = {} || null;
    vm.minus = [];
    vm.disabledEquipments = true;
    vm.searchEquipment = {};
    vm.createEquipments = [];
    vm.copyCat = [];
    vm.equimentAdd1 = [];
    vm.eq = [];
    vm.equipmentsLabels = ['Monitor 1', 'Monitor 2', 'PC/Laptop', 'Mobile device'];

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    vm.saveEmployee = saveEmployee;
    vm.clearFields = clearFields;
    vm.cancelAdd = cancelAdd;
    vm.querySearchEquipments = querySearchEquipments;
    vm.addEquipments = addEquipments;
    vm.addEquipment = addEquipment;
    vm.addNewEq = addNewEq;
    vm.generalInfoShowHide = generalInfoShowHide;
    vm.searchTextChange = searchTextChange;
    vm.toggleCard = toggleCard;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      getEquipments();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveEmployee(employee) {
      fill(employee);

      vm.copyCat = angular.copy(vm.replaceEq);
      //vm.equimentAdd = [];
      $timeout(function () {
        $rootScope.$emit("callSaveMethodCards", employee);
        vm.disabledEquipments = true;
        vm.equimentAdd = [];
      }, 350);
    }

    function clearFields() {
      vm.employee = {};
    }

    function cancelAdd() {
      vm.disabledEquipments = true;

      for (var i = vm.copyCat.length; i < vm.replaceEq.length; i++) {
        vm.searchEquipment[i] = "";
      }

      vm.form = {};
      vm.hideNewEq = false;
      vm.replaceEq = _.initial(vm.replaceEq, vm.replaceEq.length - vm.copyCat.length);
      vm.createEquipments.length = vm.replaceEq.length;

      if (vm.replaceEq.length < 4) vm.createEquipments.length = 4;
    }

    function getEquipments() {
      Equipments.list().then(function (res) {
        vm.equipmentsList = res;
        updateAutocompleteEquipments(vm.equipmentsList);
        return autocompleteService.buildList(vm.equipmentsList, ['name', 'description']);
      }, function (err) {
        $rootScope.showToast('Something gone wrong');
      });
    }

    function updateAutocompleteEquipments(allEquipments) {
      vm.createEquipments.length = 4;
      if (vm.employee.equipments !== null && vm.employee.equipments !== undefined) {
        if (vm.employee.equipments.length > 4) {
          vm.createEquipments.length = vm.employee.equipments.length;
        }
        vm.replaceEq = vm.employee.equipments;
        //console.log("in update", vm.replaceEq);
        vm.copyCat = angular.copy(vm.replaceEq);
        for (var i = 0; i <= vm.employee.equipments.length; i++) {
          vm.searchEquipment[i] = vm.employee.equipments[i] ? vm.employee.equipments[i].name + ' ' + vm.employee.equipments[i].description : '';
        }
      }
      $timeout(function () {
        vm.equimentAdd = [];
        //  console.log(vm.equimentAdd);
      }, 100);
    }

    function querySearchEquipments(query) {
      return autocompleteService.querySearch(query, vm.equipmentsList);
    }

    function addEquipment() {
      vm.createEquipments.push({});
    }

    function addNewEq() {
      vm.hideNewEq = true;
    }

    function addEquipments(item, employee, nr) {
      vm.replaceEq[nr] = item;
      //  console.log("vm.replaceEq", vm.replaceEq);
      // console.log("vm.equimentAdd", vm.equimentAdd);
    }

    function searchTextChange(index, item) {
      // console.log("item.id",item.id);
      //console.log("vm.equimentAdd1 before", vm.equimentAdd);
      if (item !== "") {
        vm.equimentAdd[index] = {
          name: item,
          description: ""
        };
      }

      if (item === "") {
        vm.replaceEq[index] = undefined;
      }

      // console.log("vm.replaceEq1", vm.replaceEq);
      // console.log("vm.equimentAdd1", vm.equimentAdd);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function removeEq(index, equipment) {
      vm.minus.push(equipment);
      vm.employee.equipments.splice(index, 1);
    }

    function fill(employee) {
      vm.constr = [];
      vm.employee.equipments = vm.replaceEq;

      vm.saveEq(vm.equimentAdd).then(function (rez) {
        for (var i = 0; i < vm.replaceEq.length; i++) {
          if (vm.replaceEq[i] !== undefined) {
            vm.constr.push(vm.replaceEq[i]);
          }
        }

        for (var i = 0; i < rez.length; i++) {
          vm.constr.push(rez[i]);
        }

        vm.replaceEq = [];
        vm.replaceEq = vm.constr;
        vm.employee.equipments = vm.replaceEq;
      }, function (err) {
        console.log(err);
      });

      $timeout(function () {
        vm.replaceEq = vm.replaceEq.filter(function (item) {
          return item !== undefined;
        });
      }, 200);

      $timeout(function () {
        vm.employee.equipments = vm.replaceEq;
        employee = vm.employee;
        vm.form = {};
        vm.hideNewEq = false;
        return employee;
      }, 300);
    }

    vm.saveEq = function (data) {
      function promise(resolve, reject) {
        saveEquipment(data).then(function (data) {
          return resolve(data);
        }, function (error) {
          return reject(error);
        });
      }

      return $q(promise);
    };

    function saveEquipment(data) {
      vm.eq = [];

      function promise(resolve, reject) {
        for (var i = 0; i < data.length; i++) {
          if (data[i] !== undefined && data[i].name !== "") {
            Equipments.save(data[i]).then(function (res) {

              vm.eq.push(res);
              $timeout(function () {
                return resolve(vm.eq);
              }, 100);
            }, function (err) {
              return reject(err);
            });
          }
        }
      }
      return $q(promise);
    }

    function generalInfoShowHide(data) {
      if (data === 'equipments') {
        vm.disabledEquipments = false;
        getEquipments();
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeFormCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeFormController', employeeFormController);

  employeeFormController.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'Employee', 'Equipments', 'Callback', 'skillModel'];

  function employeeFormController($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, Employee, Equipments, Callback, skillModel) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.serverErrors = false;
    vm.btnIsDisabled = false;
    vm.equipmentNr = [];
    vm.minus = [];
    vm.employee.schedule = {
      "monday": ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 12:30", "12:30 - 13:30 (lunch)", "13:30 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"],
      "tuesday": ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 12:30", "12:30 - 13:30 (lunch)", "13:30 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"],
      "wednesday": ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 12:30", "12:30 - 13:30 (lunch)", "13:30 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"],
      "thursday": ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 12:30", "12:30 - 13:30 (lunch)", "13:30 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"],
      "friday": ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 12:30", "12:30 - 13:30 (lunch)", "13:30 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"]
    };

    // ----------------------------------------------------------------------
    // PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.saveEmployee = saveEmployee;
    vm.querySearch = querySearch;
    vm.addSkill = addSkill;
    vm.removeSkill = removeSkill;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;
    vm.querySearchEquipments = querySearchEquipments;
    vm.addEquipments = addEquipments;
    vm.searchTextChange = searchTextChange;
    vm.removeEq = removeEq;

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    // getSkills();
    // getEquipments();


    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function saveEmployee(employee) {
      var currentEmployee = angular.copy(employee);
      vm.generalInfo = true;
      vm.btnIsDisabled = true;
      if (!employee.id) {
        var newEmployee = Employee.create(currentEmployee);

        return Employee.save(currentEmployee, vm.candidate).then(function (data) {

          $rootScope.showToast('Employee created successfuly!');
          addUsedEquipment();
          Employee.getById(data.id, vm.candidate).then(function (data) {
            onSaveSuccess('save', Employee.create(data));
          }, function () {
            // De facut si la eroare
          });

          vm.employee = {};
          addUsedEquipment();
        }, function (error) {
          $rootScope.showToast('Employee creation failed!');
          onSaveError(error);
        });
      } else {
        return Employee.update(currentEmployee, vm.candidate).then(function (data) {
          $rootScope.showToast('Employee updated successfuly!');
          addUsedEquipment();
          Employee.getById(currentEmployee.id, vm.candidate).then(function (data) {
            onSaveSuccess('update', data);
          }, function () {

            // De facut si la eroare
          });
        }, function (error) {
          $rootScope.showToast('Employee update failed!');
          onSaveError();
        });
      }
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.allSkills);
    }

    function addSkill(item, employee) {
      var skillIndex = '';

      if (item) {
        skillIndex = miscellaneousService.getItemIndex(vm.allSkills, item.id);
        vm.allSkills.splice(skillIndex, 1);
        employee.skills.push(item);
        vm.searchText = "";
      } else {
        return;
      }
    }

    function removeSkill(item, employee) {
      var skillIndex = miscellaneousService.getItemIndex(employee.skills, item.id);
      vm.allSkills.push(employee.skills[skillIndex]);
      employee.skills.splice(skillIndex, 1);
    }

    function clearFields() {
      vm.employee = {};
    }

    function closeDialog() {
      $mdDialog.cancel();
    }

    function querySearchEquipments(query) {
      return autocompleteService.querySearch(query, vm.equipmentsList);
    }

    function addEquipments(item, employee, nr, model) {
      var eqIndex = '';
      if (item) {
        if (item.used === item.total) {
          Callback.error("This equipment is out of stock");
        } else {
          eqIndex = miscellaneousService.getItemIndex(vm.equipmentsList, item.id);
          vm.equipmentsList.splice(eqIndex, 1);
          employee.equipments.push(item);
          vm.equipmentNr.push({
            "nr": nr,
            "id": item.id,
            "used": item.used,
            "total": item.total,
            "name": item.name
          });
        }
      } else {
        return;
      }
    }

    function searchTextChange(index) {
      for (var i = 0; i < vm.equipmentNr.length; i++) {
        if (index === vm.equipmentNr[i].nr) {
          vm.equipmentNr.splice(i, 1);
          vm.employee.equipments.splice(i, 1);
        }
      }
    }

    function addUsedEquipment() {
      var data = {
        "id": "",
        "used": ""
      };
      var dataminus = {
        "id": "",
        "used": ""
      };
      for (var i = 0; i < vm.equipmentNr.length; i++) {
        if (vm.equipmentNr[i].total === vm.equipmentNr[i].used) {
          Callback.error();
        } else {
          data = {
            "id": vm.equipmentNr[i].id,
            "used": vm.equipmentNr[i].used + 1
          };
          Equipments.update(data).then(function (res) {
            $mdDialog.cancel();
            $rootScope.$emit('eqReplace', res);
          }, function (err) {
            Callback.error();
          });
        }
      }
      if (vm.minus.length != 0) {
        for (var i = 0; i < vm.minus.length; i++) {
          dataminus = {
            "id": vm.minus[i].id,
            "used": vm.minus[i].used - 1
          };
          Equipments.update(dataminus).then(function (res) {
            $mdDialog.cancel();
            $rootScope.$emit('eqReplace', res);
          }, function (err) {
            Callback.error();
          });
        }
      }
    }

    function removeEq(index, equipment) {
      vm.minus.push(equipment);
      vm.employee.equipments.splice(index, 1);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ------------------------------------------------------------------------

    function getSkills() {
      skillModel.getAll().then(function (data) {
        vm.allSkills = data;
        updateAutocompleteSkills(vm.allSkills);
        return autocompleteService.buildList(vm.allSkills, ['name']);
      }, function (err) {});
    }

    function updateAutocompleteSkills(allSkills) {
      var index = 0;
      var indexSkillToRemove = '';

      for (index; index < vm.employee.skills.length; index++) {
        indexSkillToRemove = miscellaneousService.getItemIndex(allSkills, vm.employee.skills[index].id);
        allSkills.splice(indexSkillToRemove, 1);
      }
    }

    function onSaveSuccess(action, employee) {
      vm.btnIsDisabled = false;
      vm.serverErrors = false;
      $scope.employeeform.$setUntouched();
      $rootScope.$broadcast('employeesListChanged', [action, employee]);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }

    function getEquipments() {
      Equipments.list().then(function (res) {
        vm.equipmentsList = res;
        return autocompleteService.buildList(vm.equipmentsList, ['name', 'description']);
      }, function (err) {
        Callback.error();
      });
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @emplyeeGeneralInfoCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('emplyeeGeneralInfoCtrl', emplyeeGeneralInfoCtrl);

  emplyeeGeneralInfoCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'Employee', '$location', 'apiUrl'];

  function emplyeeGeneralInfoCtrl($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, Employee, $location, apiUrl) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    var vm = this;
    vm.serverErrors = false;
    vm.disabledgeneralInfo = true;
    vm.teamLeader = [];
    vm.employees = [];
    /* beautify preserve:end */

    vm.contractType = ['Full-time', 'Part-time 4h', 'Part-time 6h'];

    vm.employeeAssistPositionTitles = ['Junior iOS Developer', 'Junior Java Developer', 'Junior JavaScript Developer', 'Junior Designer', 'Junior Developer', 'Junior Front End Developer', 'Junior Mobile Developer', 'Junior Tester', 'Junior Web Developer', 'Junior .Net Developer', 'Junior Android Developer', 'Junior Android Tester', 'Junior Game Developer', 'Junior Graphic Designer', 'Junior Rails Developer', 'Junior Web Developer', 'Middle iOS Developer', 'Middle Java Developer', 'Middle JavaScript Developer', 'Middle Designer', 'Middle Developer', 'Middle Front End Developer', 'Middle Mobile Developer', 'Middle Tester', 'Middle Web Developer', 'Middle .Net Developer', 'Middle Android Developer', 'Middle Android Tester', 'Middle Game Developer', 'Middle Graphic Designer', 'Middle Rails Developer', 'Middle Web Developer', 'Senior iOS Developer', 'Senior Java Developer', 'Senior JavaScript Developer', 'Senior Designer', 'Senior Developer', 'Senior Front End Developer', 'Senior Mobile Developer', 'Senior Tester', 'Senior Web Developer', 'Senior .Net Developer', 'Senior Android Developer', 'Senior Android Tester', 'Senior Game Developer', 'Senior Graphic Designer', 'Senior Rails Developer', 'Art Director', 'Chief Executive Officer', 'Chief Information Officer', 'Chief Technology Officer', 'Head of Cloud Engineering', 'Head of Design', 'Head of Development', 'Head of Education', 'Head of European Projects', 'Head of Front End Development', 'Head of Games', 'Head of Health Development', 'Head of Innovation', 'Head of Microsoft Technologies', 'Head of Mobile Development', 'Head of Research', 'Head of Testing', 'Head of Web Development', 'HR Manager'];

    vm.candidatesPositionTitle = ['Javascript Developer', 'Front End Engineer', 'Java Developer', 'QA Engineer', '3D Designer', 'Software Engineer', 'Android Developer', 'C# Developer', 'iOS Developer', 'Other Positions', 'Rejected'];

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    vm.saveEmployee = saveEmployee;
    vm.clearFields = clearFields;
    vm.cancelAdd = cancelAdd;
    vm.generalInfoShowHide = generalInfoShowHide;
    vm.upload = upload;
    vm.emplSearch = emplSearch;
    vm.selectedItemChange = selectedItemChange;
    vm.getSelectedText = getSelectedText;
    vm.removeYourTeam = removeYourTeam;
    vm.toggleCard = toggleCard;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee, candidate, progress) {
      vm.progress = progress;
      vm.employee = employee;
      vm.employee.officeTeamLider = vm.employee.officeTeamLider;
      vm.copyGeneralInfo = angular.copy(vm.employee);
      vm.copyCat = angular.copy(vm.employee);
      vm.name = vm.employee.firstName + ' ' + vm.employee.lastName;
      if (vm.employee.birthday !== null) {
        vm.employee.birthday = new Date(vm.employee.birthday);
      }

      if (vm.employee.assistStartDate !== null) {
        vm.employee.assistStartDate = new Date(vm.employee.assistStartDate);
      }
      vm.employee.languages = angular.toJson(vm.employee.languages);
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    $rootScope.$on('event:updateProgress', function (event, progress) {
      vm.progress = progress;
    });

    // getEmployeAll();


    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    vm.pId = $location.path().split("/")[2] || "Unknown"; //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
    function saveEmployee(employee) {
      fill(employee);
      vm.copyCat = angular.copy(vm.employee);
      vm.disabledgeneralInfo = true;
      $rootScope.$emit("callSaveMethodCards", employee);
      vm.showSuccessMsg = false;
    }

    function clearFields() {
      vm.employee = {};
    }

    function cancelAdd() {
      vm.disabledgeneralInfo = true;
      vm.employee.urgentContact = vm.copyCat.urgentContact;
      vm.employee.address = vm.copyCat.address;
      vm.employee.firstName = vm.copyCat.firstName;
      vm.employee.lastName = vm.copyCat.lastName;
      vm.employee.middleName = vm.copyCat.middleName;
      vm.employee.phone = vm.copyCat.phone;
      vm.employee.emailOther = vm.copyCat.emailOther;
      vm.employee.carPlate = vm.copyCat.carPlate;
      vm.showSuccessMsg = false;
    }

    function upload(file) {
      if (file === null) {
        vm.showToLargeImage = true;
      }

      Upload.upload({
        url: apiUrl + '/fileupload/uploadPic',
        data: {
          uploadFile: file
        }
      }).then(function (resp) {
        if (resp.data.file.length === 1) {
          vm.showToLargeImage = false;
          vm.pictures = '/images/' + resp.data.file[0].fd.substr(resp.data.file[0].fd.lastIndexOf('/') + 1);
          vm.showSuccessMsg = true;
        }
      }, function (err) {
        $timeout(function () {
          vm.showErrMsg = true;
        }, 1000);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.log = progressPercentage;
      });
    }

    function emplSearch(query) {
      return autocompleteService.querySearch(query, vm.employees);
    }

    function selectedItemChange(item) {
      if (item !== undefined) {
        vm.teamLeader.push(item);
      }
    }

    function getSelectedText(item, contractOrposition) {
      if (item !== undefined && item !== null) {
        return item;
      } else {
        if (contractOrposition === 0) {
          return "Contract type...";
        } else {
          return "Position title...";
        }
      }
    }

    function removeYourTeam(item, index) {
      vm.teamLeader.splice(index, 1);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function fill(employee) {
      var pb = [];
      if (vm.employee.urgentContact !== null) {
        vm.employee.urgentContact = {
          "ContactName": vm.employee.urgentContact.ContactName,
          "ContactPhone": vm.employee.urgentContact.ContactPhone
        };
      }

      if (vm.employee.address !== null) {
        vm.employee.address = {
          "city": vm.employee.address.city,
          "zip": vm.employee.address.zip,
          "adresa": vm.employee.address.adresa
        };
      }

      vm.employee.equipments = vm.employee.equipments;
      vm.employee.picture = vm.pictures;
      vm.employee.officeTeamLider = vm.teamLeader;

      employee = vm.employee;
      return employee;
    }

    function updateTeamLider() {

      vm.teamLeader = vm.employees.filter(function (item) {
        return item.firstName + ' ' + item.lastName === vm.name;
      });
      for (var i in vm.teamLeader) {
        vm.teamLeader[i] = vm.teamLeader[i].firstName + ' ' + vm.teamLeader[i].lastName;
      }
    }

    function getEmployeAll() {
      Employee.getAll(vm.candidate).then(function (data) {
        vm.employees = data;
        updateTeamLider();
        vm.emplCopy = angular.copy(vm.employees);
        return autocompleteService.buildList(vm.employees, ['firstName', 'lastName']);
      }, function (data) {});
    }

    function generalInfoShowHide(data) {
      if (data === 'general') {
        vm.disabledgeneralInfo = false;
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeHolidayController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeHolidayController', employeeHolidayController);

  employeeHolidayController.$inject = ['$rootScope', '$scope', '$stateParams', 'ProjectModel', 'Employee', 'HolidayModel', 'autocompleteService', 'miscellaneousService'];

  function employeeHolidayController($rootScope, $scope, $stateParams, ProjectModel, Employee, HolidayModel, autocompleteService, miscellaneousService) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------


    var vm = this;
    var replacementProject = null;
    var replacementEmployee = null;

    var interval = {
      'from': null,
      'to': null
    };

    vm.showForm = false;

    vm.currentHolidayDefault = {
      'employeeId': null,
      'employee': null,
      'teamLeader': null,
      'signingDate': null,
      'days': null,
      'intervals': [],
      'replacementProjects': [],
      'replacementEmployees': []
    };

    vm.currentHoliday = vm.currentHolidayDefault;

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    vm.toggleCard = toggleCard;

    vm.querySearchEmployee = querySearchEmployee;
    vm.querySearchProject = querySearchProject;

    vm.saveHoliday = saveHoliday;
    vm.editHoliday = editHoliday;
    vm.removeHoliday = removeHoliday;
    vm.addEmptyInterval = addEmptyInterval;
    vm.addEmptyReplacement = addEmptyReplacement;

    vm.addTeamLeader = addTeamLeader;
    vm.addReplacementProject = addReplacementProject;
    vm.addReplacementEmployee = addReplacementEmployee;

    vm.openForm = openForm;
    vm.closeForm = closeForm;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    $rootScope.$on('event:employeeResourcesLoaded', function (event, employeeResources, employee) {

      vm.employee = employee;
      vm.currentHoliday.employee = employee;
      vm.currentHoliday.employeeId = employee.id;

      setAllProjects(employeeResources.projects);
      setAllEmployees(employeeResources.employees);
      setEployeeHolidays(employeeResources.holidays);
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------


    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveHoliday() {

      console.log('vm.currentHoliday: ', vm.currentHoliday);

      if (!vm.currentHoliday.id) {
        HolidayModel.save(vm.currentHoliday).then(function (data) {

          HolidayModel.getHolidayById(data.id).then(function (data) {

            vm.employee.holidays.push(data);
          }, function (error) {

            console.log('ERROR: get holiday by id error: ', error);
          });
        }, function (error) {

          onSaveError(error);
        });
      } else {
        HolidayModel.update(vm.currentHoliday).then(function (data) {

          var holidayIndex = miscellaneousService.getItemIndex(vm.employee.holidays, data.id);

          vm.employee.holidays[holidayIndex] = data;

          // TODO: sa fac asta mai bine
          setEployeeHolidays(vm.employee.holidays);
          vm.showForm = false;
        }, function (error) {

          console.log('ERROR: holiday update error ', error);
        });
      }
    }

    function addEmptyInterval() {

      vm.currentHoliday.intervals.push(angular.copy(interval));
    }

    function addEmptyReplacement() {

      vm.currentHoliday.replacementProjects.push(angular.copy(replacementProject));
      vm.currentHoliday.replacementEmployees.push(angular.copy(replacementEmployee));
    }

    function openForm() {

      vm.currentHoliday = vm.currentHolidayDefault;

      //  To have the initial interval field
      addEmptyInterval();

      // To have the initial project and employee replacement field
      addEmptyReplacement();

      vm.showForm = true;
    }

    function closeForm() {

      vm.showForm = false;
    }

    // TODO: sa fac mai curat aici daca se poate
    function editHoliday(holiday) {

      var teamLeader = '';
      vm.currentHoliday = holiday;

      if (holiday.teamLeader[0].id) {
        teamLeader = holiday.teamLeader[0].firstName + ' ' + holiday.teamLeader[0].lastName;
      }

      vm.currentHoliday.intervals = vm.currentHoliday.intervals.map(function (item) {

        item.from = new Date(item.from);
        item.to = new Date(item.to);

        return angular.fromJson(item);
      });

      if (holiday.signingDate) {
        holiday.signingDate = new Date(holiday.signingDate);
      }

      if (teamLeader) {
        vm.currentHoliday.teamLeader = teamLeader;
      }

      vm.showForm = true;
    }

    function querySearchEmployee(query) {

      return autocompleteService.querySearch(query, vm.allEmployees);
    }

    function querySearchProject(query) {

      return autocompleteService.querySearch(query, vm.allProjects);
    }

    function removeHoliday(holiday) {

      var holidayToRemove = {
        'id': holiday.id
      };

      HolidayModel.remove(holidayToRemove).then(function () {
        var holidayIndex = miscellaneousService.getItemIndex(vm.employee.holidays, holiday.id);
        vm.employee.holidays.splice(holidayIndex, 1);
      }, function (error) {
        console.log('Failed to delete holiday: ', error);
      });
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function setAllProjects(projects) {

      vm.allProjects = projects;
      return autocompleteService.buildList(vm.allProjects, ['name']);
    }

    function setAllEmployees(employees) {

      vm.allEmployees = employees;
      return autocompleteService.buildList(vm.allEmployees, ['firstName', 'lastName']);
    }

    // TODO: treaba cu conversia datelor ar trebui sa o fac intr-un
    // singur loc si sa o refolosesc.
    // e prea mult cod in momentul de fata;
    function setEployeeHolidays(holidays) {

      var index = 0;
      var arrayLength = 0;

      vm.employee.holidays = holidays.filter(function (item) {
        if (item.employeeId === vm.employee.id) {
          return item;
        }
      });

      arrayLength = vm.employee.holidays.length;

      if (vm.employee.holidays.length > 0) {
        for (index; index < arrayLength; index++) {
          vm.employee.holidays[index].intervals = vm.employee.holidays[index].intervals.map(convertIntervalToDate);
        }
      }
    }

    // TODO: De folosit functia asta prin mai multe locuri,
    // din baza de date imi vine un json, sau string chiar.
    // Mie imi trebuie sa convertesc in obiect
    // De vazut daca as putea sa salvez obiect si sa primesc tot obiect
    // TODO: de investigat
    function convertIntervalToDate(intervalString) {

      var item = angular.fromJson(intervalString);
      item.from = new Date(item.from);
      item.to = new Date(item.to);

      return item;
    }

    function addTeamLeader(item) {

      vm.currentHoliday.teamLeader = item;
    }

    function addReplacementProject(item, index) {

      vm.currentHoliday.replacementProjects[index] = item;
    }

    function addReplacementEmployee(item, index) {

      vm.currentHoliday.replacementEmployees[index] = item;
    }

    function onSaveSuccess(action, holiday) {

      $rootScope.$broadcast('holidaysListChanged', [action, holiday]);
    }

    function onSaveError(message) {

      vm.serverErrorsArray = message;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeSkillsController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeHolidayPreviewController', employeeHolidayPreviewController);

  employeeHolidayPreviewController.$inject = ['HolidayModel', '$state', '$window'];

  function employeeHolidayPreviewController(HolidayModel, $state, $window) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    var holidayIndex = $state.params.holidayIndex;
    vm.employeeId = $state.params.id;
    vm.holidays = null;

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.print = print;

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    getHoliday();

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function print() {

      var content = document.getElementsByClassName('js-holiday-preview')[0].innerHTML;
      var popupWin = window.open('', '_blank');

      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" href="/styles/importer.css"><style>' + '#print-hide {display: none !important;}' + '.ng-hide { display: none !important; }' + '</style></head><body onload="window.print(); window.close();">' + content + '</body></html>');

      popupWin.document.close();
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function getHoliday() {

      HolidayModel.getHolidayById(holidayIndex).then(function (data) {

        vm.holiday = data;

        vm.holiday.intervals = vm.holiday.intervals.map(function (item) {

          item = angular.fromJson(item);
          item.from = new Date(item.from);
          item.to = new Date(item.to);

          return item;
        });
      }, function (error) {

        console.log('ERROR: ', error);
      });
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @emplyeeGeneralInfoCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('hraJobsCtrl', hraJobsCtrl);

  hraJobsCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'Employee', 'Equipments', 'skillModel'];

  function hraJobsCtrl($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, Employee, Equipments, skillModel) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    var techIndex = 0;
    vm.serverErrors = false;
    vm.disabledJob = true;
    vm.createJob = [];
    vm.jobs = [];
    vm.acc = [];
    vm.copyCat = [];

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.saveEmployee = saveEmployee;
    vm.clearFields = clearFields;
    vm.cancelAdd = cancelAdd;
    vm.generalInfoShowHide = generalInfoShowHide;
    vm.addJobs = addJobs;
    vm.removeJob = removeJob;
    vm.querySearchTech = querySearchTech;
    vm.addTech = addTech;
    vm.addTechnology = addTechnology;
    vm.removeTechnology = removeTechnology;
    vm.toggleCard = toggleCard;

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      updateJobs();
    });

    $rootScope.$on('event:employeeResourcesLoaded', function (event, employeeResources) {
      setAllSkills(employeeResources.skills);
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveEmployee(employee) {
      fill(employee);
      vm.disabledJob = true;
      vm.copyCat = angular.copy(vm.createJob);
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    function clearFields() {
      vm.employee = {};
    }

    function cancelAdd() {
      vm.disabledJob = true;
      for (var i = vm.copyCat.length; i < vm.createJob.length; i++) {
        vm.createJob[i] = "";
        vm.acc[i] = "";
      }
      vm.createJob = _.initial(vm.createJob, vm.createJob.length - vm.copyCat.length);
    }

    function updateJobs() {
      if (vm.employee.jobDetail !== null && vm.employee.jobDetail !== undefined && vm.employee.jobDetail !== '') {
        if (vm.employee.jobDetail.length > 0) {
          for (var j = 0; j < vm.employee.jobDetail.length; j++) {
            vm.createJob.push(angular.fromJson(vm.employee.jobDetail[j]));
          }
        } else if (vm.employee.jobDetail.length === 0) {
          return;
        } else {
          vm.createJob.push(angular.fromJson(vm.employee.jobDetail));
        }
        vm.copyCat = angular.copy(vm.createJob);
        for (var i = 0; i < vm.createJob.length; i++) {
          vm.createJob[i].name = vm.createJob[i] ? vm.createJob[i].name : '';
          vm.createJob[i].emplName = vm.createJob[i] ? vm.createJob[i].emplName : '';
          vm.createJob[i].startDate = vm.createJob[i] ? new Date(vm.createJob[i].startDate) : '';
          vm.createJob[i].endDate = vm.createJob[i] ? new Date(vm.createJob[i].endDate) : '';
          vm.createJob[i].description = vm.createJob[i] ? vm.createJob[i].description : '';
          vm.acc[i] = vm.createJob[i] ? vm.createJob[i].technologies : '';
        }
      }
    }

    function addJobs() {
      techIndex = 0;
      vm.createJob.push({});
      if (vm.createJob.length === 0) {
        vm.createJob.push([]);
      }
    }

    function removeJob(index) {
      vm.createJob.splice(index, 1);
    }

    function fill(employee) {
      vm.jobs = [];
      for (var j = 0; j < vm.createJob.length; j++) {
        vm.jobs.push({
          name: vm.createJob[j].name,
          emplName: vm.createJob[j].emplName,
          startDate: vm.createJob[j].startDate,
          endDate: vm.createJob[j].endDate,
          description: vm.createJob[j].description,
          technologies: vm.acc[j]
        });
      }

      vm.employee.jobDetail = angular.toJson(vm.jobs);
      vm.employee.equipments = vm.employee.equipments;

      employee = vm.employee;

      return employee;
    }

    function setAllSkills(skills) {
      vm.allSkills = skills;
      return autocompleteService.buildList(vm.allSkills, ['name']);
    }

    function querySearchTech(query) {
      return autocompleteService.querySearch(query, vm.allSkills);
    }

    function addTechnology(indP) {
      if (!vm.acc[indP]) {
        vm.acc[indP] = [];
        vm.acc[indP][techIndex] = "";
      } else {
        techIndex = vm.acc[indP].length;
        vm.acc[indP][techIndex] = "";
      }
    }

    function addTech(item, employee, index) {
      // console.log(item);
      techIndex = index;
      return;
    }

    function removeTechnology(jobIndex, index) {
      vm.acc[jobIndex].splice(index, 1);
    }

    function generalInfoShowHide(data) {
      if (data === 'job') {
        vm.disabledJob = false;
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @EempoloyeeJsonModal
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('empoloyeeJsonModal', empoloyeeJsonModal);

  empoloyeeJsonModal.$inject = ['$mdDialog', '$rootScope', 'Employee'];

  function empoloyeeJsonModal($mdDialog, $rootScope, Employee) {

    // ----------------------------------------------------------------------
    //   @VARIABLES
    // ----------------------------------------------------------------------


    var vm = this;

    // ----------------------------------------------------------------------
    //   @PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.saveFromJson = saveFromJson;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;

    // ----------------------------------------------------------------------
    //   @PUBLIC METHODS DECLARATIONS
    // ----------------------------------------------------------------------

    function saveFromJson(json) {
      if (json) {
        json = angular.fromJson(json);

        Employee.savefromJson(json).then(function (data) {
          $rootScope.$broadcast('employeesListChanged', ['saveFromJson', data]);
          $rootScope.showToast('Successfully added employees from json!');
        }, function (error) {});
      } else {
        console.log('Empty json!');
      }
    }

    function clearFields() {
      vm.json = '';
    }

    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // emplyeeGeneralInfoCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('hraLanguageCtrl', hraLanguageCtrl);

  hraLanguageCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$mdToast', '$mdDialog', 'Upload', 'autocompleteService', 'miscellaneousService', 'Employee'];

  function hraLanguageCtrl($rootScope, $scope, $timeout, $mdToast, $mdDialog, Upload, autocompleteService, miscellaneousService, Employee) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    var vm = this;
    vm.serverErrors = false;
    vm.disabledLanguagesis = true;
    vm.createLanguage = [];
    vm.selLevel = [];
    vm.newJob = [];
    vm.selectedLevel = {};
    vm.selectedLevel = [];
    /* beautify preserve:end */

    vm.levels = ["Elementary proficiency", "Limited working proficiency", "Professional working proficiency", "Full professional proficiency", "Native or bilingual proficiency"];

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ------------------------------------------------------------------------

    /* beautify preserve:start */
    vm.saveEmployee = saveEmployee;
    vm.clearFields = clearFields;
    vm.cancelAdd = cancelAdd;
    vm.querySearchLanguage = querySearchLanguage;
    vm.generalInfoShowHide = generalInfoShowHide;
    vm.getSelectedText = getSelectedText;
    vm.addNewLanguage = addNewLanguage;
    vm.removeLanguage = removeLanguage;
    vm.searchLanguage = [];
    vm.copyCat = [];
    vm.toggleCard = toggleCard;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      getLanguages();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveEmployee(employee) {

      fill(employee);
      vm.disabledLanguagesis = true;
      vm.copyCat = angular.copy(vm.createLanguage);
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    function clearFields() {

      vm.employee = {};
    }

    function cancelAdd() {

      vm.disabledLanguagesis = true;
      for (var i = vm.copyCat.length; i < vm.createLanguage.length; i++) {
        vm.createLanguage[i].language = "";
        vm.createLanguage[i].level = "Proficiency...";
      }
      vm.createLanguage = _.initial(vm.createLanguage, vm.createLanguage.length - vm.copyCat.length);
    }

    function querySearchLanguage(query) {

      return autocompleteService.querySearch(query, vm.languages);
    }

    function getLanguages() {

      Employee.getLanguages().then(function (data) {
        vm.languages = data;
        updateAutocompleteLang();
        return autocompleteService.buildList(vm.languages, ['name']);
      }, function (error) {
        $rootScope.showToast('Something gone wrong:', error);
      });
    }

    function updateAutocompleteLang() {

      if (vm.employee.languages !== null && vm.employee.languages !== undefined && vm.employee.languages !== '') {
        vm.createLanguage = angular.fromJson(vm.employee.languages);
        vm.copyCat = angular.copy(vm.createLanguage);
      }
    }

    function removeLanguage(index) {

      vm.createLanguage.splice(index, 1);
    }

    function getSelectedText(data) {

      if (data !== undefined) {
        return data;
      } else {
        return "Proficiency...";
      }
    }

    function addNewLanguage() {

      if (!vm.createLanguage) {
        vm.createLanguage = [];
      }
      vm.createLanguage.push({});
    }

    function fill(employee) {

      var lang = [];
      var i = 0;
      for (i; i < vm.createLanguage.length; i++) {
        lang.push({
          language: vm.createLanguage[i].language,
          level: vm.createLanguage[i].level
        });
      }

      vm.employee.languages = angular.toJson(lang);
      vm.employee.equipments = vm.employee.equipments;
      employee = vm.employee;
      return employee;
    }

    function generalInfoShowHide(data) {

      if (data === 'languages') {
        vm.disabledLanguagesis = false;
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  //   @empoloyeeModal
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('empoloyeeModal', empoloyeeModal);

  empoloyeeModal.$inject = ['$mdDialog', 'data'];

  function empoloyeeModal($mdDialog, data) {

    // ----------------------------------------------------------------------
    //   @VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;

    vm.employees = data.employees;
    vm.employee = angular.copy(data.employee);
    vm.employeeIndex = data.employeeIndex;
    vm.candidate = data.candidate;

    if (data.employeeIndex >= 0) {
      vm.formTitle = 'Edit Form';
    } else {
      vm.formTitle = 'Create Form';
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeObservationsController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeObservationsController', employeeObservationsController);

  employeeObservationsController.$inject = ['$rootScope', '$scope'];

  function employeeObservationsController($rootScope, $scope) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.disableObservations = true;

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    vm.saveEmployee = saveEmployee;
    vm.cancelAdd = cancelAdd;
    vm.clearFields = clearFields;
    vm.toggleCard = toggleCard;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveEmployee(employee) {

      vm.disableObservations = true;
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    function clearFields() {

      vm.employee = {};
    }

    function cancelAdd() {

      vm.disableObservations = true;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // @WORK IN PROGRESS
  // Am inceput refactory aici dar nu am mai termina

  // ------------------------------------------------------------------------
  // @employeeProjectController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeProjectController', employeeProjectController);

  employeeProjectController.$inject = ['$rootScope', '$scope', '$stateParams', 'ProjectModel', 'Employee', 'autocompleteService', 'miscellaneousService', '$location', '$log'];

  function employeeProjectController($rootScope, $scope, $stateParams, ProjectModel, Employee, autocompleteService, miscellaneousService, $location, $log) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    var techIndex = 0;

    vm.isNewProject = null; // If true we are adding a new project to the list
    vm.showForm = false;
    vm.disabledProjects = true;
    vm.projectIncrement = [];
    vm.techIncrement = [];
    vm.searchedProject = ''; // this should be string for autocomplete to work
    vm.searchTech = [];
    vm.allProjects = [];
    vm.projectDate = [];
    vm.project = [];
    vm.techs = [];
    vm.acc = [];
    vm.copyCat = [];
    vm.allTech = [];
    vm.selectedProject = '';

    vm.projectIntervalDefault = {
      'from': null,
      'to': null,
      'technologies': null
    };

    vm.currentProjectDefault = {
      id: null,
      projectDates: null
    };

    vm.currentProject = angular.copy(vm.currentProjectDefault);
    vm.currentProject.projectDates = angular.copy(vm.projectIntervalDefault);

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.addEmptyProject = addEmptyProject;
    vm.selectedProjectChanged = selectedProjectChanged;

    vm.editProject = editProject;

    vm.addNewTechnology = addNewTechnology;
    vm.querySearchProject = querySearchProject;
    vm.querySearchTech = querySearchTech;
    vm.addEmptyTechnology = addEmptyTechnology;
    vm.toggleCard = toggleCard;
    vm.saveProjectToEmployee = saveProjectToEmployee;

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    $rootScope.$on('event:employeeResourcesLoaded', function (event, employeeResources, employee) {

      vm.employee = employee;
      setAllProjects(employeeResources.projects);
      setAllSkills(employeeResources.skills);
    });

    $rootScope.$on('event:employeeDetailsUpdated', function (event, employee) {

      debugger;
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function addEmptyProject() {

      vm.isNewProject = true;
      vm.showForm = true;
    }

    function editProject(project) {

      vm.searchedProject = project.name;
      vm.currentProject = project;
      vm.showForm = true;
      vm.isNewProject = false;
    }

    function selectedProjectChanged(project) {

      if (vm.isNewProject) {
        vm.currentProject = project;
      }
    }

    function saveProjectToEmployee(currentProject) {

      var employeeToUpdate = angular.copy(vm.employee);

      if (vm.isNewProject) {
        employeeToUpdate.projects.push(currentProject);
      }

      $rootScope.$emit("callSaveMethodCards", employeeToUpdate);

      // saveEmployee(vm.employee);
    }

    function addNewTech(indP) {
      if (!vm.acc[indP]) {
        vm.acc[indP] = [];
        vm.acc[indP][techIndex] = "";
      } else {
        techIndex = vm.acc[indP].length;
        vm.acc[indP][techIndex] = "";
      }
    }

    // function changeProjectView() {
    //   vm.disabledProjects = false;
    // }

    function querySearchProject(query) {
      return autocompleteService.querySearch(query, vm.allProjects);
    }

    function querySearchTech(query) {
      return autocompleteService.querySearch(query, vm.allTechnologies);
    }

    function saveEmployee(employee) {

      $rootScope.$emit("callSaveMethodCards", employee);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function setAllProjects(projects) {
      vm.allProjects = projects;

      return autocompleteService.buildList(vm.allProjects, ['name']);
    }

    function setAllSkills(technologies) {

      vm.allTechnologies = technologies;
    }

    function addNewTechnology(technology, index) {

      vm.currentProject.projectDates[index] = technology;
    }

    function addEmptyTechnology(index) {
      vm.currentProject.projectDates[index] = {};
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @emplyeeGeneralInfoCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('hraScheduleCtrl', hraScheduleCtrl);

  hraScheduleCtrl.$inject = ['$rootScope', '$scope'];

  function hraScheduleCtrl($rootScope, $scope) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.serverErrors = false;
    vm.disabledSchedule = true;
    vm.newJob = [];
    vm.selectedSchedualeMonday = [];
    vm.selectedSchedualeTuesday = [];
    vm.selectedSchedualeWednesday = [];
    vm.selectedSchedualeThursday = [];
    vm.selectedSchedualeFriday = [];
    vm.selection = true;
    vm.copyCatMonday = [];
    vm.copyCatTuesday = [];
    vm.copyCatWednesday = [];
    vm.copyCatThursday = [];
    vm.copyCatFriday = [];
    vm.scheduale = [{
      hours: "09:00 - 10:00"
    }, {
      hours: "10:00 - 11:00"
    }, {
      hours: "11:00 - 12:00"
    }, {
      hours: "12:00 - 12:30"
    }, {
      hours: "12:30 - 13:30 (lunch)"
    }, {
      hours: "13:30 - 14:00"
    }, {
      hours: "14:00 - 15:00"
    }, {
      hours: "15:00 - 16:00"
    }, {
      hours: "16:00 - 17:00"
    }, {
      hours: "17:00 - 18:00"
    }];

    // ----------------------------------------------------------------------
    //  EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    /* beautify preserve:start */
    vm.saveEmployee = saveEmployee;
    vm.clearFields = clearFields;
    vm.cancelAdd = cancelAdd;
    vm.generalInfoShowHide = generalInfoShowHide;
    vm.toggleScheduale = toggleScheduale;
    vm.existsScheduale = existsScheduale;
    vm.toggleCard = toggleCard;
    /* beautify preserve:end */

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      updateSchaduale();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {

      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function saveEmployee(employee) {

      fill(employee);
      vm.disabledSchedule = true;
      vm.copyCatMonday = angular.copy(vm.selectedSchedualeMonday);
      vm.copyCatTuesday = angular.copy(vm.selectedSchedualeTuesday);
      vm.copyCatWednesday = angular.copy(vm.selectedSchedualeWednesday);
      vm.copyCatThursday = angular.copy(vm.selectedSchedualeThursday);
      vm.copyCatFriday = angular.copy(vm.selectedSchedualeFriday);
      disableHours();
      $rootScope.$emit("callSaveMethodCards", employee);
    }

    $(".monday").bind("mousedown", function (e) {
      e.metaKey = true;
    }).selectable();
    $(".tuesday").bind("mousedown", function (e) {
      e.metaKey = true;
    }).selectable();
    $(".wednesday").bind("mousedown", function (e) {
      e.metaKey = true;
    }).selectable();
    $(".thursday").bind("mousedown", function (e) {
      e.metaKey = true;
    }).selectable();
    $(".friday").bind("mousedown", function (e) {
      e.metaKey = true;
    }).selectable();
    disableHours();

    function clearFields() {

      vm.employee = {};
    }

    function disableHours() {

      $(".monday").selectable({
        disabled: true
      });
      $(".tuesday").selectable({
        disabled: true
      });
      $(".wednesday").selectable({
        disabled: true
      });
      $(".thursday").selectable({
        disabled: true
      });
      $(".friday").selectable({
        disabled: true
      });
    }

    function cancelAdd() {

      vm.disabledSchedule = true;
      disableHours();

      for (var j = 0; j < vm.selectedSchedualeMonday.length; j++) {
        $(".monday").find('li').each(function () {
          $(this).removeClass('ui-selected');
        });
      }

      for (var j = 0; j < vm.selectedSchedualeTuesday.length; j++) {
        $(".tuesday").find('li').each(function () {
          $(this).removeClass('ui-selected');
        });
      }

      for (var j = 0; j < vm.selectedSchedualeWednesday.length; j++) {
        $(".wednesday").find('li').each(function () {
          $(this).removeClass('ui-selected');
        });
      }

      for (var j = 0; j < vm.selectedSchedualeThursday.length; j++) {
        $(".thursday").find('li').each(function () {
          $(this).removeClass('ui-selected');
        });
      }

      for (var j = 0; j < vm.selectedSchedualeFriday.length; j++) {
        $(".friday").find('li').each(function () {
          $(this).removeClass('ui-selected');
        });
      }

      for (var j = 0; j < vm.copyCatMonday.length; j++) {
        $(".monday").find('li').each(function () {
          if ($(this).text() === vm.copyCatMonday[j].hours) {
            $(this).addClass('ui-selected');
          }
        });
      }
      for (var k = 0; k < vm.copyCatTuesday.length; k++) {
        $(".tuesday").find('li').each(function () {
          if ($(this).text() === vm.copyCatTuesday[k].hours) {
            $(this).addClass('ui-selected');
          }
        });
      }
      for (var l = 0; l < vm.copyCatWednesday.length; l++) {
        $(".wednesday").find('li').each(function () {
          if ($(this).text() === vm.copyCatWednesday[l].hours) {
            $(this).addClass('ui-selected');
          }
        });
      }
      for (var m = 0; m < vm.copyCatThursday.length; m++) {
        $(".thursday").find('li').each(function () {
          if ($(this).text() === vm.copyCatThursday[m].hours) {
            $(this).addClass('ui-selected');
          }
        });
      }
      for (var n = 0; n < vm.copyCatFriday.length; n++) {
        $(".friday").find('li').each(function () {
          if ($(this).text() === vm.copyCatFriday[n].hours) {
            $(this).addClass('ui-selected');
          }
        });
      }
    }

    function toggleScheduale(item, list) {

      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    }

    function existsScheduale(item, list) {

      return list.indexOf(item) > -1;
    }

    function updateSchaduale() {

      if (vm.employee.schedule !== "" && vm.employee.schedule !== undefined && vm.employee.schedule !== null) {
        vm.selectedSchedualeMonday = vm.employee.schedule.monday;
        vm.selectedSchedualeTuesday = vm.employee.schedule.tuesday;
        vm.selectedSchedualeWednesday = vm.employee.schedule.wednesday;
        vm.selectedSchedualeThursday = vm.employee.schedule.thursday;
        vm.selectedSchedualeFriday = vm.employee.schedule.friday;

        vm.copyCatMonday = angular.copy(vm.selectedSchedualeMonday);
        vm.copyCatTuesday = angular.copy(vm.selectedSchedualeTuesday);
        vm.copyCatWednesday = angular.copy(vm.selectedSchedualeWednesday);
        vm.copyCatThursday = angular.copy(vm.selectedSchedualeThursday);
        vm.copyCatFriday = angular.copy(vm.selectedSchedualeFriday);

        for (var j = 0; j < vm.selectedSchedualeMonday.length; j++) {
          $(".monday").find('li').each(function () {
            if ($(this).text() === vm.selectedSchedualeMonday[j].hours) {
              $(this).addClass('ui-selected');
            }
          });
        }
        for (var k = 0; k < vm.selectedSchedualeTuesday.length; k++) {
          $(".tuesday").find('li').each(function () {
            if ($(this).text() === vm.selectedSchedualeTuesday[k].hours) {
              $(this).addClass('ui-selected');
            }
          });
        }
        for (var l = 0; l < vm.selectedSchedualeWednesday.length; l++) {
          $(".wednesday").find('li').each(function () {
            if ($(this).text() === vm.selectedSchedualeWednesday[l].hours) {
              $(this).addClass('ui-selected');
            }
          });
        }
        for (var m = 0; m < vm.selectedSchedualeThursday.length; m++) {
          $(".thursday").find('li').each(function () {
            if ($(this).text() === vm.selectedSchedualeThursday[m].hours) {
              $(this).addClass('ui-selected');
            }
          });
        }
        for (var n = 0; n < vm.selectedSchedualeFriday.length; n++) {
          $(".friday").find('li').each(function () {
            if ($(this).text() === vm.selectedSchedualeFriday[n].hours) {
              $(this).addClass('ui-selected');
            }
          });
        }
      }
    }

    function fill(employee) {

      vm.employee.schedule = {
        "monday": vm.selectedSchedualeMonday,
        "tuesday": vm.selectedSchedualeTuesday,
        "wednesday": vm.selectedSchedualeWednesday,
        "thursday": vm.selectedSchedualeThursday,
        "friday": vm.selectedSchedualeFriday
      };

      if (vm.employee.equipments.length === 0) {
        vm.employee.equipments.length = 0;
      } else {
        vm.employee.equipments = vm.employee.equipments;
      }

      employee = vm.employee;
      return employee;
    }

    function generalInfoShowHide(data) {

      if (data === 'schedule') {

        vm.disabledSchedule = false;

        $(".monday").selectable({
          disabled: false
        });
        $(".tuesday").selectable({
          disabled: false
        });
        $(".wednesday").selectable({
          disabled: false
        });
        $(".thursday").selectable({
          disabled: false
        });
        $(".friday").selectable({
          disabled: false
        });
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeSkillsController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeSkillsController', employeeSkillsController);

  employeeSkillsController.$inject = ['$rootScope', '$scope', '$stateParams', 'skillModel', 'Employee', 'autocompleteService', 'miscellaneousService'];

  function employeeSkillsController($rootScope, $scope, $stateParams, skillModel, Employee, autocompleteService, miscellaneousService) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.disabledSkills = true;
    vm.skillLevel = [];
    vm.increment = [];
    vm.skillLevels = ["Junior", "Junior-Mid", "Mid", "Mid-Senior", "Senior"];
    vm.skillTypes = ["Main", "Secondary"];
    vm.searchSkill = [];
    vm.selectedSkillLevel = [];
    vm.skillType = [];
    vm.copyCat = [];
    vm.selectedSkillTypess = [];

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('event:employeeIsLoaded', function (event, employee) {
      vm.employee = employee;
    });

    $rootScope.$on('event:employeeResourcesLoaded', function (event, employeeResources) {
      setAllSkills(employeeResources.skills);
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // EXPOSED PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.selectedSkill = selectedSkill;
    vm.addNewSkill = addNewSkill;
    vm.changeView = changeView;
    vm.querySearch = querySearch;
    vm.addSkill = addSkill;
    vm.removeSkill = removeSkill;
    vm.saveEmployee = saveEmployee;
    vm.selectedSkillType = selectedSkillType;
    vm.skillFilter = skillFilter;
    vm.cancelAdd = cancelAdd;
    vm.toggleCard = toggleCard;

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function toggleCard(event, action) {
      // debugger;
      var card = angular.element(event.currentTarget).closest('.js-employee-card');

      $rootScope.$emit("event:toggleCard", card, action);
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.allSkills);
    }

    function addSkill(item, employee, index) {
      var skillIndex = '';
      if (item) {
        skillIndex = miscellaneousService.getItemIndex(vm.allSkills, item.id);
        vm.allSkills.splice(skillIndex, 1);
        vm.increment[index] = item;
      } else {
        return;
      }
    }

    function removeSkill(index, item, employee) {
      vm.increment.splice(index, 1);
      vm.selectedSkillTypess.splice(index, 1);
      vm.selectedSkillLevel.splice(index, 1);
      vm.searchSkill.length = 0;
      for (var i = 0; i < vm.increment.length; i++) {
        vm.searchSkill[i] = vm.increment[i] ? vm.increment[i].label : '';
      }
    }

    function saveEmployee(employee) {
      fill(employee);
      vm.disabledSkills = true;
      vm.copyCat = angular.copy(vm.increment);
      $rootScope.$emit("callSaveMethodCards", employee);
      // getSkills();
      updateSkills();
    }

    function changeView() {
      vm.disabledSkills = false;
      updateSkills();
    }

    function addNewSkill() {
      vm.increment.push({});
      vm.selectedSkillTypess.push('Main');
    }

    function selectedSkill(data, employee, index) {
      if (data !== undefined) {
        vm.skillLevel[index] = data;
        return data;
      } else {
        return "Skill level";
      }
    }

    function selectedSkillType(data, employee, index) {
      if (data !== undefined) {
        vm.skillType[index] = data;
        return data;
      } else {
        return "Skill type";
      }
    }

    function skillFilter(item) {
      return vm.selectedSkillTypess === "Main";
    }

    function cancelAdd() {
      vm.disabledSkills = true;
      for (var i = vm.copyCat.length; i < vm.increment.length; i++) {
        vm.selectedSkillLevel[i] = "Please select your level";
        vm.selectedSkillTypess[i] = "Please select a type";
        vm.searchSkill[i] = "";
      }
      vm.increment = _.initial(vm.increment, vm.increment.length - vm.copyCat.length);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function fill(employee) {
      vm.employee.skills = vm.increment;
      vm.employee.skillsLevel = vm.selectedSkillLevel;
      vm.employee.skillsType = vm.skillType;
      vm.employee.equipments = vm.employee.equipments;
      employee.skills = vm.employee.skills;
      employee.skillsLevel = vm.employee.skillsLevel;
      employee.skillsType = vm.employee.skillsType;
      employee = vm.employee;
      return employee;
    }

    function setAllSkills(skills) {
      vm.allSkills = skills;
      updateSkills();
      updateAutocompleteSkills(vm.allSkills);
      return autocompleteService.buildList(vm.allSkills, ['name']);
    }

    function updateAutocompleteSkills(allSkills) {
      var index = 0;
      var indexSkillToRemove = '';
      for (index; index < vm.employee.skills.length; index++) {
        indexSkillToRemove = miscellaneousService.getItemIndex(allSkills, vm.employee.skills[index].id);
        allSkills.splice(indexSkillToRemove, 1);
      }
    }

    function updateSkills() {
      vm.text = [];
      if (vm.employee.skills !== null && vm.employee.skills !== undefined && vm.employee.skills !== '' && vm.employee.skillsType !== null) {
        vm.increment = [];
        vm.increment = vm.employee.skills;
        vm.copyCat = angular.copy(vm.increment);
        for (var i = 0; i < vm.increment.length; i++) {
          vm.searchSkill[i] = vm.increment[i] ? vm.increment[i].label : '';
          vm.selectedSkillLevel[i] = vm.employee.skillsLevel[i] ? parseInt(vm.employee.skillsLevel[i], 10) : '';
          vm.selectedSkillTypess[i] = vm.employee.skillsType[i] ? vm.employee.skillsType[i] : '';
          vm.text[i] = getleveltext(vm.selectedSkillLevel[i].toString());
        }
      } else {}
    }

    function getleveltext(data) {
      switch (data) {
        case '1':
          return "Junior";
          break;
        case '2':
          return "Junior";
          break;
        case '3':
          return "Junior-Mid";
          break;
        case '4':
          return "Junior-Mid";
          break;
        case '5':
          return "Mid";
          break;
        case '6':
          return "Mid";
          break;
        case '7':
          return "Mid-Senior";
          break;
        case '8':
          return "Mid-Senior";
          break;
        case '9':
          return "Senior";
          break;
        case '10':
          return "Senior";
          break;
        default:
          return "Please select your experience level";
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeesCtrl
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeesCtrl', employeesCtrl);

  employeesCtrl.$inject = ['$rootScope', '$scope', '$mdDialog', 'autocompleteService', 'miscellaneousService', 'skillModel', 'Employee', 'ProjectModel', '$templateCache'];

  function employeesCtrl($rootScope, $scope, $mdDialog, autocompleteService, miscellaneousService, skillModel, Employee, ProjectModel, $templateCache) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    var final = [];
    var date = new Date();
    var filtru = [];
    vm.reset = reset;
    vm.ids = [];
    vm.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    vm.positionTitles = ["Senior Developer", "Middle Developer", "Junior Developer", "Head of Front-end Development", "Head of Education", "Head of Microsoft Technologies", "Project Manager", "Head of QA & Testing"];
    vm.candidatesPositionTitle = ["Javascript Developer", "Front End Engineer", "Java Developer", "QA Engineer", "3D Designer", "Software Engineer", "Android Developer", "C# Developer", "iOS Developer", "Other Positions"];
    vm.searchBySkills = false;
    vm.emplCopy = [];
    vm.createArraySkills = [];
    vm.monthSelection = [];
    vm.dateList = [];
    vm.showFilters = false;
    vm.searchBySkills = false;
    vm.emplCopy = [];
    vm.createArraySkills = [];
    vm.arraySkill = [];
    vm.arrayProject = [];
    vm.arrayLanguage = [];
    vm.skillLevels = ["Junior", "Junior-Mid", "Mid", "Mid-Senior", "Senior"];
    vm.manager = ["Manager"];
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'firstName',
        filter: '',
        limit: 10,
        page: 1
      },
      "limitOptions": [10, 15, 20],
      selected: []
    };
    if (vm.candidate) {
      vm.addTitle = "Add candidate";
    } else {
      vm.addTitle = "Add employee";
    }

    // ----------------------------------------------------------------------
    // Public methods
    // ----------------------------------------------------------------------

    vm.querySearch = querySearch;
    vm.showFormDialog = showFormDialog;
    vm.showFormJsonDialog = showFormJsonDialog;
    vm.deleteConfirm = deleteConfirm;
    vm.multipleDelete = multipleDelete;
    vm.querySearchSkills = querySearchSkills;
    vm.selectedSkillChange = selectedSkillChange;
    vm.querySearchProjects = querySearchProjects;
    vm.selectedProjectChange = selectedProjectChange;
    vm.querySearchLanguage = querySearchLanguage;
    vm.selectedLanguageChange = selectedLanguageChange;
    vm.selectedSkillLeve = selectedSkillLeve;
    vm.selectedMonthDate = selectedMonthDate;
    vm.searchFilter = searchFilter;
    vm.searchPeriodFilter = searchPeriodFilter;
    vm.toggleFilters = toggleFilters;
    vm.selectedManagerPr = selectedManagerPr;
    vm.getHeader = getHeader;
    vm.getArray = getArray;
    vm.removeSearchProject = removeSearchProject;
    vm.removeSearchSkills = removeSearchSkills;
    vm.removeSearchLanguage = removeSearchLanguage;
    vm.sendToEmployee = sendToEmployee;
    vm.searchBirthdayFilter = searchBirthdayFilter;
    vm.clearBirthdayFilter = clearBirthdayFilter;
    vm.selectedPositionTitle = selectedPositionTitle;
    vm.clearPositionTitle = clearPositionTitle;
    vm.changeSkillLevelFilter = changeSkillLevelFilter;
    vm.selectedbirthdayMonth = selectedbirthdayMonth;
    // vm.searchSkillChange = searchSkillChange;
    // vm.searchSkills = searchSkills;


    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODS
    // ----------------------------------------------------------------------

    getEmployees();
    getSkills();
    getProjects();
    getLanguages();

    // ----------------------------------------------------------------------
    // Public methods declaration
    // ----------------------------------------------------------------------

    function showFormDialog(event, employees, employee) {
      event.stopPropagation();
      if (!employee) {
        employee = new Employee({});
      }
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'employeeForm.tmpl.html',
        controller: 'empoloyeeModal as empoloyeeM',
        targetEvent: event,
        clickOutsideToClose: true,
        data: {
          employee: employee,
          candidate: vm.candidate
        }
      });
    }

    function getHeader() {
      return ["First Name", "Last Name", "Email", "Phone", "Skills", "Languages", "Equipments", "Projects", "Jobs", "Date of Employment", "Address", "Urgent Contact Name", "Urgent Contact Phone", "Education", "Courses"];
    }

    function getArray() {
      var temporary = [];
      for (var i = 0; i < vm.employees.length; i++) {
        var skills = [];
        var languages = [];
        var equipments = [];
        var projects = [];
        var job = [];
        var date = [];
        var adress = [];
        var contactName = [];
        var contactNumber = [];
        var education = [];
        var courses = [];
        if (vm.employees[i].skills) {
          for (var j = 0; j < vm.employees[i].skills.length; j++) {
            skills.push(vm.employees[i].skills[j].label);
          }
        }
        if (vm.employees[i].languages) {
          for (var l = 0; l < vm.employees[i].languages.length; l++) {
            languages.push(vm.employees[i].languages[l].language);
          }
        }
        if (vm.employees[i].equipments) {
          for (var e = 0; e < vm.employees[i].equipments.length; e++) {
            equipments.push(vm.employees[i].equipments[e].name);
          }
        }
        if (vm.employees[i].projects) {
          for (var p = 0; p < vm.employees[i].projects.length; p++) {
            projects.push(vm.employees[i].projects[p].name);
          }
        }
        if (vm.employees[i].jobDetail) {
          for (var jb = 0; jb < vm.employees[i].jobDetail.length; jb++) {
            job.push(vm.employees[i].jobDetail[jb].name);
          }
        }
        if (vm.employees[i].dateOfEmployment) {
          for (var d = 0; d < vm.employees[i].dateOfEmployment.length; d++) {
            date.push(vm.employees[i].dateOfEmployment[d]);
          }
        }
        if (vm.employees[i].address) {
          for (var a = 0; a < vm.employees[i].address.length; a++) {
            adress.push(vm.employees[i].address[a].adresa);
          }
        }
        if (vm.employees[i].urgentContact) {
          for (var c = 0; c < vm.employees[i].urgentContact.length; c++) {
            contactName.push(vm.employees[i].urgentContact[c].ContactName);
            contactNumber.push(vm.employees[i].urgentContact[c].Contact);
          }
        }
        if (vm.employees[i].education) {
          for (var ed = 0; ed < vm.employees[i].education.length; ed++) {
            education.push(vm.employees[i].education[ed].school);
          }
        }
        if (vm.employees[i].coursesAndCertifications) {
          for (var co = 0; co < vm.employees[i].coursesAndCertifications.length; co++) {
            courses.push(vm.employees[i].coursesAndCertifications[co].title);
          }
        }
        temporary.push({
          firstName: vm.employees[i].firstName,
          lastName: vm.employees[i].lastName,
          email: vm.employees[i].emailAssist,
          phone: vm.employees[i].phone,
          skills: skills.join(),
          languages: languages.join(),
          equipments: equipments.join(),
          projects: projects.join(),
          jobs: job.join(),
          dateOfEmployment: date.join("").slice(0, 10),
          address: adress,
          contactName: contactName,
          contactNumber: contactNumber,
          education: education.join(),
          courses: courses.join()
        });
      }
      return temporary;
    }

    function showFormJsonDialog(event) {
      event.stopPropagation();
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'employeeJsonForm.tmpl.html',
        controller: 'empoloyeeJsonModal as empoloyeeJsonM',
        targetEvent: event,
        clickOutsideToClose: true
      });
    }

    function deleteConfirm(event, employee, index) {
      event.stopPropagation();
      var confirm = $mdDialog.confirm().title('Delete the' + employee.getFullName() + ' employee ?').targetEvent(event).cancel('No').ok('Yes');
      $mdDialog.show(confirm).then(function () {
        removeEmployee(employee, index);
      });
    }

    function searchFilter(index) {
      final = vm.employees.map(function (employee) {

        return employee.holidays.map(function (per) {
          for (var i = 0; i < per.period.length; i++) {
            date = new Date(per.period[i].from);
          }

          if (vm.monthSelection[index] === vm.monthsList[date.getMonth()]) {
            filtru.push(employee);
          }

          return filtru;
        });
      });

      vm.employees = filtru;
    }

    function searchPeriodFilter(index) {
      final = vm.employees.map(function (employee) {
        return employee.holidays.map(function (per) {
          for (var i = 0; i < per.period.length; i++) {
            date = new Date(per.period[i].from);
          }if (date.getTime() <= vm.dateList.to.getTime() && date.getTime() >= vm.dateList.from.getTime()) filtru.push(employee);
          return filtru;
        });
      });
      vm.employees = filtru;
    }

    function querySearch(query) {
      return autocompleteService.querySearch(query, vm.employees);
    }

    function selectedMonthDate(data, index) {
      if (data !== undefined) {
        vm.monthSelection[index] = data;
        return data;
      } else {
        return "Pick a month";
      }
    }

    function toggleFilters() {
      vm.showFilters = !vm.showFilters;
    }

    function sendToEmployee(data, index) {
      var info = angular.copy(data);
      delete data.id;
      Employee.save(data).then(function (info) {
        $rootScope.showToast('Employee created successfully!');
      }, function (err) {
        $rootScope.showToast('Failed to create employee');
      });
      removeEmployee(info, index);
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS DECLARATION
    // ----------------------------------------------------------------------

    function getEmployees() {
      Employee.getAll(vm.candidate).then(function (data) {
        vm.employees = data;
        vm.emplCopy = angular.copy(vm.employees);
        return autocompleteService.buildList(vm.employees, ['firstName', 'lastName']);
      }, function (data) {});
    }

    function removeEmployee(employee, $index) {
      var employeeToRemove = {
        id: employee.id
      };
      Employee.remove(employeeToRemove, vm.candidate).then(function (data) {
        var employeeIndex = miscellaneousService.getItemIndex(vm.employees, employee.id);
        vm.employees.splice(employeeIndex, 1);
        $rootScope.showToast('Employee deleted successfully!');
      }, function (data) {
        $rootScope.showToast('Failed to delete employee');
      });
    }

    function multipleDelete() {
      for (var i = 0; i < vm.table.selected.length; i++) {
        vm.ids.push(vm.table.selected[i].id);
        vm.employees = _.without(vm.employees, _.findWhere(vm.employees, {
          id: vm.table.selected[i].id
        }));
      }
      Employee.remove({
        id: vm.ids
      }, vm.candidate).then(function (res) {
        // Callback.success("All employees was deleted");
        vm.table.selected = [];
      }, function (err) {
        // Callback.error("Failed to delete !");
      });
    }
    $scope.$on('employeesListChanged', function (event, args) {
      var employee = args[1];
      var employeeIndex = '';
      switch (args[0]) {
        case 'save':
          vm.employees.push(employee);
          break;
        case 'saveFromJson':
          vm.employees = vm.employees.concat(employee);
          break;
        case 'update':
          employeeIndex = miscellaneousService.getItemIndex(vm.employees, employee.id);
          vm.employees[employeeIndex] = angular.copy(employee);
          break;
        default:
          getEmployees();
      }
    });

    // ----------------------------------------------------------------------
    // Employee filters
    // ----------------------------------------------------------------------

    function getSkills() {
      skillModel.getAll().then(function (data) {
        vm.allSkills = data;
        return autocompleteService.buildList(vm.allSkills, ['name']);
      }, function (err) {});
    }

    function querySearchSkills(query) {
      return autocompleteService.querySearch(query, vm.allSkills);
    }

    function selectedSkillChange(items, list) {
      if (items !== undefined) {
        vm.arraySkill.push(items);
        var result = _.filter(list, function (item) {
          if (item.skills.length > 0) {
            var final = _.filter(item.skills, function (skil) {
              if (skil.label === items) {
                return item;
              }
            });
            if (final.length > 0) {
              return final;
            }
          }
        });
        vm.employees = result;
      }
    }

    function removeSearchSkills(index) {
      vm.arraySkill.splice(index, 1);
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }
    // search projects
    function getProjects() {
      ProjectModel.getAll().then(function (data) {
        vm.projects = data;
        return autocompleteService.buildList(vm.projects, ['name']);
      }, function (data) {});
    }

    function querySearchProjects(query) {
      return autocompleteService.querySearch(query, vm.projects);
    }

    function selectedProjectChange(items, list) {
      if (items !== undefined) {
        vm.arrayProject.push(items);
        var result = _.filter(list, function (item) {
          if (item.projects.length > 0) {
            var final = _.filter(item.projects, function (project) {
              if (project.name === items) {
                return item;
              }
            });
            if (final.length > 0) {
              return final;
            }
          }
        });
        vm.employees = result;
      }
    }

    function removeSearchProject(index) {
      vm.arrayProject.splice(index, 1);
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }
    // search languages
    function getLanguages() {
      Employee.getLanguages().then(function (data) {
        vm.languages = data;
        return autocompleteService.buildList(vm.languages, ['name']);
      }, function (err) {
        $rootScope.showToast('Something gone wrong');
        //Callback.error();
      });
    }

    function querySearchLanguage(query) {
      return autocompleteService.querySearch(query, vm.languages);
    }

    function selectedLanguageChange(items, list) {
      if (items !== undefined) {
        vm.arrayLanguage.push(items);
        var result = _.filter(list, function (item) {
          if (item.languages != null) {
            var final = _.filter(item.languages, function (lang) {
              if (lang.language === items) {
                return item;
              }
            });
            if (final.length > 0) {
              return final;
            }
          }
        });
        vm.employees = result;
      }
    }

    function removeSearchLanguage(index) {
      vm.arrayLanguage.splice(index, 1);
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }

    function searchWhenRemove(projectInfo, skillInfo, languageInfo) {
      var employeeCopy = vm.emplCopy;
      var resFinal;
      if (projectInfo.length > 0) {
        resFinal = _.filter(projectInfo, function (items) {
          var result = _.filter(employeeCopy, function (item) {
            if (item.projects.length > 0) {
              var final = _.filter(item.projects, function (project) {
                if (project.name === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          employeeCopy = result;
          vm.employees = result;
        });
      } else {
        vm.employees = employeeCopy;
      }
      if (skillInfo.length > 0) {
        resFinal = _.filter(skillInfo, function (items) {
          var result = _.filter(employeeCopy, function (item) {
            if (item.skills.length > 0) {
              var final = _.filter(item.skills, function (skil) {
                if (skil.label === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          employeeCopy = result;
          vm.employees = result;
        });
      } else {
        vm.employees = employeeCopy;
      }
      if (languageInfo.length > 0) {
        resFinal = _.filter(languageInfo, function (items) {
          var result = _.filter(employeeCopy, function (item) {
            if (item.languages != null) {
              var final = _.filter(item.languages, function (lang) {
                if (lang.language === items) {
                  return item;
                }
              });
              if (final.length > 0) {
                return final;
              }
            }
          });
          employeeCopy = result;
          vm.employees = result;
        });
      } else {
        vm.employees = employeeCopy;
      }
    }
    // search Project manager
    function selectedManagerPr(items, list) {
      if (items !== undefined) {
        selectedManagerChange(items, list);
        return items;
      } else {
        return "Manager";
      }
    }

    function selectedManagerChange(items, list) {
      if (items !== undefined) {
        var result = _.filter(list, function (item) {
          if (item.projects.length > 0) {
            var final = _.filter(item.projects, function (project) {
              if (project.manager === item.firstName + ' ' + item.lastName) {
                return item;
              }
            });
            if (final.length > 0) {
              return final;
            }
          }
        });
        vm.employees = result;
      }
    }
    // search level
    function selectedSkillLeve(items, list) {
      if (items !== undefined) {
        levelFilter(items, list);
        return items;
      } else {
        return "Experience";
      }
    }

    function levelFilter(items, list) {
      var first;
      var second;
      switch (items) {
        case 'Junior':
          first = 1;
          second = 2;
          break;
        case 'Junior-Mid':
          first = 3;
          second = 4;
          break;
        case 'Mid':
          first = 5;
          second = 6;
          break;
        case 'Mid-Senior':
          first = 7;
          second = 8;
          break;
        case 'Senior':
          first = 9;
          second = 10;
          break;
        default:
          first = 1;
          second = 2;
      }
      first = first.toString();
      second = second.toString();
      var result = _.filter(list, function (item) {
        if (item.skillsLevel != null) {
          var final = _.filter(item.skillsLevel, function (level) {
            if (level === first || level === second) {
              return item;
            }
          });
          if (final.length > 0) {
            return final;
          }
        }
      });
      vm.employees = result;
    }

    function changeSkillLevelFilter() {
      vm.birthdayDate = undefined;
      vm.positionTitle = undefined;
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }
    //filter by birthday
    function selectedbirthdayMonth(birthday, list) {
      if (birthday !== undefined) {
        var brdMonthNumber = transformMonth(birthday);
        birthdayFilter(brdMonthNumber, list);
        return vm.birthdayMonth;
      } else {
        return "Birthday Month";
      }
    }

    function birthdayFilter(birthdays, list) {
      if (birthdays !== undefined) {
        var result = _.filter(list, function (item) {
          if (item.birthday !== null) {
            item.birthday = new Date(item.birthday);
            if (item.birthday.getMonth() === birthdays) {
              return item;
            }
          }
        });
        vm.employees = result;
      }
    }

    function searchBirthdayFilter(year, list) {
      if (year !== undefined) {
        year = parseInt(year, 10);
        var result = _.filter(list, function (item) {
          if (item.birthday != null) {
            item.birthday = new Date(item.birthday);
            if (item.birthday.getFullYear() === year) {
              return item;
            }
          }
        });
        vm.employees = result;
      }
    }

    function clearBirthdayFilter() {
      vm.bornYear = "";
      vm.selectedbirthdayMonth = undefined;
      vm.positionTitle = undefined;
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }

    //filter by positionTitle
    function selectedPositionTitle(position, list) {
      if (position !== undefined) {
        selectedPositionTitleFilter(position, list);
        return position;
      } else {
        return "Position title...";
      }
    }

    function selectedPositionTitleFilter(position, list) {
      var result = _.filter(list, function (item) {
        if (item.assistPositionTitle != null) {
          if (item.assistPositionTitle === position) {
            return item;
          }
        }
      });
      vm.employees = result;
    }

    function clearPositionTitle() {
      vm.selectedSkillLevel = undefined;
      vm.positionTitle = undefined;
      vm.birthdayDate = undefined;
      searchWhenRemove(vm.arrayProject, vm.arraySkill, vm.arrayLanguage);
    }

    function reset() {
      vm.employees = vm.emplCopy;
      vm.arraySkill = [];
      vm.searchSkill = "";
      vm.arrayProject = [];
      vm.searchProject = "";
      vm.arrayLanguage = [];
      vm.searchLanguage = "";
      vm.selectedManager = undefined;
      vm.selectedSkillLevel = undefined;
      filtru = [];
      vm.dateList = [];
      vm.selectedMonth = undefined;
      vm.positionTitle = undefined;
      vm.birthdayDate = undefined;
    }

    function transformMonth(month) {
      switch (month) {
        case 'January':
          return 0;
          break;
        case 'February':
          return 1;
          break;
        case 'March':
          return 2;
          break;
        case 'April':
          return 3;
          break;
        case 'May':
          return 4;
          break;
        case 'June':
          return 5;
          break;
        case 'July':
          return 6;
          break;
        case 'August':
          return 7;
          break;
        case 'September':
          return 8;
          break;
        case 'October':
          return 9;
          break;
        case 'November':
          return 10;
          break;
        case 'December':
          return 11;
          break;
        default:
          return 0;
      }
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // ------------------------------------------------------------------------
  // @employeeUploadController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('employeeUploadController', employeeUploadController);

  employeeUploadController.$inject = ['$rootScope', '$scope', '$stateParams', 'Upload', '$timeout'];

  function employeeUploadController($rootScope, $scope, $stateParams, Upload, $timeout) {

    // ----------------------------------------------------------------------
    // VARIABLES
    // ----------------------------------------------------------------------

    var vm = this;
    vm.disabledUpload = true;
    vm.showButton = false;
    vm.name = "";
    vm.showInput = false;
    vm.uploadedFile = [];
    vm.realNames = [];
    $scope.log = '';

    // ----------------------------------------------------------------------
    // INVOKING PRIVATE METHODSs
    // ----------------------------------------------------------------------

    var getEmployee = $rootScope.$on('employeeIsLoadedEvent', function (event, employee) {
      vm.employee = employee;
      updateFiles();
    });

    $scope.$on('$destroy', function () {
      getEmployee();
    });

    // ----------------------------------------------------------------------
    // PUBLIC METHODS
    // ----------------------------------------------------------------------

    vm.changeView = changeView;
    vm.saveEmployee = saveEmployee;

    // ----------------------------------------------------------------------
    // PUBLIC METHODS DECLARATION
    // ----------------------------------------------------------------------

    function changeView() {
      vm.disabledUpload = false;
    }

    function saveEmployee(employee) {
      fill(employee);
      vm.disabledUpload = true;
      $rootScope.$emit("callSaveMethodCards", employee);
      updateFiles();
    }

    // ----------------------------------------------------------------------
    // PRIVATE METHODS
    // ----------------------------------------------------------------------

    function fill(employee) {
      vm.employee.fileNames = vm.realNames;
      vm.employee.files = vm.uploadedFile;
      employee.files = vm.employee.files;
      employee.fileNames = vm.employee.fileNames;
      employee = vm.employee;
      return employee;
    }

    function updateFiles() {
      if (vm.employee.files !== null && vm.employee.files !== undefined && vm.employee.files !== '') {
        for (var i = 0; i < vm.employee.files.length; i++) {
          vm.uploadedFile[i] = vm.employee.files[i] ? vm.employee.files[i] : '';
          vm.realNames[i] = vm.employee.fileNames[i] ? vm.employee.fileNames[i] : '';
        }
        vm.indexVal = vm.uploadedFile.length;
      }
    }

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (file) {
            Upload.upload({
              url: apiUrl + '/fileupload/upload',
              data: {
                uploadFile: file
              }
            }).then(function (resp) {
              $timeout(function () {
                vm.nr = 1 + vm.uploadedFile.length;
                for (var i = vm.uploadedFile.length; i < vm.nr; i++) {
                  vm.uploadedFile[i] = '/files/' + resp.data.file[0].fd.substr(resp.data.file[0].fd.lastIndexOf('/') + 1);
                }
                vm.showInput = true;
              });
            }, null, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.log = progressPercentage;
            });
          }
        }
      }
    };

    $scope.$watch('files', function () {
      $scope.upload($scope.files);
      if ($scope.files) {
        for (var i = 0; i < $scope.files.length; i++) {
          if ($scope.files[i]) {
            vm.realNames.push($scope.files[i].name);
          }
        }
      }
    });

    $scope.$watch('file', function () {
      if ($scope.file !== null) {
        $scope.files = [$scope.file];
      }
    });
  }
})();
'use strict';

(function () {

  'use strict';

  // equipmentsAddFromJson controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('equipmentsAddFromJson', equipmentsAddFromJson);

  equipmentsAddFromJson.$inject = ['Equipments', '$scope', '$rootScope', 'Callback', '$mdDialog'];

  function equipmentsAddFromJson(Equipments, $scope, $rootScope, Callback, $mdDialog) {
    var self = this;

    // Public methods
    // ------------------------------------------------------------------------
    self.saveFromJson = saveFromJson;
    self.clearFields = clearFields;
    self.closeDialog = closeDialog;

    // Public methods declaration
    // ------------------------------------------------------------------------
    function saveFromJson(info) {
      var json = angular.fromJson(info);
      Equipments.saveJson(json).then(function (data) {
        $mdDialog.cancel();
        Callback.success('Your equipments from Json was added with success!');
        $rootScope.$emit('addlist', data);
      }, function (err) {});
    }

    function clearFields() {
      self.json = '';
    }

    function closeDialog() {
      $mdDialog.cancel();
    }

    return $scope.addJson = self;
  }
})();
'use strict';

(function () {

  'use strict';

  // equipmentsAddController controller
  // ------------------------------------------------------------------------

  equipmentsAddController.$inject = ['Equipments', '$mdDialog', '$scope', '$http', '$rootScope', 'data', 'Callback'];

  angular.module('HRA').controller('equipmentsAdd', equipmentsAddController);

  function equipmentsAddController(Equipments, $mdDialog, $scope, $http, $rootScope, data, Callback) {

    var self = this;
    self.form = data.form || {};
    self.rating = 0;

    // Public methods
    // ------------------------------------------------------------------------
    self.addEquipment = addEquipment;
    self.clear = clear;
    self.close = close;

    // Public methods declaration
    // ------------------------------------------------------------------------
    function addEquipment(id) {
      if (data.form !== undefined && data.form.id) {
        Equipments.update(self.form).then(function (res) {
          Callback.success("Your equipment was updated with success!");
          $mdDialog.cancel();
          $rootScope.$emit('eqReplace', res);
        }, function (err) {
          Callback.error("Failed to update");
        });
      } else {
        Equipments.save(self.form).then(function (res) {
          Callback.success('Your equipment was added with success!');
          self.form = {};
          $rootScope.$emit('eqAdd', res);
        }, function (err) {
          Callback.error("Failed to save");
        });
      }
    };

    function clear() {
      self.form = {};
    }

    function close() {
      $mdDialog.cancel();
    }

    return $scope.addForm = self;
  }
})();
'use strict';

(function () {

	'use strict';

	// allEquipmentsController controller
	// ------------------------------------------------------------------------

	angular.module('HRA').controller('allEquipmentsController', allEquipmentsController);

	allEquipmentsController.$inject = ['autocompleteService', '$scope', '$mdDialog', '$rootScope', 'Equipments', 'Callback', '$mdToast'];

	function allEquipmentsController(autocompleteService, $scope, $mdDialog, $rootScope, Equipments, Callback, $mdToast) {
		var self = this;

		var listEquipments = [];
		var allName = [];
		self.ids = [];
		self.selected = [];
		self.selectedPag = [];
		self.table = {
			options: {
				rowSelection: true,
				multiSelect: true,
				autoSelect: true,
				decapitate: false,
				largeEditDialog: false,
				boundaryLinks: true,
				limitSelect: true,
				pageSelect: true
			},
			query: {
				order: 'name',
				filter: '',
				limit: 10,
				page: 1
			},
			"limitOptions": [10, 15, 20],
			selected: []
		};

		getEquipments();

		// Public methods
		// ------------------------------------------------------------------------

		self.showAddForm = showAddForm;
		self.remove = remove;
		self.editRow = editRow;
		self.querySearch = querySearch;
		self.multipleDelete = multipleDelete;
		self.getPagination = getPagination;
		self.addFromJson = addFromJson;

		// Public methods declaration
		// ------------------------------------------------------------------------
		function getEquipments() {
			Equipments.list().then(function (res) {
				self.equipmentsList = res;
				return autocompleteService.buildList(self.equipmentsList, ['name']);
			}, function (err) {
				Callback.error();
			});
		};

		function showAddForm(data) {
			$mdDialog.show({
				templateUrl: rootTemplatePath + '/components/equipments/views/equipmentsAdd.html',
				controller: 'equipmentsAdd',
				clickOutsideToClose: true,
				data: {}
			});
		}

		$rootScope.$on('eqAdd', function (event, data) {
			self.equipmentsList.push(data);
		});

		$rootScope.$on('eqReplace', function (event, data) {
			getEquipments();
		});

		$rootScope.$on('addlist', function (event, data) {
			self.equipmentsList = self.equipmentsList.concat(data);
		});

		function remove(id, ev, name) {
			var confirm = $mdDialog.confirm().title('Would you like to delete ' + name + ' equipment?').ariaLabel('Lucky day').targetEvent(ev).ok('Yes').cancel('No');

			$mdDialog.show(confirm).then(function () {
				Equipments.remove({
					id: id
				}).then(function (res) {
					self.equipmentsList = _.without(self.equipmentsList, _.findWhere(self.equipmentsList, {
						id: id
					}));
					Callback.success('Your equipments was deleted');
				}, function (err) {
					Callback.error("Failed to delete this equipment!");
				});
			});
		};

		function editRow(id) {
			var myRow = self.equipmentsList.filter(function (item) {
				return item.id === id;
			})[0] || {};

			$mdDialog.show({
				templateUrl: rootTemplatePath + '/components/equipments/views/equipmentsAdd.html',
				controller: 'equipmentsAdd',
				clickOutsideToClose: true,
				data: {
					form: angular.copy(myRow)
				}
			});
		}

		function querySearch(query) {
			return autocompleteService.querySearch(query, self.equipmentsList);
		}

		function multipleDelete() {
			for (var i = 0; i < self.table.selected.length; i++) {
				self.ids.push(self.table.selected[i].id);
				self.equipmentsList = _.without(self.equipmentsList, _.findWhere(self.equipmentsList, {
					id: self.table.selected[i].id
				}));
			}
			Equipments.remove({
				id: self.ids
			}).then(function (res) {
				Callback.success("All equipments was deleted");
				self.table.selected = [];
			}, function (err) {
				Callback.error("Failed to delete !");
			});
		}

		self.query = {
			order: 'name',
			limit: 5,
			page: 1
		};

		function success(pagination) {
			self.pagination = pagination;
		}

		function getPagination() {
			self.promise = self.equipmentsList(self.query, success).$promise;
		};

		function addFromJson(event) {
			event.stopPropagation();

			$mdDialog.show({
				parent: angular.element(document.body),
				templateUrl: rootTemplatePath + '/components/equipments/views/equipmentsFromJson.html',
				controller: 'equipmentsAddFromJson',
				targetEvent: event,
				clickOutsideToClose: true
			});
		}

		return $scope.listEq = self;
	}
})();
'use strict';

(function () {

	'use strict';

	// equipmentDetailsController controller
	// ------------------------------------------------------------------------

	equipmentDetailsController.$inject = ['$scope', '$rootScope', '$stateParams', '$mdToast', 'Equipments', 'Callback'];

	angular.module('HRA').controller('equipmentDetailsController', equipmentDetailsController);

	function equipmentDetailsController($scope, $rootScope, $stateParams, $mdToast, Equipments, Callback) {

		var self = this;
		var id = parseInt($stateParams.id, 10);

		// Public methods declaration
		// ------------------------------------------------------------------------
		Equipments.getEquipmentsById(id).then(function (data) {
			self.equipmentInfo = data;
		}, function (err) {
			Callback.error();
		});

		return $scope.detailsCtrl = self;
	}
})();
'use strict';

(function () {

  'use strict';

  // @extraAllListsController
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('extraAllListsController', extraAllListsController);

  function extraAllListsController() {}
})();
'use strict';

(function () {

  'use strict';

  // extraFormCtrl Controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('extraFormCtrl', extraFormCtrl);

  extraFormCtrl.$inject = ['$scope', 'ExtraModel', '$mdToast', '$mdDialog', '$rootScope', 'data'];

  function extraFormCtrl($scope, ExtraModel, $mdToast, $mdDialog, $rootScope, data) {

    var vm = this;
    var extraType = data.extraType;
    vm.extratype = data.extraType;
    vm.extra = data.extra || {};

    // Public methods
    // ------------------------------------------------------------------------
    vm.saveButton = saveButton;
    vm.closeButton = closeButton;
    vm.clearButton = clearButton;

    // Public methods declaration
    // ------------------------------------------------------------------------
    function saveButton() {
      if (data.id) {
        vm.extra = updateExtra();
      } else {
        vm.extra = addExtra();
      }
    }

    function closeButton() {
      $mdDialog.cancel();
    }

    function clearButton() {
      vm.extra = {};
    }

    // Private methods
    // ------------------------------------------------------------------------
    function addExtra() {
      ExtraModel.save(vm.extra, extraType).then(function (data) {
        onSaveSuccess('save', data);
        $rootScope.showToast('Extra added');
      }, function (error) {
        $rootScope.showToast('Error on adding a new extra');
        onSaveError(error);
      });
    }

    function updateExtra() {
      ExtraModel.update(vm.extra, extraType).then(function (data) {
        $rootScope.$emit('upSkill', data);
        $rootScope.showToast('Skill updated');
        $mdDialog.cancel();
      }, function (error) {
        $rootScope.showToast('Error on updating skill');
      });
    }

    function onSaveSuccess(action, project) {
      // vm.btnIsDisabled = false;
      // vm.serverErrors = false;
      $scope.extraform.$setUntouched();
      $rootScope.$broadcast('event:extraListChanged', [action, project]);
    }

    function onSaveError(message) {
      vm.btnIsDisabled = false;
      vm.serverErrors = true;
      vm.serverErrorsArray = message;
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // employeesCreateModal controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('extraJsonModal', extraJsonModal);

  extraJsonModal.$inject = ['$mdDialog', '$rootScope', 'ExtraModel', 'data'];

  function extraJsonModal($mdDialog, $rootScope, ExtraModel, data) {

    var vm = this;

    // Public methods
    // ------------------------------------------------------------------------
    vm.saveFromJson = saveFromJson;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;

    // Public methods declaration
    // ------------------------------------------------------------------------
    function saveFromJson(json) {
      if (json) {
        json = angular.fromJson(json);

        ExtraModel.savefromJson(json, data.extraType).then(function (data) {
          $rootScope.$broadcast('employeesListChanged', ['saveFromJson', data]);
          $rootScope.showToast('Successfully added employees from json!');
        }, function (error) {});
      } else {
        console.log('Empty json!');
      }
    }

    function clearFields() {
      vm.json = '';
    }

    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();
'use strict';

(function () {

  'use strict';

  // employeesList controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('extraListController', extraListController);

  extraListController.$inject = ['$rootScope', '$scope', '$mdDialog', 'autocompleteService', 'miscellaneousService', 'ExtraModel', '$templateCache', 'customerModel', 'Industries', 'appType', 'ProjectModel', 'skillModel', '$timeout'];

  function extraListController($rootScope, $scope, $mdDialog, autocompleteService, miscellaneousService, ExtraModel, $templateCache, customerModel, Industries, appType, ProjectModel, skillModel, $timeout) {

    // Variables
    // ------------------------------------------------------------------------
    var vm = this;
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'name',
        filter: '',
        limit: 6,
        page: 1
      },
      "limitOptions": [6, 15, 20],
      selected: []
    };

    vm.api = true;
    vm.createSkill = [];
    vm.skillList = [];
    vm.appType = [];
    vm.industryes = [];
    vm.customers = [];

    // Public methods
    // ------------------------------------------------------------------------
    vm.showFormDialog = showFormDialog;
    vm.saveIndustry = saveIndustry;
    vm.deleteConfirm = deleteConfirm;
    vm.showFormJsonDialog = showFormJsonDialog;
    vm.addExtraListFromAPI = addExtraListFromAPI;
    vm.addProjectsFromAPI = addProjectsFromAPI;
    vm.updateProjectsFromAPI = updateProjectsFromAPI;

    // Invoking private functions
    // ------------------------------------------------------------------------
    getAllExtra();
    getAllData();

    $scope.$on('event:extraListChanged', function (event, args) {
      var extra = args[1];
      var extraIndex = '';
      switch (args[0]) {
        case 'save':
          if (!vm.extraList) {
            vm.extraList = [];
          }
          vm.extraList.push(extra);
          break;
        case 'update':
          extraIndex = miscellaneousService.getItemIndex(vm.extraList, extra.id);
          vm.extraList[extraIndex] = angular.copy(extra);
          break;
        case 'saveFromJson':
          vm.extraList = vm.extraList.concat(extra);
          break;
        default:
          getAllExtra();
      }
    });

    // Public methods declaration
    // ------------------------------------------------------------------------
    function showFormDialog(event, data, id) {
      $mdDialog.show({
        templateUrl: rootTemplatePath + '/components/extra/views/extraForm.view.html',
        controller: 'extraFormCtrl',
        controllerAs: 'extraForm',
        clickOutsideToClose: true,
        data: {
          extra: data,
          extraType: vm.extra.type,
          id: id
        }
      });
    }

    function addExtraListFromAPI() {
      addFunctions();
    }

    function addProjectsFromAPI() {
      getAllData();
      $timeout(function () {
        ProjectModel.getFromApi(vm.appType, vm.industryes, vm.customers, vm.skillList).then(function (res) {
          ProjectModel.saveApi(res).then(function (data) {
            vm.disabledProjects = true;
            vm.disabledExtra = true;
            $rootScope.showToast("Projects loaded!");
            ProjectModel.getAll().then(function (data) {
              console.log("ERROR: ", data);
            }, function (error) {
              console.log("ERROR: ", error);
            });
          });
        }, function (error) {
          console.log('ERROR: ', error);
        });
      }, 3000);
    }

    function updateProjectsFromAPI(projects) {
      ProjectModel.getAll().then(function (projects) {
        projects.forEach(function (project) {
          ProjectModel.update(project).then(function (data) {
            console.log('SUCCESS: ', data);
          }, function (error) {
            console.log('ERROR: ', error);
          });
        });
      }, function (error) {
        console.log('ERROR: ', error);
      });
    }

    function getAllData() {
      appType.getAll().then(function (data) {
        vm.appType = data;
        return autocompleteService.buildList(vm.appType, ['name']);
      }, function (err) {});
      Industries.getAllIndustries().then(function (data) {
        vm.industryes = data;
        return autocompleteService.buildList(vm.industryes, ['name']);
      }, function (err) {});
      customerModel.getAllCustomers().then(function (data) {
        vm.customers = data;
        return autocompleteService.buildList(vm.customers, ['name']);
      }, function (err) {});
      skillModel.getAll().then(function (res) {
        vm.skillList = res;
        vm.techs = res;
        autocompleteService.buildList(vm.skillList, ['name']);
      }, function (res) {
        $rootScope.showToast('Error on loading data! Please refresh!');
      });
    }

    // Private methods declaration
    // ------------------------------------------------------------------------
    // Get the extra informations using the extraType attribute
    // Redirect the request to the correct api url
    function getAllExtra() {
      if (vm.extra.api !== undefined) {
        vm.api = false;
      }

      switch (vm.extra.type) {
        case 'industries':
          getAllIndustries('industries');
          break;
        case 'customers':
          getAllCustomers('customers');
          break;
        case 'appTypes':
          getAllAppTypes('appTypes');
          break;
        default:
          break;
      }
    }

    function addFunctions() {
      customerModel.getFromApi().then(function (res) {
        $rootScope.showToast("Customers loaded!");
      }, function (err) {
        $rootScope.showToast("Error on loading customers");
      });
      Industries.getFromApi().then(function (res) {
        $rootScope.showToast("Industries loaded!");
      }, function (err) {
        $rootScope.showToast("Error on loading industries");
      });
      appType.getFromApi().then(function (res) {
        $rootScope.showToast("Application types loaded!");
      }, function (err) {
        $rootScope.showToast("Error on loading application types");
      });
      ProjectModel.getTecho().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].length > 0) {
            for (var j = 0; j < data[i].length; j++) {
              vm.createSkill.push({
                name: data[i][j],
                label: data[i][j]
              });
            }
          }
        }
        vm.finalTechArr = removeDuplicates(vm.createSkill);
        skillModel.saveJsons(vm.finalTechArr).then(function (data) {
          vm.newSkillFromApi = data;
        });
      });
    }

    function removeDuplicates(arr) {
      var newTechArr = [];
      angular.forEach(arr, function (value, key) {
        var exists = false;
        angular.forEach(newTechArr, function (val2, key) {
          if (angular.equals(value.name, val2.name)) {
            exists = true;
          };
        });
        if (exists == false && value.name != "") {
          newTechArr.push(value);
        }
      });
      return newTechArr;
    }

    // GET
    function getAllIndustries(extraType) {
      ExtraModel.getAllExtra(extraType).then(function (data) {
        vm.extraList = data;
      }, function () {
        console.log('GET Industrie Failed');
      });
    }

    function getAllCustomers(extraType) {
      ExtraModel.getAllExtra(extraType).then(function (data) {
        vm.extraList = data;
      }, function () {
        console.log('GET Customers Failed');
      });
    }

    function getAllAppTypes(extraType) {
      ExtraModel.getAllExtra(extraType).then(function (data) {
        vm.extraList = data;
      }, function () {
        console.log('GET App Types Failed');
      });
    }

    // SAVE
    function saveIndustry(data, extraType) {
      ExtraModel.save(data, extraType).then(function (data) {
        vm.extraList = data;
      }, function (data) {
        console.log('GET Industrie Failed');
      });
    }

    function deleteConfirm(event, type, index, removeFromIndex) {
      event.stopPropagation();
      var confirm = $mdDialog.confirm().title('Delete the ' + type + ' ' + vm.extra.type + '?').targetEvent(event).cancel('No').ok('Yes');
      $mdDialog.show(confirm).then(function () {
        removeType(index, vm.extra.type, removeFromIndex);
      });
    }

    function removeType(index, extraType, removeFromIndex) {
      var extraToRemove = {
        id: index
      };
      ExtraModel.remove(extraToRemove, extraType).then(function (success) {
        var extraIndex = miscellaneousService.getItemIndex(vm.extraList, index);
        vm.extraList.splice(extraIndex, 1);
      }, function (error) {
        $rootScope.showToast('Failed to delete ' + extraType);
      });
    }

    function showFormJsonDialog(event) {
      event.stopPropagation();
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'extraJsonForm.tmpl.html',
        controller: 'extraJsonModal as extraJsonM',
        targetEvent: event,
        clickOutsideToClose: true,
        data: {
          extraType: vm.extra.type
        }
      });
    }
  }
})();
'use strict';

// employeesCreateModal controller
// ------------------------------------------------------------------------
angular.module('HRA').controller('holidayJsonModal', holidayJsonModal);

holidayJsonModal.$inject = ['$mdDialog', '$rootScope', 'HolidayModel'];

function holidayJsonModal($mdDialog, $rootScope, HolidayModel) {

  var vm = this;

  // Public methods
  // ------------------------------------------------------------------------
  vm.saveFromJson = saveFromJson;
  vm.clearFields = clearFields;
  vm.closeDialog = closeDialog;

  // Public methods declaration
  // ------------------------------------------------------------------------
  function saveFromJson(json) {
    if (json) {
      json = angular.fromJson(json);

      HolidayModel.savefromJson(json).then(function (data) {
        $rootScope.$broadcast('holidaysListChanged', ['saveFromJson', data]);
        $rootScope.showToast('Successfully added holiday from json!');
      }, function (error) {});
    } else {
      console.log('Empty json!');
    }
  }

  function clearFields() {
    vm.json = '';
  }

  function closeDialog() {
    $mdDialog.cancel();
  }
}
'use strict';

// holidayModal controller
// ------------------------------------------------------------------------
angular.module('HRA').controller('holidayModal', holidayModal);

holidayModal.$inject = ['$mdDialog', 'data', 'HolidayModel'];

function holidayModal($mdDialog, data, HolidayModel) {

  var vm = this;
  vm.holiday = data.holiday;
  vm.holidayIndex = data.holidayIndex;

  // if (!data.holiday) {
  //   vm.holiday = new HolidayModel();
  // } else {
  //   vm.holiday = angular.copy(data.holiday);
  // }


  if (data.holidayIndex >= 0) {
    vm.formTitle = 'Edit Holiday';
  } else {
    vm.formTitle = 'Create Holiday';
  }
}
'use strict';

// ------------------------------------------------------------------------
angular.module('HRA').controller('projectJsonModal', projectJsonModal);

projectJsonModal.$inject = ['$mdDialog', '$rootScope', 'ProjectModel'];

function projectJsonModal($mdDialog, $rootScope, ProjectModel) {

  var vm = this;

  // Public methods
  // ------------------------------------------------------------------------
  vm.saveFromJson = saveFromJson;
  vm.clearFields = clearFields;
  vm.closeDialog = closeDialog;

  // Public methods declaration
  // ------------------------------------------------------------------------
  function saveFromJson(json) {
    if (json) {
      json = angular.fromJson(json);

      ProjectModel.savefromJson(json).then(function (data) {
        $rootScope.$broadcast('projectsListChanged', ['saveFromJson', data]);
        $rootScope.showToast('Successfully added projects from json!');
      }, function (error) {});
    } else {
      console.log('Empty json!');
    }
  }

  function clearFields() {
    vm.json = '';
  }

  function closeDialog() {
    $mdDialog.cancel();
  }
}
'use strict';

// projectsCreateModal controller
// ------------------------------------------------------------------------
angular.module('HRA').controller('projectModal', projectModal);

projectModal.$inject = ['$mdDialog', 'data'];

function projectModal($mdDialog, data) {

  var vm = this;
  vm.project = angular.copy(data.project);
  vm.projectIndex = data.projectIndex;

  if (data.projectIndex >= 0) {
    vm.formTitle = 'Edit Form';
  } else {
    vm.formTitle = 'Create Form';
  }
}
'use strict';

(function () {

  'use strict';

  // trainingDetailsController controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('trainingDetailsController', trainingDetailsController);

  trainingDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'TrainingModel'];

  function trainingDetailsController($rootScope, $scope, $stateParams, TrainingModel) {

    // Variables
    // ------------------------------------------------------------------------

    var vm = this;

    // Public methods
    // ------------------------------------------------------------------------


    // Public methods declaration
    // ------------------------------------------------------------------------


    // Private methods declaration
    // ------------------------------------------------------------------------
  }
})();
'use strict';

(function () {

  'use strict';

  // trainingModal controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('trainingModal', trainingModal);

  trainingModal.$inject = ['$mdDialog', 'data'];

  function trainingModal($mdDialog, data) {

    // Variables
    // ------------------------------------------------------------------------

    var vm = this;
  }
})();
'use strict';

(function () {

  'use strict';

  // trainings controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('trainingsCtrl', trainingsCtrl);

  trainingsCtrl.$inject = ['$rootScope', '$scope', '$mdDialog', 'autocompleteService', 'TrainingModel'];

  function trainingsCtrl($rootScope, $scope, $mdDialog, autocompleteService, TrainingModel) {

    // Variables
    // ------------------------------------------------------------------------

    var vm = this;
    vm.table = {
      options: {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      },
      query: {
        order: 'firstName',
        filter: '',
        limit: 10,
        page: 1
      },
      "limitOptions": [10, 15, 20],
      selected: []
    };

    // Public methods
    // ------------------------------------------------------------------------


    // Public methods declaration
    // ------------------------------------------------------------------------


    // Private methods declaration
    // ------------------------------------------------------------------------
  }
})();
'use strict';

(function () {

  'use strict';

  // skillsCreateModal controller
  // ------------------------------------------------------------------------

  angular.module('HRA').controller('skillJsonM', skillJsonM);

  skillJsonM.$inject = ['$mdDialog', 'skillModel', '$http', '$rootScope'];

  function skillJsonM($mdDialog, skillModel, $http, $rootScope) {

    var url = "/js/custom/_common/data/skills.json";

    var vm = this;
    var raw = [];

    // public methods
    // ------------------------------------------------------------------------
    vm.saveFromJson = saveFromJson;
    vm.clearFields = clearFields;
    vm.closeDialog = closeDialog;

    // private methods
    // ------------------------------------------------------------------------
    function saveFromKnownFile() {
      $http.get(url).success(function (data, status, headers, config) {
        raw = data;
      }).error(function (data, status, headers, config) {});
    }
    saveFromKnownFile();

    // public methods declaration
    // ------------------------------------------------------------------------
    function saveFromJson(json) {
      json = angular.fromJson(json != undefined ? json : raw);
      skillModel.saveJsons(json).then(function (data) {
        $rootScope.$emit("json", data);
      }, function (error) {});
    }

    function clearFields() {
      vm.json = '';
    }

    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();