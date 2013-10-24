/*
	   .'`   `""--.._..--""`   `'.
      /        .-""-"-""-.        \
      |       /           \       |
       \,     | .--.-.--. |     ,/
       (_'-   |` >       `|   -'_)
       /      | <         |      \
       |      (__..---..__)      |
       |     (`|\o_/ \_o/|`)     |
       |      \(    >    )/      |
       |    [>=|   ---   |=<]    |
       |      ,\__\   /__/,      |
       |.____.|\==='-'===/|.____.|
        \_____;_\=======/_;_____/
         |     _)'.===.'(_     |
         ;     \-._\_/_.-/     ;
         /\_\_\_\  ()   /_/_/_/\
         '-.._____.-'-._____..-'
             |     /`\     |
             |_    | |    _|
           _.;____ | | ____;._
         /`       `| |`       `\
         '------'--' '--'------'
	FRANKJS - http://frankjs.org
	Copyright (c) 2013, Mauricio Adams <mauricio@frankjs.org>.  All rights reserved.
*/
var page = require('webpage').create(),
    system = require('system'),
	fs = require('fs'),
	result = {},
    t;

//create result
result.errors = [];
result.resources = [];
result.consolemsg = [];
	
//todo
//search for social tags, opengraph, twitter and important metatags (like keywords and content)
//check 3rd party resources
//check each/split type of request (img,js and css)	
	
	
//adds dom ready event after page initialize
page.onInitialized = function () {
	page.timingStartTime = page.evaluate(function () {
		(function () {
			//domready
			document.addEventListener('DOMContentLoaded', function(){window.timingDOMContentLoaded = Date.now();}, false);
			//window.load
			window.addEventListener('load', function(){window.timingLoad = Date.now();}, false);
		})();
		return Date.now();
	});
};	

//watch console output
page.onConsoleMessage = function (msg) {
	result.consolemsg.push(msg);
}

//watch page resources request
 page.onResourceRequested = function (req) {
    result.resources[req.id] = {
            request: req,
            startReply: null,
            endReply: null
        };
};

page.onResourceReceived = function (res) {
    if (res.stage === 'start') {
        result.resources[res.id].startReply = res;
		result.resources[res.id].loadTime = Date.now();
		result.resources[res.id].url = res.url;
		//converts to kb
		result.resources[res.id].bodySize =  (res.bodySize / 1024).toFixed(2);
    }
    
	if (res.stage === 'end') {
        result.resources[res.id].endReply = res;
		result.resources[res.id].loadTime =   Date.now() - result.resources[res.id].loadTime;
    }
};

page.onResourceError = function(resourceError) {	
	 result.errors.push({ code : resourceError.errorCode, description : resourceError.errorString, url : resourceError.url});
};

//gets any error on the page
page.onError = function (msg, trace) {
	trace.forEach(function(item) {
        msg += '  ', item.file, ':', item.line;
    });
    result.errors.push({ code : '', description : msg, url : ''});
}
	
if (system.args.length === 1) {
    console.log('Usage: frankjs-phantomjs-script <some URL>');
    phantom.exit(1);
} else {
	var now = new Date();
    result.startTime = Date.now();
	result.dateForHumans = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	result.date = now.toJSON();
	result.address = system.args[1];
    page.open(result.address, function (status) {
		var startTime = result.startTime;
		var doc;
		
        if (status !== 'success') {
            result.error.push({ code : 1, description : 'unable to connect', url : address});
        } else {
			//loading time
			result.loadTime = Date.now() - result.startTime;
			
			//dom ready time
			page.timingDOMContentLoaded = JSON.parse(page.evaluate(function () {
                return window.timingDOMContentLoaded;
            }));
            result.domReadyTime = page.timingDOMContentLoaded - page.timingStartTime;
			
			//window load time
			page.timingLoad = JSON.parse(page.evaluate(function () {
                return window.timingLoad;
            }));
			result.timingLoad = page.timingLoad;
			result.windowReadyTime = page.timingLoad - page.timingStartTime;
			
			//get total dom
			result.totalDOMElements = page.evaluate(function () {
                return document.getElementsByTagName("*").length;
            });
			
			result.cookies = page.evaluate(function () {
				return document.cookie.split(';');
			});
        }
		//json return too long :( , output in a txt
	   try {
			fs.write('jsontemp.txt', JSON.stringify(result), 'w');
			console.log('txt');
			phantom.exit();
		} catch(e) {
			console.log('ERROR');
			phantom.exit();
		}
    });
}