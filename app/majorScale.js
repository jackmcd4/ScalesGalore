var module = angular.module('SightSing', ['ngRoute']);

module.controller('MajorController', function ($scope, Major) {
  $scope.scale;

  $scope.findKey = function () {
    console.log($scope.scale);
    Major.key($scope.scale)
      .then(function (data) {
        $scope.scale = data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

module.service('Major', function(){
  var theory = require('node_modules/MUSIC/index.js')
  this.key = function(note){
    var n = Note.fromLatin(note);
    var scale = n.scale('major');
    for(var i = 0; i < scale.length; i++){
      scale[i] = scale[i].frequency();
    }
  return scale;
  }
})

