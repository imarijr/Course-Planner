function HomeController($state) {
    var ctrl = this;
    console.log("home controller")
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);