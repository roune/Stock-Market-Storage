var exec = require('child_process').execSync;
var indexes = require("./" + process.argv[2]);

var j = process.argv[2].indexOf(".json");
var market = process.argv[2].substring(0, j) + "/";
market = market.toUpperCase();

indexes.forEach(function(i, index) {
	var cmd = "nodejs single_downloader.js " + process.argv[2] + " " + i["Symbol"];
	exec(cmd, {stdio:[0,1,2]});
	var cmd2 = "nodejs reorderer.js " + market + i["Symbol"] + " &"
	var res = exec(cmd2);
	if (res instanceof Error) {
		var cmd3 = "service tor restart";
		exec(cmd3);
	}
})
