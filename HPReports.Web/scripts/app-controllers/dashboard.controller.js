(function(){
    'use strict';

    angular.module('app').controller('DashboardController', Controller);


    Controller.$inject = ['$scope', '$filter', 'toastr', '$localStorage','$state', '$ngConfirm'];
    function Controller(scope, filter, toastr, local, state, confirm) {

        init();
        function init() {
            
        }
    }
})();