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
            
            // let newUser = AuthService.register(user);
            // console.log("new user created: ", newUser); 
            // console.log("newUser.$$state.value: ", newUser.$$state.value); 
            // if (newUser.$$state.status == 1) {  // successfully created
            //     $state.go('auth.login'); 
            //     console.log("successfully created user.")
            // }
            AuthService.register(user).then(function(value) {
                console.log("value returned: ", value); 
                $state.go('auth.login'); 
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