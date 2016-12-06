var fs = require('fs');
var http = require('http');

var indexes = require("./" + process.argv[2]);
var index = "NASDAQ";
var directory = "./" + index + "/";
if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
}

// Download function.
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

indexes.forEach(function(i) {
	var symbol = i["Symbol"];
	var url = "http://www.google.com/finance/historical?q=" + index + ":" + symbol + "&startdate=Jan%201%2C%202004&enddate=Dec%206%2C%202016&num=30&start=660&output=csv";
	var file = directory + symbol + ".csv";
	download(url, file, function(err) {
		if (err) throw err;
		console.log("Finished download");
		var fs = require('fs'); // file system module

		fs.readFile(file, 'utf-8', function(err, data) {
			if (err) throw err;

			var lines = data.trim().split('\n');
			fs.appendFileSync(directory + "__tmp" + symbol + ".csv", lines[0]);
			
			for (var i = lines.length; i > 0; i++) {
				fs.appendFileSync(directory + "__tmp" + symbol + ".csv", lines[i]);
			}
			fs.renameSync(directory + "__tmp" + symbol + ".csv", directory + symbol + ".csv");
		});
	});
})

