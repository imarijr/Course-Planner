var home = {
    templateUrl: './home.html',
    controller: 'HomeController',

}

angular
    .module('components.home')
    .component('home', home)
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: 'home',
            component: 'home'
        })
    $urlRouterProvider.otherwise('/');
    }); 

    