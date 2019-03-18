var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var allUsers = {};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on("setNickname", function(nickname){
        socket.nickname = nickname;
        allUsers[nickname] = socket;
    });

    socket.on("pmsg", function(pmsg){
        console.log("ss");
        var sender = socket.nickname;
        var receiver = pmsg.target;
        var content = pmsg.content;

        console.log("SENDER : " + sender);
        console.log("RECEIVER : " + receiver);
        console.log("CONTENT : " + content);

        var targetSocket = allUsers[receiver];
        try{
            targetSocket.emit("smsg", sender+":"+content);
        }catch (err){
            targetSocket.emit("smsg", "문제있어!!!!!!");
        }

    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on("greet", function(e){
        console.log("greeting............");
        console.log(e);
    });

    socket.on("msg", function(e){
        var ip = socket.request.socket.remoteAddress;
        console.log("nickname:" + socket.nickname);
        console.log(ip);
        console.log("--------------------");
        console.log(e);
        io.emit("smsg", socket.nickname  + ":" + e);
    });


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});