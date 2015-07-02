'use strict';

var _ = require('lodash');
var Room = require('./room.model');

// Get list of rooms
exports.search = function(req, res) {
  /*パラメータに関する処理を後で作成してください。*/
  Room.find(function (err, rooms) {
    if(err) { return handleError(res, err); }
    return res.json(200, rooms);
  });
};

// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  console.log(req.user);
  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.json(201, room);
  });
};


// join user into an existing room in the DB.
exports.join = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    var exist = false;
    for(var i=0; i<room.attendees.length; i++){
      exist = exist || _.isEqual(room.attendees[i], req.user._id);
    }
    if(!exist){
      room.attendees.push(req.user._id);
    }
    room.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, room);
    });
  });
};


// leave from an existing room in the DB.
exports.leave = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    _.remove(room.attendees, function(attendee) {
      return _.isEqual(attendee, req.user._id);
    });
    room.markModified('attendees');
    room.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, room);
    });
  });
};


// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
