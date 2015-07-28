var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// var serialPort = new SerialPort("/dev/ttyUSB0", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\n")
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var users = [];

http.listen(3000, function(){
  console.log('listening on *:3000');
});


/* Socket */
io.on('connection', function(socket){

  /* User commands */
  socket.on('set nickname', function(nick){
    // foreach(users)
    users[socket.id] = {
      'nickname' : nick
    };
  });


  /* Chat */
	socket.on('message', function(msg){
    
    /* Commands */
    if(msg.charAt(0) == '/'){
      console.log(msg.substr(1));
      io.emit('bg', msg.substr(1));
      return;
    }

    // socket.broadcast.emit('message', users[socket.id].nickname + ': ' + msg);
    io.emit('message', users[socket.id].nickname + ': ' + msg);

	});
});

// serialPort.on("open", function () {
//   serialPort.on('data', function(data) {
//     console.log(data);
//   	red = parseInt(data*0.3);
//   	console.log(red);
//   	io.emit('bg', red);
//   });
// });
