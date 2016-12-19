#!/bin/bash
# execute with sudo
#service tor start
# Clean entry files
FILES=./lists/*.csv
mkdir markets
for f in $FILES
do
	nodejs cleaner.js $f
done
# Download history stock prices from previous markets
MARKETS=./markets/*.json
for m in $MARKETS
do
	nodejs charger.js $m #nasdaq.json
done
# Quit tor connection
#service tor stop
