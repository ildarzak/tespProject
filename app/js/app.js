//route/
angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view1.html',
            controller: 'PostsCtrl',
            controllerAs: 'Posts'
        })
            .otherwise({redirectTo: '/'})
    });