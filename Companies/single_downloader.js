var fs = require('fs');
var http = require('http');

// index = process.argv[2]
// company = process.argv[3]
var market = process.argv[2];
var symbol = process.argv[3];

var directory = market.substring(0, market.lastIndexOf("/") + 1);
if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
}

var index = market.substring(market.lastIndexOf("/") + 1);
index = index.substring(0, index.lastIndexOf("."));
index = index.toUpperCase();

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

var url = "http://www.google.com/finance/historical?q=" + index + ":" + symbol + "&startdate=Jan%201%2C%202004&enddate=Dec%206%2C%202016&num=30&start=660&output=csv";
var file = directory + symbol + ".csv";
download(url, file, function(err) {
	if (err) throw err;
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) throw err;
		if(data.indexOf("automated data")!==-1) {
			fs.unlink(file);
			fs.appendFileSync("automated_detection.txt", index + ":" + symbol + "\n");
		} else if (data.indexOf("requested URL was not found on this server")!==-1) {
			fs.unlink(file);
			fs.appendFileSync("error404.txt", index + ":" + symbol + "\n");
		} else if (data.indexOf("302 Moved")!==-1) {
			fs.unlink(file);
			fs.appendFileSync("error302.txt", index + ":" + symbol + "\n");
		} else {
			console.log("Succesfull download of " + symbol);
		}
	})
});

