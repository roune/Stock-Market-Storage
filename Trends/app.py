import time
import moment
import random
import string
import os
import getpass
from pytrends.request import TrendReq
from datetime import datetime

users = []

query = raw_input("Enter the terms you want to register (5 words top): ");
input_file = raw_input("Enter the name of the file (without .csv): ");
print "Insert your Google accounts to download the registers (the more you add, the faster it gets done)"
stop = False
while not stop:
	username = raw_input("Enter Google's email: ")
	password=getpass.getpass("Insert your password: ")
	users.append({"google_username": username, "google_password": password})
	c = raw_input("You want to add another account? (y/n): ");	
	if c != "y" and c != "Y":
		stop = True

input_file += ".csv"

u = 0

date_file = None
f = None
if not os.path.exists(input_file):
	f = open(input_file, "w")
	f.write("date,value\n")
	f.close()
	date_file = moment.date("1-1-2004", "M-D-YYYY")
else:
	f = open(input_file, "r")
	last_date = None
	for line in f:
		info = line.split(',')
		last_date = info[0]
		val = info[1]
		if val == 'NaN':
			break
	f.close()
	if last_date != 'date':
		date_file = moment.date(last_date, "YYYY-M-D")
	else:
		date_file = moment.date("1-1-2004", "M-D-YYYY")

def dec_month(month):
	if month - 1 == 0:
		return 12
	return month - 1
	
def inc_month(month):
	if month + 1 == 13:
		return 1
	return month + 1
	
def save_state():
	global values
	global date_file
	f = open(input_file, "a")
	for i in (range(0, len(values))):
		if str(values[i]) == 'nan':
			val = 'NaN'
		else:
			year = (int(date_file.format("YYYY")) - 2004) * 12
			month = int(date_file.format("M")) - 1
			finaldate = year + month
			val = str(float(values[i]) * monthly_values[finaldate] / 100.0)
		f.write(date_file.format("YYYY-M-D") + ',' + val + '\n')
		date_file = date_file.add(days=1)	
	f.close()
	values = []

month = int(date_file.format("M"))
year = int(date_file.format("YYYY"))
i = 0
twae = 0
values = []
monthly_values = [] 

current_date = moment.now()

user_agent = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])

trend_payload = {'q': 'Google'}
while 1:
	try:
		print "Login with " + users[u].google_username
		pytrend = TrendReq(users[u].google_username, users[u].google_password, custom_useragent=user_agent)
		df = pytrend.trend(trend_payload, return_type='dataframe')
	except:
		u += 1
		if u == len(users):
			print "Any account is working, try later or add new accounts."
			print "(If you do not stop, I will keep trying)"
			time.sleep(15)
		else:
			print "Trying with next user"
	else:
		break

for j in (range(0, len(df))):
	#print(df.iloc[j]['google'])
	monthly_values.append(df.iloc[j]['google'])

while month != int(current_date.format("M")) or year != int(current_date.format("YYYY")):
	if i % 15 == 0 and i != 0:
		time.sleep(10)
		pytrend = TrendReq(users[u].google_username, users[u].google_password, custom_useragent=user_agent)
	
	payload = str(month) + '/' + str(year) + ' 1m'
	print "Downloading " + payload
	trend_payload = {'q': query, 'date': 	payload}
	try:
		df = pytrend.trend(trend_payload, return_type='dataframe')
	except:
		if twae == 4: 
			save_state()
			print "Sleeping for a while until Google lets me run again :)"
			time.sleep(900)
		print "Error, trying again"
		user_agent = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(32)])
		pytrend = TrendReq(users[u].google_username, users[u].google_password, custom_useragent=user_agent)
		twae += 1
		continue
	else:
		twae = 0
	for j in (range(0, len(df))):
		#print(df.iloc[j]['google'])
		values.append(df.iloc[j]['google'])
	i += 1
	month = inc_month(month)
	if month == 1:
		year += 1

save_state()	
	
