'use strict';

var express = require('express');
var controller = require('./comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// エンドポイント名　　： GET /api/comments/search
// 機能　　　　　　　　： commentドキュメントを検索して返す
// ユーザ認証　　　　　： 必要
// パラメータ
//   - room      　：【必須】
// 　- q           ：【任意】検索クエリ."+"区切りで最大5つ指定可能.
// 　- count       ：【任意】検索する最大件数. 最大値は100. デフォルト値は10.
// 　- since       ：【任意】YYYMMDDで指定した時刻以降のドキュメントを検索する.
// 　- until       ：【任意】YYYMMDDで指定した時刻以前のドキュメントを検索する.
router.get('/search', auth.isAuthenticated(), controller.search);


// エンドポイント名　　： POST /api/comments/create
// 機能　　　　　　　　： commentドキュメントを1件新規作成する
// ユーザ認証　　　　　： 必要
// パラメータ
//   - room      　：【必須】外部キーとなるroom_id
// 　- text        ：【必須】本文(最大1000文字)
router.post('/create', auth.isAuthenticated(), controller.create);


/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/
module.exports = router;
