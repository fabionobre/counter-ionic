angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('MainCtrl', function($scope, $timeout) {
  // $scope.background = '../img/wallpaper-full-hd-1080-x-1920-smartphone-vortex-in-space.jpg';

  $scope.timerCount = 0;

  var timer = $timeout(function() { $scope.onTimeout(); }, 1000);

  $scope.onTimeout = function() {
    // timer = $timeout(function() { $scope.onTimeout();}, 1000);
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
})

.controller('NewCtrl', function($scope, Counters) {
  
  $scope.newCounter = {date: new Date(), useDate: false};
  $scope.qntDias = 0;
  $scope.qntHours = 0;
  $scope.qntMinutes = 0;

  $scope.updateCounter = function() {

    $scope.newCounter.date.setHours(0,0,0,0);
    Counters.calculateRemainCounter($scope.newCounter);
  };

  $scope.now = function() {
    return new Date();
  }; 
})
