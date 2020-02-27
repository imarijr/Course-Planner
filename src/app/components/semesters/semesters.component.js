var semesters = {
    templateUrl: './semesters.html',
    controller: 'SemestersController',

}

angular
    .module('components.semesters')
    .component('semesters', semesters)
    .config(function ($stateProvider) {
        $stateProvider.state('semesters', {
            parent: 'app',
            url: 'semesters',
            component: 'semesters'
        })
    })

    