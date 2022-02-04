(function(){
    'use strict';

    angular.module('app').controller('MainController', Controller);


    Controller.$inject = ['AuthService', '$scope', 'toastr', '$localStorage','$state','AUTH_EVENTS', 'USER_ROLES'];
    function Controller(authService, $scope, $toastr, $local, $state, $AUTH, $ROLES) {

        $scope.$on($AUTH.notAuthenticated, function(event) {
            authService.logout();
        });

        $scope.logout = function() {
            authService.logout();
        }

        init();
        function init() {
            $scope.user = $local.user;
            $scope.Roles = $ROLES;
        };

    }
})();