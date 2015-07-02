'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: String,
  attendees: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Room', RoomSchema);
