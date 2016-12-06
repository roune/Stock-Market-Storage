/**
* It accepts both .csv and .json files.
* ALL THE FILES MUST HAVE THE FORMAT FROM THE SOURCE http://www.nasdaq.com/screening/companies-by-region.aspx , it won't work otherwise
*/

var readlineSync = require('readline-sync');
var stop = false;
var files = [];
/*while (!stop) {
	var ans = readlineSync.question('Type the list you want to clean: ');
	files.push(ans);
	ans = readlineSync.question('Do you want to add some more files? (y/n) ');
	if (ans == 'y' || ans == 'Y')
		continue
	else
		stop = true;
}*/

process.argv.forEach(function (val, index, array) {
  if (index > 1)
	  files.push(val);
});

var fs = require("fs");

files.forEach(function(f) {
	
	if (f.endsWith(".csv")) {
		var Converter = require("csvtojson").Converter;
		var converter = new Converter({});
		converter.fromFile(f, function(err,result){
			if (err) throw err;
			var fname = f.replace(".csv", ".json");
			fs.writeFileSync(fname, JSON.stringify(result));
			cleaner(fname);
		});
	} else {
		cleaner(f);	
	}
})

function cleaner(f) {
	var listado = JSON.parse(fs.readFileSync(f, 'utf8'));	
	var length = Object.keys(listado).length;

	fs.writeFile("tmp__" + f, "[\n", function(err) {
		if (err) console.log(err);
	
		listado.forEach(function(l, index) {
			if (l["MarketCap"] != 0) {
				if (length == index + 1) {
					fs.appendFileSync("tmp__" + f, JSON.stringify(l) + "\n");
				} else {
					fs.appendFileSync("tmp__" + f, JSON.stringify(l) + ",\n");
				}
			}
		})
		fs.appendFileSync("tmp__" + f, "]");
		fs.renameSync("tmp__" + f, f);
	})
}

