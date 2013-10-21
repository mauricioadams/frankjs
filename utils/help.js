module.exports = {
	show : function () {
	//display help menu
			console.log([
				'     .-""-"-""-.',
				'    /          \\',
				'    | .--.-.--. |',
				'    |` >       `|',
				'    | <         |',
				'    (__..---..__)',
				'   (`|\\\o_/ \\\_o/|`)',
				'    \\\(    >    )/',
				'  [>=|   ---   |=<]',
				'     \\\__\\\   /__/',
				"         '-'",
				'',
				' Usage: frankjs [url] [options]',
				'',
				' FrankJS options:',
				'',
				'  -h, --help                    output usage information (You are here)',
				'  -cs, --custom-script          overwrite default PhantonJS script (phantomjs-scripts folder)',
				'  -csp, --custom-script-params  specify any additional options for PhantomJS or PhantomJS custom script (https://github.com/ariya/phantomjs)',
				'  -rt, --report-template        specify jade templates for report (report-templates folder)',
				'                                for multiple reports use "," (comma-delimited)',
				'  -ff, --from-file              Load options from a json file (config-files folder)	',
				'',
				' Examples:',
				'  frankjs google.com -rt=dump-json',
				'  frankjs google.com -rt=dump-json,my-custom-template',
				'  frankjs google.com -cs=yslow -rt=my-custom-template',
				'',
				' Custom templates:',
				'  Jade templates are located in report-templates folder.',
				'  To display result object use (frankjs [URL] -rt=dump-json) or check http://frankjs.org',
				'',
				' Custom PhantomJS script:',
				'  PhantomJS scripts are located in phantomjs-scripts folder.',
				'  Your custom script must return one valid stringified result object so Jade template can do its magic',
				'  Some result objects can exceed console.log string size, in this case use "txt" as return and save your object in jsontemp.txt',
				'  For more information on custom scripts check http://frankjs.org'
			].join('\n'));
	}
};