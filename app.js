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
angular.module('app').controller('second', ['$scope', function ($scope) {

    // TODO: MOVE JSON DATA SOURCE TO A SERVICE ()
    const data = {
        american: ['pizza', 'burgers', 'hotdogs'],
        desserts: ['ice cream', 'waffles']
    }
    $scope.data = data;

    // Connects semester lists for drap and drop
    $scope.courseMap = {
        placeholder: "course",
        connectWith: ".course-list"
    };

    // Place holder course data
    $scope.models = {
        selected: null,
        semesters: {
            "1": ["Calculus I", "Logic", "Physics"],
            "2": ["Math", "Modern Web Development", "Physics"],
            "3": ["Physics 2", "Data Structures", "Logic", "Physics"],
            "4": ["Math", "Logic", "Physics"],
            "5": ["Math", "Logic", "Physics"],
            "6": ["Math", "Design", "Physics"],
            "7": ["Math", "Logic", "Physics"],
            "8": ["Math", "Logic", "Physics"]
        }
    };


}]);

// Explicit dependency injection
function MainController($scope) {
    const data = {
        american: ['pizza', 'burgers', 'hotdogs'],
        desserts: ['ice cream', 'waffles']
    }
    $scope.data = data;
    $scope.classes = [{
            name: 'abc',
            taken: 'abc@gmail.com'
        },
        {
            name: 'xyz',
            taken: 'xyz@gmail.com'
        },
        {
            name: 'pqr',
            taken: 'pqr@gmail.com'
        },
        {
            name: 'rs',
            taken: 'rs@gmail.com'
        }
    ];
    const majorOptions = {
        majors: ['Computer Science', 'Computer Engineering']
    }
    //$scope.majors = majorOptions.majors;

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    //usage:
    readTextFile("data.json", function (text) {
        var data = JSON.parse(text);
        console.log(data);
        let majorsFound = []
        for (var key in data.major[0]) {
            majorsFound.push(key)
        }
        $scope.majors = majorsFound;
        console.log(majorOptions.majors)
    });

    $scope.saveMajor = function () {
        $scope.majorLocked = $scope.majorChosen;
        console.log($scope.majorLocked)
    };

}
MainController.$inject = ['$scope']
angular.module('app').controller('MainController', MainController)

// Single Responsibility Principle (SRP)

// Separation of Concerns (SOC)

// Don't Repeat Yourself (DRY)

// Consistent Naming

// Clean code leads to:
// Easier onboarding for new team members (or future self)
// Easier debugging
// Easier to maintain