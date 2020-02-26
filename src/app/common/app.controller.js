function AppController($state) {
    var ctrl = this;
    console.log("app controller")
  }
  
  angular
    .module('common')
    .controller('AppController', AppController);