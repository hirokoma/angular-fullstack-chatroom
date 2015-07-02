/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Comment = require('./comment.model');

exports.register = function(sockets) {
  Comment.schema.post('save', function (doc) {
    onSave(sockets, doc);
  });
  Comment.schema.post('remove', function (doc) {
    onRemove(sockets, doc);
  });
}

function onSave(sockets, doc, cb) {
  sockets.to(doc.room).emit('comment:save', doc);
}

function onRemove(socket, doc, cb) {
  sockets.to(doc.room).emit('comment:remove', doc);
}
