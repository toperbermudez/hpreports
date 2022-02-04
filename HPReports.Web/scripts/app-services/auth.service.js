(function() {
    'use strict';

    angular.module('app').factory('AuthService', Service);
    Service.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', 'USER_ROLES', 'API', '$state', '$q'];
    function Service($http, $local, $serialize, $ROLES, $API, $state, $q) {
        var service = {};

        service.login = function(user) {
            //get and store token
            var data = $serialize({ username: user.id, password: user.pass, grant_type: 'password' });
            return $q(function (resolve, reject) {
                $http.post($API + "token", data)
                .then(function(response) {
                    if(response.data != null) {
                        resolve({ success: true, token: response.data.access_token });
                    } else {
                        reject({statusText: "Login failed."});    
                    }
                }, function(err) {
                    reject(err);
                });
            });

        }

        service.logout = function() {
            $http.defaults.headers.common.Authorization = undefined;
            $local.$reset();
            $state.go('login');
        }

        service.isAuthenticated = function() {
            return !!$local.user;
        }

        service.isAuthorized = function(authorizedRoles) {
            return !!(authorizedRoles.indexOf($ROLES.all)!=-1 || authorizedRoles.indexOf($local.user.Role) != -1);
        }

        service.setCredentials = function(token) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            return $q(function (resolve, reject) {
                $http.get($API + "api/currentuser/info")
                .then(function(response) {
                    $local.user = response.data;
                    $local.token = token;
                    resolve();
                }, function(err) {
                    reject(err);
                }); 
            });
        }

        return service;

    }
})();