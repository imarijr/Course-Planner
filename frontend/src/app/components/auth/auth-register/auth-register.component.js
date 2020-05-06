const authRegister = {
    templateUrl: './auth-register.html',
    controller: function($state, AuthService) {
        const ctrl = this;
        ctrl.$onInit = () => {
            ctrl.error = null;
            ctrl.user = {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            };
        };
        ctrl.createUser = (event) => {
            console.log('event: ', event);
            let user = event.user;
            
            AuthService.register(user).then(function(value) {
                console.log("value returned: ", value); 
                $state.go('home'); 
            })
            .catch(error => {
                console.log("error found..?")
            })
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