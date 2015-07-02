'use strict';

angular.module('urcApp')
  .controller('RoomCtrl', function ($scope, $stateParams, $http, $location, socket) {
    $scope.room = {};
    $scope.comments = [];
    $scope.attendees = [];
    $scope.tips = [
      {keyword: '豊富秀吉', content:'大阪城作って天下統一したよ〜'},
      {keyword: '織田信長', content:'髑髏で酒飲んでドン引きされたよ〜'},
      {keyword: '徳川家康', content:'たぬきっていうな〜'}
    ];
    $scope._comment = {
      text: '',
      room: $stateParams.id
    };

    // 関数名　　： addComment()
    // 機能　　　： 新規にroomドキュメントを1件作成する
    $scope.addComment = function() {
      if($scope._comment.text === ''){
        return;
      }
      $http.post('/api/comments/create', $scope._comment)
      .success(function(comment){
        $scope._comment.text = '';
      });
    };




    // ================================================
    // 　以下よりメインフロー
    // ================================================

    socket.join($stateParams.id)

    // 関数名　　： なし
    // 機能　　　： パラメータで指定したroomのattendeesメンバに自分を追加する
    $http.put('/api/rooms/join/'+ $stateParams.id)
    .success(function(room){
    });

    // 関数名　　： なし
    // 機能　　　： パラメータで指定したroomドキュメントを1件取得する
    $http.get('/api/rooms/show/'+ $stateParams.id)
    .success(function(room){
      $scope.room = room;
    })
    .error(function(){
      $location.path('/');
    });


    // 関数名　　： なし
    // 機能　　　： 最新のcommentドキュメントを10件取得する
    $http.get('/api/comments/search?room='+ $stateParams.id)
    .success(function(comments){
      $scope.comments = comments;
      socket.syncUpdates('comment', $scope.comments);
    });


    // 関数名　　： なし
    // 機能　　　： 立ち去ろうとすると警告をだす. OKボタンを押すとleave APIを叩く.
    $scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("このチャットルームから出ますか？")
      if (!answer) {
        event.preventDefault();
      } else{
        $http.put('/api/rooms/leave/'+ $stateParams.id)
        socket.leave($stateParams.id);
      }
    });

  });
