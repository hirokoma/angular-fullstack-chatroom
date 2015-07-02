'use strict';

angular.module('urcApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.rooms = [];
    $scope._room = {
      name: ''
    };

    // 関数名　　： addRoom()
    // 機能　　　： 新規にroomドキュメントを1件作成する
    $scope.addRoom = function() {
      if($scope._room.name === ''){
        return;
      }
      $http.post('/api/rooms/create', $scope._room)
      .success(function(room){
        $scope._room.name = '';
      });

    };

    // ================================================
    // 　以下よりメインフロー
    // ================================================

    // 関数名　　： なし
    // 機能　　　： 最新のroomドキュメントを10件取得する
    $http.get('/api/rooms/search').success(function(rooms) {
      $scope.rooms = rooms;
      socket.syncUpdates('room', $scope.rooms);
    });

    // 関数名　　： なし
    // 機能　　　： 通信を切るとwebsocketの同期を解除する
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('room');
    });

  });
