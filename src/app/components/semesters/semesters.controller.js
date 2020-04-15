function SemestersController($http, JSONService, CourseModel) {
    var ctrl = this;
    console.log("semesters controller")

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
    var courses =  CourseModel.getCourseBySem(1).then(function(courses) {
        for (var idx=0; idx<courses.length; idx++) {
            var className = courses[idx].attributes.courseName;   // ie "Calculus II" 
            ctrl.models.semesters[1].push(className);
            ctrl.models.prereqs[className] = courses[idx].attributes.prerequisites;     // ie ["MATH 10550"]
            ctrl.models.names[className] = courses[idx].attributes.courseId;            // ie "MATH 10560"
            ctrl.models.credits[className] = courses[idx].attributes.credits;           // ie 3
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
        }
    })

    // current credit totals 
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
    
    ctrl.saveSem = function(semester) {
        console.log("semester clicked: ", semester); 
        /* add what we need here once we have the right way to get the semester - will then need to pass it to the add class */ 
    }
  }

angular
    .module('components.semesters')
    .controller('SemestersController', SemestersController);