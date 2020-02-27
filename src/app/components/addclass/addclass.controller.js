function AddClassController($state, $mdDialog, $http) {
    var ctrl = this;

    $http.get('../addClass.json').then((JSONdata) => {
      // all of the json data
      ctrl.classData = JSONdata;
      
      console.log('All Class Data:', JSONdata)
      
      // angular.forEach(ctrl.computerScience, function (value, key) {
      //     ctrl.models.semesters[value.semDefault].push(value.name);

      // });
      console.log(JSONdata.data.major[0])
      console.log("add class controller")

      ctrl.jsonmajors = JSONdata.data.major[0]
      ctrl.majors = []
      angular.forEach(ctrl.jsonmajors, function (value, key) {
        ctrl.majors.push(key)
      })

      ctrl.allClasses = []
      angular.forEach(ctrl.majors, function (key) {
        angular.forEach(ctrl.jsonmajors[key]['courses'][0], function(key) {
          ctrl.allClasses.push(key)
        })
      })

      console.log(ctrl.majors)
      console.log(ctrl.allClasses)

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
    .controller('AddClassController', AddClassController);