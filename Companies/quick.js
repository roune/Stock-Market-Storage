var fs = require('fs');
fs.readFile("error302.txt", 'utf-8', function(err, data) {
	if (err) throw err;
	var lines = data.split("\n");
	lines.forEach(function(l) {
		fs.unlink("markets/" + l);
	})
})
