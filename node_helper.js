/* Magic Mirror
 * Module: MotionSensor
 *
 * By Yen
 */

const NodeHelper = require('node_helper');

var io = require('socket.io');
var express = require('express');
var app = express.createServer()
var io = io.listen(app);

app.listen(8888);

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
  
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

module.exports = NodeHelper.create({
 	start: function () {
    	this.started = false;
  	},

	activateMonitor: function () {
		// Check if hdmi output is already on
      	exec("/opt/vc/bin/tvservice -s").stdout.on('data', function(data) {
        	if (data.indexOf("0x120002") !== -1) 
          		exec("echo 'on 0' | cec-client -s -d 1", null);
        });
	},

	deactivateMonitor: function () {
	  // Check if hdmi output is already off
      	exec("/opt/vc/bin/tvservice -s").stdout.on('data', function(data) {
        	if (data.indexOf("0x12000a") !== -1)
          		exec("echo 'standby 0' | cec-client -s -d 1", null);
        });
  	},
    
    // Subclass socketNotificationReceived received.
  	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG' && this.started == false) {
			const self = this;
			this.config = payload;

/*
      //Detected movement
      this.pir.watch(function(err, value) {
        if (value == valueOn) {
          self.sendSocketNotification("USER_PRESENCE", true);
          if (self.config.powerSaving){
            clearTimeout(self.deactivateMonitorTimeout);
            self.activateMonitor();
          }
        }
        else if (value == valueOff) {
          self.sendSocketNotification("USER_PRESENCE", false);
          if (!self.config.powerSaving){
            return;
          }

          self.deactivateMonitorTimeout = setTimeout(function() {
            self.deactivateMonitor();
          }, self.config.powerSavingDelay * 1000);
        }
      });
*/

			this.started = true;

    	} else if (notification === 'SCREEN_WAKEUP') {
			this.activateMonitor();
    	}
	}
});
