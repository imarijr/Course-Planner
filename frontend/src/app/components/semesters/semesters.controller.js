/**
 * @ngdoc directive 
 * 
 * @function SemestersController
 * 
 * @param {*} $http 
 * @param {*} $mdDialog 
 * @param {*} JSONService 
 * @param {*} CourseModel 
 * @param {*} $window 
 * 
 * @description
 * The semesters controller is used for the semesters page. 
 */

function SemestersController($http, $mdDialog, JSONService, CourseModel, $window) {
    var ctrl = this;
    console.log("semesters controller")

    /**
     * @ngdoc directive
     * @function populateLists 
     * @param {*} CourseModel
     * 
     * @description
     * This function is used to generate all 8 semesters on the semesters page. For each semester, if a class' 
     * default semester is set to that specific semester the class gets added to that semester.
     */

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

    /**
     * @ngdoc directive
     * 
     * @function calculateCreditTotalsPrereqs
     * 
     * @description
     * This function is used to check if there are too many classes in a semester (goes over credit maximum) and all prereqs are satisfied.
     */

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


    /**
     * @ngdoc directive
     * 
     * @function AddClassController
     * 
     * @param {*} $state 
     * @param {*} $mdDialog 
     * @param {*} $http 
     * @param {*} JSONService 
     * @param {*} CourseModel 
     * @param {*} $window 
     * 
     * @description
     * This function acts as the add class controller (which is no loner its own page, but a popup). When the add class button is clicked,
     * all the classes that do not have a default semester populate the dialogue window. When a class gets added, once the data is returned from 
     * the db, the popup closes and the page refreshes to reflect the updated semester view.
     */

    function AddClassController($state, $mdDialog, $http, JSONService, CourseModel, $window) {
        var ctrl = this;
        console.log("running controller")
        ctrl.allClasses = []
        let classesFound = []
        CourseModel.getCourses().then(function(courses) {
        console.log('courses: ', courses); 
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].attributes.semesterDefault == null) {
            classesFound.push(courses[i])
            console.log(courses[i].attributes.courseName)
            }
        }

        // sort array alphabetically 
        ctrl.allClasses = classesFound.sort();
        ctrl.allClasses.sort((a, b) => (a.attributes.courseId > b.attributes.courseId) ? 1 : -1)
        console.log("here??????")
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

        ctrl.addCourseToSemester = function(event, course) {
            CourseModel.getByName(course).then(function(course) {
                console.log('sending id to setSemesterDefault')
                CourseModel.setSemesterDefault(course.id, parseInt(semester)).then(function(success) {
                    console.log('set new default')
                }).catch(function () {
                    populateLists(CourseModel);
                    console.log('failed to set new default.'); 
                })
                
                $mdDialog.cancel().then(function() {
                    console.log("successfully closed.")
                    $state.reload();
                }).catch(function () {
                    console.log("failed to close.");
                })

            }).catch(function() {
                console.log()
                console.log('failed to get class')
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


        /**
         * @ngdoc directive
         * 
         * @function DeleteClassController
         * 
         * @param {*} $state 
         * @param {*} $mdDialog 
         * @param {*} $http 
         * @param {*} JSONService 
         * @param {*} CourseModel 
         * @param {*} $window 
         * 
         * @description
         * This function acts as the delete class controller, which now generates each class in a semester on a popup. If the delete button is 
         * clicked, the semester default value is set to null in the database. Once the process from the db is returned the popup closes and 
         * the page refreshes with the updated semester list.
         */
        
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
        
            ctrl.removeCourseFromSemester = function(event, course) {
                CourseModel.getByName(course).then(function(course) {
                    console.log('sending id to setSemesterDefault')
                    CourseModel.removeSemesterDefault(course.id).then(function(success) {
                        console.log('set new default')
                    }).catch(function () {
                        populateLists(CourseModel);
                        console.log('failed to set new default.'); 
                    })
        
                    $mdDialog.cancel().then(function() {
                        console.log("closed popup");
                        $state.reload();
                    }).catch(function () {
                        console.log("failed to close");
                    })
        
                }).catch(function() {
                    console.log()
                    console.log('failed to get class')
                })
            }
        }    
    }
}

angular
    .module('components.semesters')
    .controller('SemestersController', SemestersController);