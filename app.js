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
angular.module('app').controller('second', ['$scope', '$http', function ($scope, $http) {

    // TODO: MOVE JSON DATA SOURCE TO A SERVICE ()
    const data = {
        american: ['pizza', 'burgers', 'hotdogs'],
        desserts: ['ice cream', 'waffles']
    }
    
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
        }
    };

    $http.get('/data.json').then ((JSONdata) => {
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
        
    })


    // Connects semester lists for drap and drop
    $scope.courseMap = {
        stop: function(e, ui){
            console.log("Updated Course Map", JSON.stringify($scope.models.semesters,undefined,2))
        },
        placeholder: "course",
        connectWith: ".course-list"
    };
}]);

// Explicit dependency injection
function MainController($scope, $http) {
//angular.module('app').controller('MainController', ['$scope', '$http', function ($scope, $http) {

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

    // function readTextFile(file, callback) {
    //     var rawFile = new XMLHttpRequest();
    //     rawFile.overrideMimeType("application/json");
    //     rawFile.open("GET", file, true);
    //     rawFile.onreadystatechange = function () {
    //         if (rawFile.readyState === 4 && rawFile.status == "200") {
    //             callback(rawFile.responseText);
    //         }
    //     }
    //     rawFile.send(null);
    // }

    $http.get('/data.json').then ((JSONdata) => {
        // all of the json data
        $scope.classData = JSONdata.data.major;
        let majorsFound = []
        for (var key in $scope.classData) {
            let jsonstring = JSON.stringify($scope.classData[key])
            let major = jsonstring.split("\"")
            majorsFound.push(major[1])
        }
        $scope.majors = majorsFound;
        console.log($scope.majors)
    })

    // //usage:
    // readTextFile("data.json", function (text) {
    //     var data = JSON.parse(text);
    //     console.log(data);
    //     let majorsFound = []
    //     for (var key in data.major[0]) {
    //         majorsFound.push(key)
    //     }
    //     $scope.majors = majorsFound;
    //     console.log(majorOptions.majors)
    // });

    $scope.saveMajor = function () {
        $scope.majorLocked = $scope.majorChosen;
        console.log($scope.majorLocked)
    };

}
MainController.$inject = ['$scope', '$http']
angular.module('app').controller('MainController', MainController)

// Single Responsibility Principle (SRP)

// Separation of Concerns (SOC)

// Don't Repeat Yourself (DRY)

// Consistent Naming

// Clean code leads to:
// Easier onboarding for new team members (or future self)
// Easier debugging
// Easier to maintain