angular.module('app', ['ngMaterial', 'ngRoute', 'ui.sortable']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('')

    $routeProvider
        .when('/home', {
            templateUrl: 'pages/main.html',
            controller: 'MainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'second'
        })
        .otherwise({
            templateUrl: 'pages/main.html',
            controller: 'MainController'
        })
})

// Inline Annotation
angular.module('app').controller('second', ['$scope', "ClassService", function ($scope, ClassService) {

    $scope.models = {
        selected: null,
        semesters: {
            "1": {courses: [], creditPer: [], creditTot: 0},
            "2": {courses: [], creditPer: [], creditTot: 0},
            "3": {courses: [], creditPer: [], creditTot: 0},
            "4": {courses: [], creditPer: [], creditTot: 0},
            "5": {courses: [], creditPer: [], creditTot: 0},
            "6": {courses: [], creditPer: [], creditTot: 0},
            "7": {courses: [], creditPer: [], creditTot: 0},
            "8": {courses: [], creditPer: [], creditTot: 0}
        }
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
            $scope.models.semesters[value.semDefault].courses.push(value.name);
            $scope.models.semesters[value.semDefault].creditPer.push(value.credits);

        });
        console.log('Semesters:', $scope.models.semesters)
    })

    $scope.getCredit = () => {
            angular.forEach($scope.semesters, function (value, key) {
            $scope.models.semesters[value.semDefault].courses.push(value.name);
            $scope.models.semesters[value.semDefault].creditPer.push(value.credits);

        });
            angular.forEach($scope.models.semesters, function (value, key) {
                
                $scope.models.semesters[key].creditTot = $scope.models.semesters[key].creditPer.reduce((a,b) => {
                    return a+b
                });
            })
        
    }
    // Connects semester lists for drap and drop
    $scope.courseMap = {
        stop: function (e, ui) {
            console.log("Updated Course Map", JSON.stringify($scope.models.semesters, undefined, 2))
        },
        placeholder: "course",
        connectWith: ".course-list",
        
        
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
