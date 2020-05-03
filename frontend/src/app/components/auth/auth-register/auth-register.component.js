const authRegister = {
    templateUrl: './auth-register.html',
    controller: function($state, AuthService) {
        const ctrl = this;
        ctrl.$onInit = () => {
            ctrl.error = null;
            ctrl.user = {
                firstName: '',
                lastName: '',
                password: ''
            };
        };
        ctrl.createUser = (event) => {
            console.log('event: ', event);
        }
    }
};

angular
    .module('components.auth')
    .component('authRegister', authRegister)
    .config(($stateProvider) => {
        $stateProvider.state('auth.register', {
            url: '/register',
            component: 'authRegister'
        });
    });