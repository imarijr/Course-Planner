angular.module('app', ['ngMaterial', 'ngRoute', 'ui.sortable']);

//angular.module('app').config(function ($routeProvider, $locationProvider) {
angular.module('app').config(function ($locationProvider) {

    // $locationProvider.hashPrefix('') //

    // $routeProvider
    //     .when('/home', {
    //         templateUrl: 'pages/main.html',
    //         controller: 'MainController'
    //     })
    //     .when('/second', {
    //         templateUrl: 'pages/second.html',
    //         controller: 'second'
    //     })
    //     .otherwise({
    //         templateUrl: 'pages/main.html',
    //         controller: 'MainController'
    //     })
})

// Inline Annotation
angular.module('app').controller('second', ['$scope', "ClassService", function ($scope, ClassService) {

    $scope.models = {
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
        },
        prereqs: {},     // will be key value pair of class name and prereqs list 
        names: {},
        conflictingClasses: []
    };

    ClassService.getCourseData().then((JSONdata) => {
        // all of the json data
        $scope.classData = JSONdata.data.major;
        console.log('All Class Data:', $scope.classData)
        // computer science classes only
        $scope.computerScience = $scope.classData[0].ComputerScience.courses[0]
        console.log('Computer Science Courses:', $scope.computerScience)
        //sort courses by semester
        angular.forEach($scope.computerScience, function (value, key) {
            $scope.models.semesters[value.semDefault].push(value.name);
        });
        console.log('Semesters:', $scope.models.semesters)
        //consolidate prerequisites
        angular.forEach($scope.computerScience, function (value, key) {
            $scope.models.prereqs[value.name] = value.prereqs;
        }); 
        //get class name and number pairs 
        angular.forEach($scope.computerScience, function (value, key) {
           $scope.models.names[value.name] = key
        });
    })

    // Connects semester lists for drap and drop
    $scope.classWarning = false
    $scope.courseMap = {
        stop: function (e, ui) {
            $scope.classWarning = false
            //console.log("Updated Course Map", JSON.stringify($scope.models.semesters, undefined, 2))
            currentClasses = []
            // loop through semesters
            for (let i = 1; i < 9; i++) {
                length = $scope.models.semesters[i].length
                // loop through classes
                for (let j = 0; j < length; j++) {
                    prereqs = $scope.models.prereqs[$scope.models.semesters[i][j]]
                    if (prereqs != null) {
                        plength = prereqs.length
                        // loop through prerequisites 
                        for (let m = 0; m < plength; m++) {
                            if (currentClasses.includes(prereqs[m]) == false) {
                                console.log("breaking a prerequisities rule: ")     // if prereq not in "taken" classes
                                console.log(prereqs[m])
                                $scope.classWarning = true
                                console.log($scope.classWarning)
                            } 
                        }
                    }
                }
                
                // append on all classes you've taken so far, including this semester
                for (let k = 0; k < length; k++) {
                    classnum = $scope.models.names[$scope.models.semesters[i][k]]
                    currentClasses.push(classnum)
                }
            }
        },
        placeholder: "course",
        connectWith: ".course-list"
    };
}]);

function MainController($scope) {

    const majorOptions = {
        majors: ['Computer Science', 'Computer Engineering']
    }
    $scope.majors = majorOptions.majors;

    // save which major chosen in dropdown - called on "go" button press
    $scope.saveMajor = function () {
        $scope.majorLocked = $scope.majorChosen;
    };
}
MainController.$inject = ['$scope']
angular.module('app').controller('MainController', MainController)

function ClassService($http) {

    this.getCourseData = getCourseData
    function getCourseData() {
        
        return $http.get('/data.json')
    }
};
ClassService.$inject = ['$http']
angular.module('app').service('ClassService', ClassService);