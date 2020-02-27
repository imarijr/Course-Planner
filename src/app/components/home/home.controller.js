function HomeController($state) {
    var ctrl = this;
    console.log("home controller")
    ctrl.majors = ['Computer Science', 'Computer Engineering']
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);