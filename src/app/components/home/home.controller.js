// display the major options in the dropdown of home
function HomeController($state, MajorModel) {
//function HomeController($state) {
    var ctrl = this;
      this.$onInit = function () {
      console.log("home controller")
      // ctrl.majors = ['Computer Science', 'Computer Engineering']
      MajorModel.getMajors().then(function(majors) {
        ctrl.majors = majors;
      })
      }
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);