angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('MainCtrl', function($scope, $timeout, Counters) {
  // $scope.background = '../img/wallpaper-full-hd-1080-x-1920-smartphone-vortex-in-space.jpg';

  $scope.timerCount = 0;
  $scope.counters = Counters.all();

  $scope.activeCounter = Counters.getActiveCounter();
  Counters.calculateRemainCounter($scope.activeCounter);

  // console.log(new Date());
  console.log($scope.counters);

  var timer = $timeout(function() { $scope.onTimeout(); }, 1000);

  $scope.onTimeout = function() {
    for (var i = 0; i < $scope.counters.length; i++) {
      Counters.calculateRemainCounter($scope.counters[i]);
    }  

    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    $scope.timerCount += 1;
  };

  $scope.onSwipe = function() {
    $scope.counterSwipe += 1;
  };
})

.controller('NewCtrl', function($scope, $state, Counters) {
  
  $scope.newCounter = {date: new Date(), useDate: false, name:'', color: '#000000'};

  $scope.addCounter = function() {
    Counters.add($scope.newCounter);
    $state.go('app.main'); 
  };

  $scope.backToMain = function() {
    $state.go('app.main'); 
  }; 
})

.controller('EditCtrl', function($scope, $stateParams, $state, Counters) {
  
  $scope.newCounter = Counters.getActiveCounter();
  $scope.newCounter.date = new Date($scope.newCounter.date);

  $scope.addCounter = function() {
    Counters.change($scope.newCounter);
    $state.go('app.main'); 
  };

  $scope.backToMain = function() {
    $state.go('app.main'); 
  }; 
})

.controller('RemoveCtrl', function($scope, $state, Counters) {

  Counters.remove(Counters.getActiveCounter());
  $state.go('app.main'); 
})