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

[github]: https://github.com/mauricioadams/frankjs
[FRANKJS]: http://frankjs.org
[@mauricioadams]: http://twitter.com/mauricioadams