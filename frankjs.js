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
(function() {
	var result, reports, fileName, arg, fileSet = Date.now(), files = [], totalReports, reporFile,
	childProcess = require('child_process'),
	fs = require('fs'),
	path = require('path'),
	jade = require('jade'),
	phantomjs = require('phantomjs'),
	help = require('./utils/help'),
	binPath = phantomjs.path,
	argSize = process.argv.length;
	
	if (process.argv.length === 2) {
		console.log('Usage: node frankjs <URL> [options] (node frankjs --help to display options)');
	} else {
		var frankArgs = {
			url : (process.argv[2].indexOf('http') !== 0) ? 'http://'+ process.argv[2] : process.argv[2],
			isHelp : false,
			scriptName : 'frankjs-phantomjs-script',
			sendReport : false,
			reportTo: false,
			reports : 'default',
			scriptParams : ''
		};
	
		//TODO : Support json package load with arguments
		for (i = 0; i < argSize; i += 1) {
			arg = process.argv[i].split("=");
			switch(arg[0]) {
				case "--help" : 
				case "-h" : 
					frankArgs.isHelp = true; 
					break;
				
				case "--custom-script" :
				case "-cs" :
					frankArgs.scriptName = arg[1];
					break;
				
				case "--report-template" :
				case "-rt" :
					frankArgs.reports = arg[1];
					break;
				
				case "--custom-script-params" :
				case "-csp" :
					frankArgs.scriptParams = arg[1];
					break;
					
				default : '';
			}
		}
	
		if(frankArgs.isHelp) {
			help.show();
		} else {
			//some magic
			
			//check if script file exists - TODO
			
			var childArgs = [
			  path.join(__dirname, 'phantomjs-scripts', frankArgs.scriptName + '.js'),
			  frankArgs.url + frankArgs.scriptParams
			];
			
			//run phantomjs script - output should be json stringfy
			childProcess.execFile(binPath, childArgs, function(err, output, stderr) {	
				//remove line breaks
				output = output.replace(/(\r\n|\n|\r)/gm,'');
				
				//reads json object from a temp json txt file if phantomjs output (console.log) === txt
				result = (output === 'txt') ? fs.readFileSync('jsontemp.txt', 'utf8') : result = output;
				
				if(output === 'ERROR') {
					console.log('PhantomJS script error');
					process.exit(1);
				}
				
				if(result.length === 0) {
					console.log('Error: Result object empty');
					process.exit(1);
				}

				result = JSON.parse(result);
				reports = frankArgs.reports.split(",");
				
				//Reports
				totalReports = reports.length;
				for(i = 0; i < totalReports; i++)
				{
					reportFile = 'report-templates/' + reports[i] + '.txt';
					fileName = 'result-' + reports[i] + '-' + fileSet + '.html';
					files.push(fileName);
					
					var template = fs.readFileSync(reportFile, 'utf8', function (err,data) {
					  if (err) {
						return console.log(err);
					  }
					  return data;
					});
					
					//parse jade template
					var fn = jade.compile(template);
					var htmlOutput = fn({result: result});
					
					//add json dump for archive and future comparison
					htmlOutput += "<!-- "+ JSON.stringify(result) + " --!>";
					
					//write files
					fs.writeFile('report-results/' + fileName, htmlOutput, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				}
		
				if(!frankArgs.sendReport) {
					console.log('Report created with sucess:');
					console.log(files.join('\n'));
				}
				else {
					/*
					* TODO - Create send methods - Send files by email / execute bash / move files to ftp 
					*/
				}
				
				/*
				 * TODO - Create metrics monitors (and send alarms)
				 * DOM > limit, pageload > limit, page offline, img files count/size > limit, css size > limit, DOM nodes > limit
				*/
			});
		}	
	}
//bye
}).call(this);