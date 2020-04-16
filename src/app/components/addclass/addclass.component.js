var semestersAddclass = {
    templateUrl: './addclass.html',
    controller: 'AddClassController',

}

// angular
//     .module('components.addclass')
//     .component('addclass', addclass)
//     .config(function ($stateProvider, $urlRouterProvider) {
//         $stateProvider.state('addclass', {
//             parent: 'semesters',
//             url: 'addclass',
//             component: 'addclass'
//         })
//     //$urlRouterProvider.otherwise('/');
//     })

angular
.module('components.semesters')
.component('semestersAddclass', semestersAddclass)
.config(function ($stateProvider) {
    $stateProvider.state('semestersAddclass', {
        parent: 'semesters',
        url: '/addclass',
        component: 'addclass'
    })
})


    