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

.controller('FeedCtrl', function($scope, $ionicModal, $ionicLoading, $compile) {
  // No need for testing data anymore
  $scope.follows = [];
  $scope.cards = [
    { hashtag: '#CONCERT' , at: '@CMU', img: 'img/card.png', score: '99'},
    { hashtag: '#CONCERT' , at: '@CMU', img: 'img/card.png', score: '70'}
  ];

  $scope.postsOther = [
    { img: 'img/card.png', hashtag: '#CONCERT' , at: '@CMU', score: '98'},
    { img: 'img/card.png', hashtag: '#CONCERT' , at: '@CMU', score: '97'}
  ];

  $scope.postsMe = [
    { img: 'img/card.png', hashtag: '#a' , at: '@CMU', score: '100'},
    { img: 'img/card.png', hashtag: '#b' , at: '@CMU', score: '99'},
    { img: 'img/card.png', hashtag: '#c' , at: '@CMU', score: '50'}
  ];


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('settings.html', function(modal) {
    $scope.followModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

    // Create and load the Modal
  $ionicModal.fromTemplateUrl('map.html', function(modal) {
    $scope.mapModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('postAll.html', function(modal) {
    $scope.postAllModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('postMe.html', function(modal) {
    $scope.postMeModal = modal;
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

  $scope.openMaps = function() {
    $scope.mapModal.show();
    ionic.Platform.ready($scope.init);
  };

  $scope.closeMaps = function() {
    $scope.mapModal.hide();
  };

  $scope.init = function() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
    };

    // google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide()
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };


    $scope.closeList = function() {
      $scope.postAllModal.hide();
      $scope.postMeModal.hide();
    };

    $scope.filterAll = function() {
      $scope.postMeModal.hide();
      $scope.postAllModal.show();
    };

    $scope.filterMe = function() {
      $scope.postAllModal.hide();
      $scope.postMeModal.show();
    };

});


