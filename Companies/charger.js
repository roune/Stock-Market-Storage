var exec = require('child_process').execSync;
var indexes = require("./" + process.argv[2]);

var j = process.argv[2].indexOf(".json");
var market = process.argv[2].substring(0, j) + "/";
market = market.toUpperCase();

indexes.forEach(function(i, index) {
	var cmd = "torsocks nodejs single_downloader.js " + process.argv[2] + " " + i["Symbol"];
	exec(cmd);
	var cmd2 = "nodejs reorderer.js " + market + i["Symbol"] + " &"
	exec(cmd2);
	if (index != 0 && index % 10 == 0) {
		var cmd3 = "service tor restart";
		exec(cmd3);
	}
})
