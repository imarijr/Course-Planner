// display the major options in the dropdown of home
function HomeController($state, MajorModel) {
//function HomeController($state) {
    var ctrl = this;
      this.$onInit = function () {
      console.log("home controller")
      // ctrl.majors = ['Computer Science', 'Computer Engineering']
      let majors_list = []
      MajorModel.getMajors().then(function(majors) {
        for (var i = 0; i < majors.length; i++) {
          majors_list.push(majors[i].attributes.majorName)
        }
        ctrl.majors = majors_list;
      })
      //console.log(MajorModel.getById('1ZCcvgo8N6'))
    }
  }


angular
    .module('components.home')
    .controller('HomeController', HomeController);