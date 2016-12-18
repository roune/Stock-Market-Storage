#!/bin/bash
CHANGE BASE CODE TO CHANGE IP
# Clean entry files
nodejs cleaner.js europelist.csv nasdaq.csv
# Download history stock prices from previous markets
nodejs downloader.js nasdaq.json
	
