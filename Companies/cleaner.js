/**
* It accepts both .csv and .json files.
* ALL THE FILES MUST HAVE THE FORMAT FROM THE SOURCE http://www.nasdaq.com/screening/companies-by-region.aspx , it won't work otherwise
*/

var readlineSync = require('readline-sync');
var stop = false;
var files = [];

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
	
	var name_file = f.substring(f.lastIndexOf("/") + 1);
	var save_at = "markets/";
	
	fs.writeFile(save_at + "tmp__" + name_file, "[\n", function(err) {
		if (err) console.log(err);
	
		listado.forEach(function(l, index) {
			if (l["MarketCap"] != 0) {
				if (length == index + 1) {
					fs.appendFileSync(save_at + "tmp__" + name_file, JSON.stringify(l) + "\n");
				} else {
					fs.appendFileSync(save_at + "tmp__" + name_file, JSON.stringify(l) + ",\n");
				}
			}
		})
		fs.appendFileSync(save_at + "tmp__" + name_file, "]");
		fs.renameSync(save_at + "tmp__" + name_file, save_at + name_file);
	})
}

