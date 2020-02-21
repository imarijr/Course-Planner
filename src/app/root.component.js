var root = {
    templateUrl: './root.html'
};

angular
    .module('root', [
        "ui.router"
    ])
    .component('root', root)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/abc',
                component: 'root',
                template: '<div>abcdfajeslfj</div>'
            });
        $urlRouterProvider.otherwise('/')
    }); 

