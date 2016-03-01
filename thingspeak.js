/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
var RED = require(process.env.NODE_RED_HOME+"/red/red");
var request = require('request');


function sendThingspeak(api_key, field, value){

	var myUrl = "http://api.thingspeak.com/update?key="+api_key+"&"+field+"="+value;

	console.log("\n Thingspeak URL :\n"+myUrl);
	
	request.post({
		url : myUrl
	}, function(error, response, body) {
		if(error)
			console.log("\n[Thingspeak] Error sending data\n");
	});
}

function ThingspeakNode(n) {

	RED.nodes.createNode(this,n);

    this.on("input", function(msg) {
    	
		var api_key = msg.api_key||n.api_key;
		var field = msg.field||n.field;
		var value = msg.payload;

		sendThingspeak(api_key, field, value);
    });
}

RED.nodes.registerType("thingspeak",ThingspeakNode);
