module.exports = function(RED) {
  "use strict";
  var request = require('request');

  function sendThingspeak(api_key, field, value){
    request.post({
      url: `http://api.thingspeak.com/update?key=${api_key}&field=${value}`
    }, function(error, response, body) {
      if(error) {
        console.log("[Thingspeak] Error sending data");
      }
    });
  }

  function ThingspeakNode(n) {
    RED.nodes.createNode(this,n);
    this.api_key = n.api_key;
    this.field = n.field;
    var node = this;

    this.on("input", function(msg) {
      var api_key = msg.api_key||node.api_key;
      var field = msg.field||node.field;
      var value = msg.payload;
      sendThingspeak(api_key, field, value);
    });
  }
  RED.nodes.registerType("thingspeak", ThingspeakNode);
};
