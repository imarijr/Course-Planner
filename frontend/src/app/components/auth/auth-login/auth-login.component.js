function authController($state, AuthService) {
    const ctrl = this;
    console.log("running authLogin controller...")
    ctrl.$onInit = () => {
        ctrl.user = {
            email: '',
            password: ''
        };
    };
    ctrl.loginUser = (event) => {
        console.log('event: ', event);
    } 
}

const authLogin = {
    templateUrl: './auth-login.html',
    controller: authController
};

angular
    .module('components.auth')
    .component('authLogin', authLogin)
    .config(($stateProvider, $urlRouterProvider) => {
            $stateProvider
            .state('auth', {
                redirectTo: 'auth.login',
                url: '/auth',
                template: '<div ui-view></div>'
            })
            .state('auth.login', {
                url: '/login',
                component: 'authLogin'
            });
            $urlRouterProvider.otherwise('/auth/login')
        });