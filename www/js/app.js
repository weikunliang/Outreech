// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('home', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

angular.module('home', ['ionic'])

.controller('FeedCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.follows = [];
  $scope.cards = [
    { hashtag: '#CONCERT' , at: '@CMU', img: 'img/card.png'},
    { hashtag: '#CONCERT' , at: '@CMU', img: 'img/card.png'}
  ];



  // Create and load the Modal
  $ionicModal.fromTemplateUrl('settings.html', function(modal) {
    $scope.followModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createFollow = function(follow) {
    $scope.follows.push({
      title: follow.title
    });
    follow.title = "";
  };

  $scope.deleteFollow = function(follow) {
    var index = $scope.follows.indexOf(follow);
    if (index > -1) {
      $scope.follows.splice(index, 1);
    }
  };

  // Open our new task modal
  $scope.newFollow = function() {
    $scope.followModal.show();
  };

  // Close the new task modal
  $scope.closeFollow = function() {
    $scope.followModal.hide();
  };
});