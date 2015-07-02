'use strict';

angular.module('urcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('room', {
        url: '/room/:id',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl',
        authenticate: true
      })
  });
