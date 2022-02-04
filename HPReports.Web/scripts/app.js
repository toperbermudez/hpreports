(function () {
    //init ag-grid plugin-----------------------
    agGrid.initialiseAgGridWithAngular1(angular);
    angular
        .module("app", ['ui.router', 'ngAnimate', 'ngMessages', 'ngStorage', 'toastr', 'cp.ngConfirm','ui.bootstrap', 'agGrid', 'angularMoment', 'ngNumeraljs'])
        .run(run)
        .config(config)
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
          })
        .constant('USER_ROLES', {
            all: '*',
            admin: 'ADMIN',
            user: 'USER',
            guest: 'GUEST'
          })
        .constant('CONFIG', {
            get: { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
            post: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        })
        .config(interceptor)
        //.constant('BASE_PATH', 'http://192.171.10.51:84/ORMonitoringAPI/');
        .constant('API', 'http://localhost:61592/');

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES']
    function config($stateProvider, $urlRouterProvider, ROLES) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('container', {
                url: '',
                templateUrl: 'views/container.view.html',
                controller: 'MainController',
                abstract: true,
            })
            .state('container.dashboard', {
                url: '/',
                templateUrl: 'views/dashboard.view.html',
                // controller: 'DashboardController',
                data: { 
                    authorizedRoles: [ROLES.all]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.view.html',
                controller: 'LoginController',
                data: { 
                    authorizedRoles: [ROLES.all]
                }
            });
    }

    run.$inject = ['$rootScope', 'AuthService', '$transitions','AUTH_EVENTS', 'toastr']
    function run(root, as, transitions, AUTH, toastr) {
        transitions.onStart({}, function(transition) {
            var publicPages = ['login'];
            if(!as.isAuthenticated() && publicPages.indexOf(transition.to().name) === -1)  {
                toastr.warning('Please login.');
                root.$broadcast(AUTH.notAuthenticated);
                return false;
            } else if(as.isAuthenticated()  && !as.isAuthorized(transition.to().data.authorizedRoles))  {
                toastr.warning('Access denied');
                root.$broadcast(AUTH.notAuthorized);
                return false;
            }
        });
    }

    interceptor.$inject = ['$httpProvider'];
    function interceptor(provider) {
        provider.interceptors.push('AuthInterceptor');
    }
})();