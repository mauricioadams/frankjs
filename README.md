FRANKJS
====================================
[FRANKJS] is a nodejs script used to create web page reports such as DOM ready time, pageload and page resources.

## Installation
Fork me on [github] or install node package using **npm install frankjs**

Dependencies: PhantomJS and Jade template engine

## Usage
```
node frankjs google.com
```

Output: report file named report-default-**SETID**.html in report-results folder

```
node frankjs google.com -rt=dump-json,my-custom-template
```

Output: report files named report-dump-json-**SETID**.html and report-my-custom-template-**SETID**.html in report-results folder

**SETID** = Unique identifier for your set of reports

## Config options

Default options are located in default.json in config-files folder, you can override any default option or create your custom config file for a specific report.
To load your json config file use **-ff=FILENAME** option (must be in config-files folder).
Any attribute in json config file will be mapped in frankArgs object, just in case you want to add any awesome new functionality. 

## Custom PhantomJS script

FRANKJS has a default PhantomJS script but you can run any script.
Script must be in phantomjs-scripts folder and must return one valid stringified JSON.

## Custom report template
Reports are created using [Jade template engine] and must be in report-templates folder.
Each template receives a result JSON so you can iterate in Jade file.

## Roadmap (TODO)
A few items for future releases, maybe you can help me to develop some of them :)
- Nice style for default report 
- SEO report (some code for default PhantomJS script and report template)
- Send reports feature (email and any other shell commands - reports in "files" array
- Notification feature (Define max value for properties like DOM ready time, resource sizes, pageload, etc... and notify if higher)
- Lots of useful reports 

## Questions? Suggestions?
**mauricio@frankjs.org** or [@mauricioadams]

## Changelog
0.0.6 
- (Fix) "sucess" typo

0.0.5 
- Adding page cookies
- Adding some styles for default report
- (Fix) getMonth + 1, January is 0
- (Change) Adding table style for console msg in default report

0.0.4 
- Adding console messages
- Fixing load time for resources
- Adding json default file
- Adding json config file (-ff) support to override default options and new properties

[Jade template engine]: http://jade-lang.com/
[github]: https://github.com/mauricioadams/frankjs
[FRANKJS]: http://frankjs.org
[@mauricioadams]: http://twitter.com/mauricioadams