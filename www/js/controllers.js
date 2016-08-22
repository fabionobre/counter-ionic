angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  console.log("opa1");
})

.controller('MainCtrl', function($scope) {
  $scope.background = '../img/wallpaper-full-hd-1080-x-1920-smartphone-vortex-in-space.jpg';
})

.controller('NewCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
