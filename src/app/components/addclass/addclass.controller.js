function AddClassController($state, $mdDialog, $http, JSONService) {
    var ctrl = this;

    JSONService.getClassData().then((JSONdata) => {
      // all of the json data
      ctrl.classData = JSONdata;
      
      console.log('All Class Data:', JSONdata)
      console.log(JSONdata.data.major[0])
      console.log("add class controller")

      // get all the majors in the addClass.json 
      ctrl.jsonmajors = JSONdata.data.major[0]
      ctrl.majors = []
      angular.forEach(ctrl.jsonmajors, function (value, key) {
        ctrl.majors.push(key)
      })

      // go through each of the classes of the major to get the name
      ctrl.allClasses = []
      angular.forEach(ctrl.majors, function (key) {
        angular.forEach(ctrl.jsonmajors[key]['courses'][0], function(key) {
          ctrl.allClasses.push(key)
        })
      })

      console.log(ctrl.majors)
      console.log(ctrl.allClasses)

      // go through each of the classes to get the description of the class
      ctrl.doSecondaryAction = function(event, description) {
          $mdDialog.show(
            $mdDialog.alert()
              .title("Course Description")
              .textContent(description)
              .ok('Ok')
              .targetEvent(event)
          );
        };

  })

  }
  
angular
   .module('components.addclass')
    //.module('components.semesters')
    .controller('AddClassController', AddClassController);