(function(){
    'use strict';

    angular.module('app').controller('LoginController', Controller);


    Controller.$inject = ['AuthService', '$scope', 'toastr', '$localStorage','$state'];
    function Controller(authService, $scope, $toastr, $local, $state) {

        $scope.login = async function() {
            $scope.loading = true;
            try {
                var loginResponse = await authService.login($scope.user);
                await authService.setCredentials(loginResponse.token);
                
                $toastr.success("Hello, " + $local.user.FName);
                $state.go('container.dashboard');
            } catch (error) {
                console.error(error);
                $toastr.warning(error.statusText);
            }
            $scope.loading = false;
            $scope.$applyAsync();
        }

        init();
        function init() {
            if(!!$local.user) $state.go('container.dashboard'); //redirect to home page if already logged in
        };

    }
})();