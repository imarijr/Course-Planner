function AddClassController($state, $mdDialog, $http, JSONService, CourseModel) {
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

      ctrl.addCourseToSemester = function(event, course) {
        CourseModel.getByName(course.name).then(function(course) {
          console.log('course found. id: ', course.id);
          console.log('sending id to setSemesterDefault')
          CourseModel.setSemesterDefault(course.id, 3).then(function(success) {
            console.log('set new default')
          }).catch(function () {
            console.log('failed to set new default.'); 
          })
        }).catch(function() {
          console.log("could not find course")
        })
      }

  })

  }
  
angular
    .module('components.addclass')
    .controller('AddClassController', AddClassController);