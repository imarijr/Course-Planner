function AppController($state, AuthService) {
    var ctrl = this;
    ctrl.user = AuthService.getUser(); 
    console.log("app controller")
  }
  
  angular
    .module('common')
    .controller('AppController', AppController);