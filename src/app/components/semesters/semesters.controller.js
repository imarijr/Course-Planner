function SemestersController($http, JSONService) {
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
        },
        prereqs: {}, // will be key value pair of class name and prereqs list 
        names: {},
        credits: {},
        creditTotal: [0, 0, 0, 0, 0, 0, 0, 0],
        conflictingClasses: []
    };
    
    JSONService.getSemesterData().then((JSONdata) => {
        // all of the json data
        ctrl.classData = JSONdata.data.major;
        
        console.log('All Class Data:', ctrl.classData)
        // computer science classes only
        ctrl.computerScience = ctrl.classData[0].ComputerScience.courses[0]
        console.log('Computer Science Courses:', ctrl.computerScience)
        //sort courses by semester
        angular.forEach(ctrl.computerScience, function (value, key) {
            ctrl.models.semesters[value.semDefault].push(value.name);
        });
        console.log('Semesters:', ctrl.models.semesters)
        //consolidate prerequisites
        angular.forEach(ctrl.computerScience, function (value, key) {
            ctrl.models.prereqs[value.name] = value.prereqs;
        });
        //get class name and number pairs 
        angular.forEach(ctrl.computerScience, function (value, key) {
            ctrl.models.names[value.name] = key
            ctrl.models.credits[value.name] = value.credits
        });
        // Initial Credit Count per semester
        angular.forEach(ctrl.models.semesters, function (value, key) {
            for (let i = 0; i < value.length; i++) {
                ctrl.models.creditTotal[key - 1] += ctrl.models.credits[ctrl.models.semesters[key][i]]
            }
        })

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