'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// エンドポイント名　　： GET /api/rooms/search
// 機能　　　　　　　　： roomドキュメントを検索して返す
// ユーザ認証　　　　　： 不要
// パラメータ
// 　- q           ：【任意】検索クエリ."+"区切りで最大5つ指定可能.
// 　- count       ：【任意】検索する最大件数. 最大値は100. デフォルト値は10.
// 　- since       ：【任意】YYYMMDDで指定した時刻以降のドキュメントを検索する.
// 　- until       ：【任意】YYYMMDDで指定した時刻以前のドキュメントを検索する.
router.get('/search', controller.search);


// エンドポイント名　　： GET /api/rooms/show/:id
// 機能　　　　　　　　： idで指定したroomドキュメントを1件返す
// ユーザ認証　　　　　： 不要
// パラメータ　　　　　： なし
router.get('/show/:id', controller.show);


// エンドポイント名　　： POST /api/rooms/create
// 機能　　　　　　　　： roomドキュメントを1件新規作成する
// ユーザ認証　　　　　： 必要
// パラメータ
// 　- name        ：【必須】roomの名前
router.post('/create', auth.isAuthenticated(), controller.create);


// エンドポイント名　　： PUT /api/rooms/join/:id
// 機能　　　　　　　　： room.attendeesにユーザを1人追加する
// ユーザ認証　　　　　： 必要
// パラメータ　　　　　： なし
router.put('/join/:id', auth.isAuthenticated(), controller.join);


// エンドポイント名　　： PUT /api/rooms/leave/:id
// 機能　　　　　　　　： room.attendeesからユーザを1人削除する
// ユーザ認証　　　　　： 必要
// パラメータ　　　　　： なし
router.put('/leave/:id', auth.isAuthenticated(), controller.leave);

/*
router.put('/update/:id', controller.update);
router.delete('/delete:id', controller.destroy);
*/
module.exports = router;
