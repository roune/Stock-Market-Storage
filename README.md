# Stock-Market-Storage
This repository is intended to have available very commun requested information when operating with stock markets. Some of this information is:
- Historic daily values
- Google Trends daily values
- Calendar Events of companies with **importance** and people's **actitude** 
- Historical daily values of Gold, Silver, Cotton, etc
The general purpose of this project is having the information with this simple and accessible structure

#### Companies.json

In this file, all the companies which are currently operating in different markets will have their easiest way to be located.

| ID	        | Name          		| Files | Finance Calendar | Market|
| ------------- |:-------				| -----|------------------|-------|
| GOOG		|Google Alphabet Inc	| [GOOG.csv, GOOG-events.csv]|T1: 3/3, T2: 5/6, T3: 10/10, T4: 3/1 | Nasdaq
| SAN      | Banco Santander SA  |[SAN.csv, SAN-events.csv]|T1: 2/4, T2: 5/8, T3: 10/1 | Ibex35, Eurostoxx50  |

#### IDCompany.csv

Here, the historical daily values of the company with id IDCompany will be stored alongside the Google Trends volume.

| Date|Opening|Max|Min|Close|Trends|
|---|---|---|---|---|---|
|2004-01-01|40,64|41,5|39,7|41,2|49|
|2004-01-02|41,2|44,6|41,2|43,7|90|
|...| 

There has been proven by some researchers the importance of Google Trends search volume of a company in its variance of the market value.

#### IDCompany-events.csv

All the significant events (mostly depending on news records) will be stored with this structure.

| Date|Type|Importance|Actitude|
|---|---|---|---|
|2016-03-06|Finnances|Low|Positive|
|2016-03-25|New Product|Medium|Very Positive|
|2016-04-13|Natural disaster|High|Negative|

#### OtherValues.json

This will be to locate other values like gold, silver, cotton, etc. with their proper files.

| Name | File |
| :---: | :---: |
| Gold | gold.csv |
| Silver | silver.csv |
| Cotton | cotton.csv |

#### gold.csv

This would be an example of the gold.csv file which will have a very similar structure than IDCompany.csv but removing Google Trends info.

| Date|Opening|Max|Min|Close|
|---|---|---|---|---|
|2004-01-01|400,64|410,5|390,7|410,2|
|2004-01-02|410,2|440,6|410,2|430,7|
|...| 

## Current State

Right now, I am working on automatizing all the data mining which requires scripting. At this moment I have just made two simple tools. In the future I will make the next ones to get the remaining information and some extra help would be appreciated :).
The tools are made in Python and Javascript Nodejs so they will work in Linux, Windows, Mac...

### Companies

You have to run `node app.js` and insert the data required to clean and store the .csv downloaded from [Nasdaq.com](http://www.nasdaq.com/screening/companies-by-region.aspx).
If someone is so kind to download them and automatize this task with the dirtiest and quickest script, many people would be grateful.

When this step gets done, we will be able to merge all the companies into a single file and get a custom database.

### Trends

You will need to install the libraries *moment* and *pytrends* with `pip install moment` and `pip install pytrends`. Then run `python app.py`.
You need to be carefull with this script when querying a company. Apple can be a company or a fruit, so it very important to give enough words to specify correctly what we are refering to.
Google Trends requires an Gmail account to download and it has a quota limit. You can wait until you recover the quota and restart the script or you can wait. In both ways the program will continue at the date it was stopped (if you introduce correctly the file name and the same query).
Again, if someone can make it automatic for all the companies, it would be awesome.
