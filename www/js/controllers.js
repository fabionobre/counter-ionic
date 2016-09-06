angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Counters) {
  $scope.counters = Counters.all();
})

.controller('MainCtrl', function($scope, $timeout, Counters) {
  
  Counters.calculateRemainCounter($scope.activeCounter);
  console.log($scope.counters);
  // $scope.background = '../img/wallpaper-full-hd-1080-x-1920-smartphone-vortex-in-space.jpg';

  var timer = $timeout(function() { $scope.onTimeout(); }, 1000);

  $scope.onTimeout = function() {
    for (var i = 0; i < $scope.counters.length; i++) {
      Counters.calculateRemainCounter($scope.counters[i]);
    }  

    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    $scope.timerCount += 1;
  };

  $scope.onSwipe = function() {
    console.log("ok");
    Counters.getNextCounter();
  };

  $scope.activeCounter = function() {   
    return Counters.getActiveCounter();
  };  
})

.controller('NewCtrl', function($scope, $state, Counters) {
  
  $scope.newCounter = {date: new Date(), useDate: false, name:'', color: '#000000', time: new Date()};

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