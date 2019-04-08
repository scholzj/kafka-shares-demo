var app = angular.module('myApp', ["ngTable","ngResource","ngDialog"]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q,$rootScope) {
        return {
            'responseError': function (responseError) {
                $rootScope.loading = false;
                $rootScope.message = responseError.data.message;
                return $q.reject(responseError);
            }
        };
    });
}]);

app.controller('mainCtrl', function($scope,$interval,NgTableParams,$resource,ngDialog,$rootScope) {
    $rootScope.loading = false;
    $scope.positions = $resource("portfolioviewer/");

    $scope.tableParams = new NgTableParams({
            page: 1,
            count: 9999,
            noPager: true
        }, {
            counts: [],
            total: 1,
            getData: function(params) {
                /*var queryParams = {page:params.page()-1 , size:params.count()};
                var sortingProp = Object.keys(params.sorting());
                if(sortingProp.length == 1){
                    queryParams["sort"] = sortingProp[0];
                    queryParams["sortDir"] = params.sorting()[sortingProp[0]];
                }
                return $scope.addresses.query(queryParams, function(data, headers) {
                    var totalRecords = headers("PAGING_INFO").split(",")[0].split("=")[1];
                    params.total(totalRecords);
                    console.log(params.total());
                    return data;
                }).$promise;*/

                return $scope.positions.query(function(data) {
                    return data;
                }).$promise;
            }
        });

    $scope.reload = $interval(function() {$scope.tableParams.reload()}, 5000);
});