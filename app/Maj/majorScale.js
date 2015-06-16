angular.module('SightSing.major', [])

.controller('MajorController', function ($scope, $window, $location, Major) {
  $scope.scale;

  $scope.findKey = function () {
    console.log($scope.user);
    Major.key($scope.user)
      .then(function (data) {
        $scope.scale = data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});