function HomeController($state) {
    var ctrl = this;
      this.$onInit = function () {
      console.log("home controller")
      ctrl.majors = ['Computer Science', 'Computer Engineering']
      }
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);