angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('MainCtrl', function($scope, $timeout, Counters) {
  // $scope.background = '../img/wallpaper-full-hd-1080-x-1920-smartphone-vortex-in-space.jpg';

  $scope.timerCount = 0;
  $scope.counters = Counters.all();

  console.log($scope.counters);

  var timer = $timeout(function() { $scope.onTimeout(); }, 1000);

  $scope.onTimeout = function() {
    for (var i = 0; i < $scope.counters.length; i++) {
      Counters.calculateRemainCounter($scope.counters[i]);
    }  

    timer = $timeout(function() { $scope.onTimeout();}, 1000);
    $scope.timerCount += 1;
  };

  $scope.swiperOptions = {
    effect: 'slide',
    initialSlide: 0,
    onInit: function(swiper){
      $scope.swiper = swiper;
    },
    onSlideChangeEnd: function(swiper){
      console.log('The active index is ' + swiper.activeIndex); 
    }
  };

  $scope.edit = function() {
    console.log($scope.swiper.activeIndex);
  };

  $scope.remove = function() {
    console.log($scope.swiper.activeIndex);
  };
})

.controller('NewCtrl', function($scope, $state, Counters) {
  
  $scope.newCounter = {date: new Date(), useDate: false, name:'', color: '#000000'};

  $scope.addCounter = function() {
    Counters.add($scope.newCounter);
    $state.go('app.main'); 
  };
})

.controller('EditCtrl', function($scope, $stateParams, $state, Counters) {
  
  $scope.newCounter = Counter.get($stateParams.id);

  $scope.addCounter = function() {
    Counters.chnage($scope.newCounter);
    $state.go('app.main'); 
  };
})

