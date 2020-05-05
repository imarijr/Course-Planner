function authController($state, AuthService) {
    const $ctrl = this;
    console.log("running authLogin controller...")
    $ctrl.$onInit = () => {
        $ctrl.user = {
            email: '',
            password: ''
        };
    };
    $ctrl.validCredentials = false;
    $ctrl.loginUser = (event) => {
        // console.log('event: ', event);
        let user = event.user; 
        AuthService.login(user).then(function(value) {
            console.log("successful login: ", value); 
            $state.go('home'); 
        })
        .catch(error => {
            $ctrl.validCredentials = true;
            console.log("username or password incorrect."); 
        })

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