#!/bin/bash

# Clean entry files
node cleaner.js europelist.csv nasdaq.csv
# Download history stock prices from previous markets
node downloader.js nasdaq.json