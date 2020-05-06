function AppController($state, AuthService) {
    var ctrl = this;
    ctrl.user = AuthService.getUser(); 
    ctrl.logout = function() {
      AuthService.logout().then(function () {
        console.log("called logout function")
        $state.go('auth.login'); 
      }); 
    }; 
    console.log("app controller")
    if (ctrl.user == null) {
      $state.go('auth.login')
    }
  }
  
  angular
    .module('common')
    .controller('AppController', AppController);