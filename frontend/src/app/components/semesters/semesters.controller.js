function SemestersController($http, $mdDialog, JSONService, CourseModel, $window) {
    var ctrl = this;
    console.log("semesters controller")

    function populateLists(CourseModel) {
        ctrl.models = {
            selected: null,
            semesters: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: []
            },
            prereqs: {}, // will be key value pair of class name and prereqs list 
            names: {},
            credits: {},
            creditTotal: [0, 0, 0, 0, 0, 0, 0, 0],
            conflictingClasses: []
        };
        // sem 1 
        console.log("populating lists")
        var courses =  CourseModel.getCourseBySem(1).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[1].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[0] += courses[idx].attributes.credits;
            }
        })

        // sem 2 
        courses =  CourseModel.getCourseBySem(2).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[2].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[1] += courses[idx].attributes.credits;
            }
        })

        // sem 3 
        courses =  CourseModel.getCourseBySem(3).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[3].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[2] += courses[idx].attributes.credits;
            }
        })

        // sem 4
        courses =  CourseModel.getCourseBySem(4).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[4].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[3] += courses[idx].attributes.credits;
            }
        })

        // sem 5
        courses =  CourseModel.getCourseBySem(5).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[5].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[4] += courses[idx].attributes.credits;
            }
        })

        // sem 6
        courses =  CourseModel.getCourseBySem(6).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[6].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[5] += courses[idx].attributes.credits;
            }
        })

        // sem 7
        courses =  CourseModel.getCourseBySem(7).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[7].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[6] += courses[idx].attributes.credits;
            }
        })

        // sem 8
        courses =  CourseModel.getCourseBySem(8).then(function(courses) {
            for (var idx=0; idx<courses.length; idx++) {
                var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
                ctrl.models.semesters[8].push(className);
                ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
                ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
                ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
                ctrl.models.creditTotal[7] += courses[idx].attributes.credits;
            }
        })

    }

    function calculateCreditTotalsPrereqs() {
        angular.forEach(ctrl.models.semesters, function (value, key) {
            for (let i=0; i<value.length; i++) {
                ctrl.models.creditTotal[key-1] += ctrl.models.credits[ctrl.models.semesters[key][i]]
            }
        })


        // Connects semester lists for drap and drop
        ctrl.classWarning = false

        ctrl.courseMap = {
            stop: function (e, ui) {
                //reset creditTotals
                console.log("calculating credits")
                ctrl.models.creditTotal = [0, 0, 0, 0, 0, 0, 0, 0]
                ctrl.classWarning = false
                //console.log("Updated Course Map", JSON.stringify(ctrl.models.semesters, undefined, 2))
                var currentClasses = []
                // loop through semesters
                for (let i = 1; i < 9; i++) {
                    length = ctrl.models.semesters[i].length

                    // loop through classes
                    for (let j = 0; j < length; j++) {
                        // calculate new credit totals
                        ctrl.models.creditTotal[i - 1] += ctrl.models.credits[ctrl.models.semesters[i][j]]

                        // make sure that moves get saved to parse - save each class+semester
                        CourseModel.getByName(ctrl.models.semesters[i][j]).then(function(course) {
                            console.log("course back from get by name: ", course)
                            CourseModel.setSemesterDefault(course.id, i).then(function(success) {
                            console.log("success!")
                            });
                        })
                        var prereqs = ctrl.models.prereqs[ctrl.models.semesters[i][j]]
                        if (prereqs != null) {
                            var plength = prereqs.length
                            // loop through prerequisites 
                            for (let m = 0; m < plength; m++) {
                                if (currentClasses.includes(prereqs[m]) == false) {
                                    console.log("breaking a prerequisities rule: ") // if prereq not in "taken" classes
                                    console.log(prereqs[m])
                                    ctrl.classWarning = true
                                    console.log(ctrl.classWarning)
                                }
                            }
                        }
                    }

                    // append on all classes you've taken so far, including this semester
                    for (let k = 0; k < length; k++) {
                        var classnum = ctrl.models.names[ctrl.models.semesters[i][k]]
                        currentClasses.push(classnum)

                    }
                }
                console.log("Credits: ", ctrl.models.creditTotal)
            },
            placeholder: "course",
            connectWith: ".course-list"
        }
    }

    populateLists(CourseModel); 
    calculateCreditTotalsPrereqs(); 
    
    ctrl.addClass = function(event, semester) {
        console.log('semester: ', semester)
        var config = {
            parent: angular.element(document.body),
            controller: AddClassController,
            controllerAs: '$ctrl',
            disableParentScroll: true, 
            templateUrl: './addclass.html',
            hasBackdrop: true, 
            trapFocus: true, 
            clickOutsideToClose: true, 
            escapeToClose: true, 
            focusOnOpen: true,
            fullscreen: true, 
            targetEvent: event
        }

        $mdDialog.show(config)
            .then(answer => {
                console.log('answer: ', answer); 
            })


    function AddClassController($state, $mdDialog, $http, JSONService, CourseModel, $window) {
        var ctrl = this;
        console.log("running controller")
        ctrl.allClasses = []
        CourseModel.getCourses().then(function(courses) {
        console.log('courses: ', courses); 
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].attributes.semesterDefault == null) {
            ctrl.allClasses.push(courses[i])
            console.log(courses[i].attributes.courseName)
            }
        }
        console.log('courses listed...', ctrl.allClasses)
        }).catch(function() {
        console.log("couldn't fetch courses")
        })

        console.log('courses listed...', ctrl.allClasses)

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

        ctrl.addCourseToSemesterWrapper = function(event, course, $window) {
            addCourseToSemester(event, course).then(function(success){
                $mdDialog.cancel(); 
                $window.location.reload();
            })
        }

        //ctrl.addCourseToSemester = function(event, course) {
        function addCourseToSemester(event, course) {
            console.log("starting?")
            CourseModel.getByName(course).then(function(course) {
            console.log('course found. id: ', course.id);
            console.log('sending id to setSemesterDefault')
            CourseModel.setSemesterDefault(course.id, parseInt(semester)).then(function(success) {
                console.log('set new default')
                }).catch(function () {
                    populateLists(CourseModel);
                    console.log('failed to set new default.'); 
                })
            }).catch(function() {
            })
        }
    }
}


    // delete class "controller"
    ctrl.deleteClass = function(event, semester) {
        console.log('semester: ', semester)
        var config = {
            parent: angular.element(document.body),
            controller: DeleteClassController,
            controllerAs: '$ctrl',
            disableParentScroll: true, 
            templateUrl: './deleteclass.html',
            hasBackdrop: true, 
            trapFocus: true, 
            clickOutsideToClose: true, 
            escapeToClose: true, 
            focusOnOpen: true,
            fullscreen: true, 
            targetEvent: event
        }

        $mdDialog.show(config)
            .then(answer => {
                console.log('answer: ', answer); 
            })


    function DeleteClassController($state, $mdDialog, $http, JSONService, CourseModel, $window) {
        var ctrl = this;
        ctrl.allClasses = []
        console.log("semester...? ", semester)
        CourseModel.getCourseBySem(parseInt(semester)).then(function(courses) {
        console.log('courses: ', courses); 
        for (var i = 0; i < courses.length; i++) {
            ctrl.allClasses.push(courses[i])
            console.log(courses[i].attributes.courseName)
        }
        console.log('courses listed...', ctrl.allClasses)
        }).catch(function() {
        console.log("couldn't fetch courses")
        })

        console.log('courses listed...', ctrl.allClasses)

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

        ctrl.addCourseToSemesterWrapper = function(event, course, $window) {
            addCourseToSemester(event, course).then(function(success){
                $mdDialog.cancel(); 
                $window.location.reload();
            })
        }

        //ctrl.addCourseToSemester = function(event, course) {
        ctrl.removeCourseFromSemester = function(event, course) {
            console.log("starting?")
            CourseModel.getByName(course).then(function(course) {
            console.log('course found. id: ', course.id);
            console.log('sending id to setSemesterDefault')
            CourseModel.removeSemesterDefault(course.id).then(function(success) {
                console.log('set new default')
                }).catch(function () {
                    populateLists(CourseModel);
                    console.log('failed to set new default.'); 
                })
            }).catch(function() {
            })
        }
    }    


}
}


angular
    .module('components.semesters')
    .controller('SemestersController', SemestersController);