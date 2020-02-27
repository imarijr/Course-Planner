function SemestersController($http, $state) {
    var ctrl = this;
    console.log("semesters controller")


    ctrl.models = {
        selected: null,
        semesters: {
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": []
        }
    };
    
    $http.get('../data.json').then((JSONdata) => {
        // all of the json data
        ctrl.classData = JSONdata;
        
        console.log('All Class Data:', JSONdata)
        // computer science classes only
        ctrl.computerScience = ctrl.classData[0].ComputerScience.courses[0]
        console.log('Computer Science Courses:', ctrl.computerScience)
        //sort courses by semester
        angular.forEach(ctrl.computerScience, function (value, key) {
            ctrl.models.semesters[value.semDefault].push(value.name);

        });
        console.log('Semesters:', ctrl.models.semesters)

    })

    // Connects semester lists for drap and drop
    ctrl.courseMap = {
        stop: function (e, ui) {
            console.log("Updated Course Map", JSON.stringify(ctrl.models.semesters, undefined, 2))
        },
        placeholder: "course",
        connectWith: ".course-list"
    };

    

        ctrl.getCourseData = getCourseData
        function getCourseData(){
            return this.$http.get('../../../data.json')
        }
    
    

  }

angular
    .module('components.semesters')
    .controller('SemestersController', SemestersController);