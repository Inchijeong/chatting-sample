// 1
var express = require('express');
var router = express.Router();

function chat(io){
    io.on('connection', function(socket){
        console.log('chat.js ....... a user connected');
    });
}

module.exports = chat;
