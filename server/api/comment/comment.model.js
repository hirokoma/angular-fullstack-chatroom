'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: String,
  room: {type: Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Comment', CommentSchema);
