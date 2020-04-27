
/**
 * @ngdocs directive
 * 
 * @function HomeController
 * 
 * @param {*} $state 
 * @param {*} MajorModel 
 * 
 * @description
 * Home controller for the first page which displays the major options in the dropdown list.
 */

function HomeController($state, MajorModel) {
    var ctrl = this;
      this.$onInit = function () {
      console.log("home controller")
      let majors_list = []
      MajorModel.getMajors().then(function(majors) {
        for (var i = 0; i < majors.length; i++) {
          majors_list.push(majors[i].attributes.majorName)
        }
        ctrl.majors = majors_list;
      })
    }
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);