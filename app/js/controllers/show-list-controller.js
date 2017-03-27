//PostsCtrl
angular.module('myApp')
    .controller("PostsCtrl", function ($scope, $http, $locale) {
    $scope.filterOptions = {
        stores: [
            {id: 0, name: 'Все'},
            {id: 1, name: 'Опубликовано'},
            {id: 2, name: 'Модерация'},
            {id: 3, name: 'Внесен аванс'},
            {id: 4, name: 'Черновик'}
        ]
    };
    $scope.status = $scope.filterOptions.stores[0];
    $scope.filterExpression = function (thana) {
        if ($scope.status.id == 0) {
            return thana
        }
        return (thana.status === $scope.status.id );

    };
    $http.get('testObject.json').then(function (response) {
            $scope.posts = response.data.data;
        },
        function (error) {
            console.log(error)
        });
    $locale.NUMBER_FORMATS.GROUP_SEP = ' ';
    $scope.price = 100000;
});