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
      ctrl.doSecondaryAction = function(event) {
          $mdDialog.show(
            $mdDialog.alert()
              .title("Course Description")
              .textContent(JSONdata.data.major[0].Economocis.courses[0]['ECON 10011'].description)
              .ok('Neat!')
              .targetEvent(event)
          );
        };

  })

  }
  
angular
    .module('components.addclass')
    .controller('AddClassController', AddClassController);