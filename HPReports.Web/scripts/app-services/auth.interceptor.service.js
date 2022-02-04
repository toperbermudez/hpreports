(function() {
    'use strict';

    angular.module('app').factory('AuthInterceptor', Service);
    Service.$inject = ['$rootScope','$q','AUTH_EVENTS'];
    function Service(root, q, AUTH) {
        var service = {};

        service.responseError = function(response) {
            root.$broadcast({
                401: AUTH.notAuthenticated,
                403: AUTH.notAuthorized
            }[response.status], response);
            return q.reject(response);
        }

        return service;

    }
})();