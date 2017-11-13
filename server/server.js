var http     = require('http');
var socketio = require('socket.io');

console.log( typeof(http)+' '+typeof(socketio) + '   ' + typeof(socketio.listen()) );
var server = http.createServer();
var io = socketio.listen(server);

var months = ["January","February","March","April","May","June","July","August","Septemper","October","November","December"];

io.on('connection', function (socket) {

    var InervalId = setInterval(function(){
        month = months[Math.floor(Math.random() * months.length) + 1];
    		socket.emit('ChartsData', { 
          ChartData:{
            month:month,
            Data:[
              {"series" : "SeriesA" , "percentage" : Math.floor(Math.random()*100) },
              {"series" : "SeriesB" , "percentage" : Math.floor(Math.random()*100) },
              {"series" : "SeriesC" , "percentage" : Math.floor(Math.random()*100) },
              {"series" : "SeriesD" , "percentage" : Math.floor(Math.random()*100) },
            ]
          }
        } 
	     	);
    }
    ,1000);


});



server.listen(process.env.PORT || 3000, function(){
  var addr = server.address();
  console.log("Chat server listening at",addr.port);
});
