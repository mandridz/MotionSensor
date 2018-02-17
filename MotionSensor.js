/* Magic Mirror
 * Module: MotionSensor
 *
 * By Yen
 */

 Module.register('MotionSensor', {
 		
 		requiresVersion: "2.1.0",

 		defaults: {
		},

		// Override socket notification handler.
		socketNotificationReceived: function(notification, payload) {
			if (notification === "USER_PRESENCE") {
				Log.info(this.name + " received a system notification: " + notification);

				this.sendNotification(notification, payload);
			}
		},

		notificationReceived: function(notification, payload) {
			if (notification === "SCREEN_WAKEUP") {
				Log.info(this.name + " received a system notification: " + notification);

				this.sendNotification(notification, payload);
			}
		},

		start: function() {
			this.sendSocketNotification('CONFIG', this.config);
			
			Log.info('Starting module: ' + this.name);
		}
 	}
 );