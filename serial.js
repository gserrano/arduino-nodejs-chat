var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor


var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  // serialPort.write("ls\n", function(err, results) {
  //   console.log('err ' + err);
  //   console.log('results ' + results);
  // });
});