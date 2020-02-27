var addclass = {
    templateUrl: './addclass.html',
    controller: 'AddClassController',

}

angular
    .module('components.addclass')
    .component('addclass', addclass)
    .config(function ($stateProvider) {
        $stateProvider.state('addclass', {
            parent: 'app',
            url: 'addclass',
            component: 'addclass'
        })
    })

    