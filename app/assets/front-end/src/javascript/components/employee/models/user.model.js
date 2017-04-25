(() => {

  'use strict';

  angular
    .module('HRA')
    .factory('User', User);

  User
    .$inject = ['$resource', 'apiUrl', 'alertService', '$stateParams'];

  function User($resource, apiUrl, alertService, $stateParams) {

    function User() {}


    let url = '';
    let promise = null;
    let resource = null;
    let model = 'User';


    User.save = (data) => {
      url = apiUrl + '/users/new';
      resource = $resource(url, {}, {
        'post': {
          method: 'POST'
        }
      }).save(data);

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'save');
          return data;
        }).catch(() => alertService.error(model, 'save'));

      return promise;
    };

    User.update = (data) => {
      url = apiUrl + '/users/:id';
      resource = $resource(url, {}, {
        'update': { method: 'PUT' }
      }).update({ id: data.id }, data);

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'update');
          return data;
        })
        .catch(() => alertService.error(model, 'update'));

      return promise;
    };

    User.getById = (id) => {
      url = apiUrl + '/users/:id';
      resource = $resource(url).get({ id: id });

      promise = resource.$promise
        .then(data => data)
        .catch(() => alertService.error(model, 'getById'));
      return promise;
    };

    User.getAll = () => {
      url = apiUrl + '/users';
      resource = $resource(url, {}, {
        'get': {
          method: 'GET',
          isArray: false
        }
      }).get();

      promise = resource.$promise
        .then(data => data.items)
        .catch(() => alertService.error(model, 'getAll'));

      return promise;
    };

    User.remove = (id) => {
      url = apiUrl + '/users/:id';
      resource = $resource(url).delete({ id: id });

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'remove');
          return data;
        })
        .catch(() => alertService.error(model, 'remove'));

      return promise;
    };


    User.getSchedule = () => {
      var userId = $stateParams.id;
      url = apiUrl + '/users/'+userId+'/schedule';
      resource = $resource(url).get();

      promise = resource.$promise
        .then(data => data)
        .catch(() => alertService.error(model, 'getSchedule'));
      return promise;
    };

    User.updateSchedule = (id, schedule) => {
      url = apiUrl + '/users/:id/schedule/:idSchedule';
      resource = $resource(url, {}, {
        'update': { method: 'PUT' }
      }).update({ id: id, idSchedule: schedule.id }, schedule);

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'update');
          return data;
        })
        .catch(() => alertService.error(model, 'update'));

      return promise;
    };


    User.getPosition = (user) => {
      // TODO:  Something is wrong with this one in api
      url = apiUrl + '/users/:id/position';
      resource = $resource(url, {}, {
        'get': {
          method: 'GET',
          isArray: false
        }
      }).get({ id: user.id });

      promise = resource.$promise
        .then(data => data)
        .catch(() => alertService.error(model, 'getPosition'));

      return promise;
    };

    User.updatePosition = (user, position) => {
      url = apiUrl + '/users/:id/position';
      resource = $resource(url, {}, {
        'update': { method: 'PUT' }
      }).update({ id: user.id }, { position_id: position.id });

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'updatePosition');
          return data;
        })
        .catch(() => alertService.error(model, 'updatePosition'));

      return promise;
    };

    User.getDevices = () => {

    };

    User.updateDevices = () => {

    };

    User.removeDevices = () => {

    };

    /*TODO: To create a component Language and to add this to the language model*/
    User.getLanguages = () => {
      url = apiUrl + '/languages';
      resource = $resource(url, {}, {
        'get': {
          method: 'GET',
          isArray: false
        }
      }).get();

      promise = resource.$promise
        .then(data => data.items)
        .catch(() => alertService.error(model, 'getLanguages'));

      return promise;
    };

    User.getUserLanguages = (user) => {
      url = apiUrl + '/users/:id/languages';
      resource = $resource(url).get({ id: user.id });
      promise = resource.$promise
        .then(data => data.items)
        .catch(() => alertService.error(model, 'getUserLanguages'));

      return promise;
    };

    User.updateLanguages = (user, languages) => {
      let languageIds = languages.map(language => language.id);
      url = apiUrl + '/users/:id/languages';
      resource = $resource(url, {}, {
        'update': { method: 'PUT' }
      }).update({ id: user.id }, { language_ids: languageIds });

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'updateLanguages');
          return data;
        })
        .catch(() => alertService.error(model, 'updateLanguages'));

      return promise;
    };

    User.removeLanguages = (user, languages) => {
      let data = {};
      data.language_ids = languages.map(language => language.id);
      url = apiUrl + '/users/:id/languages';
      resource = $resource(url, data).delete({ id: user.id });
      
      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'removeLanguages');
          return data;
        })
        .catch(() => alertService.error(model, 'removeLanguages'));

      return promise;
    };



    User.getEducations = (id) => {
      url = apiUrl + '/users/:id/educations';
      resource = $resource(url).get({ id: id });

      promise = resource.$promise
        .then(data => data.items)
        .catch(() => alertService.error(model, 'getEducations'));
      return promise;
    };

    User.updateEducations = () => {

    };

    User.removeEducations = (id,education) => {
      url = apiUrl + '/users/:id/educations';
      resource = $resource(url, education).delete({ id: id });

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'remove');
          return data;
        })
        .catch(() => alertService.error(model, 'remove'));

      return promise;
    };


    User.getProjects = () => {

    };

    User.updateProjects = () => {

    };

    User.removeProjects = () => {

    };


    User.getHolidays = () => {

      let userId= $stateParams.id;
      url = apiUrl + '/users/'+userId+'/holidays';
      resource = $resource(url).query();

      promise = resource.$promise
        .then(data => data)
        .catch(() => alertService.error(model, 'getUserHolidays'));

      return promise;
    };

    User.addHolidays = (data) => {
      let userId= $stateParams.id;
      url = apiUrl + '/users/'+userId+'/holidays';
      resource = $resource(url, {}, {
        'post': {
          method: 'POST'
        }
      }).save(data);

      promise = resource.$promise
        .then((data) => {
          alertService.success(model, 'save');
          return data;
        }).catch(() => alertService.error(model, 'save'));

      return promise;
    };

    User.removeHolidays = () => {

    };

    return User;

  }

})();
