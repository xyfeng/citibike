import json, urllib2
from StringIO import StringIO

response = urllib2.urlopen('http://www.citibikenyc.com/stations/json')
stations = json.load(response)['stationBeanList']

for s in stations:
	if 'city' in s:
		del s['city']
	if 'location' in s:
		del s['location']
	if 'altitude' in s:
		del s['altitude']
	if 'stAddress2' in s:
		del s['stAddress2']
	if 'lastCommunicationTime' in s:
		del s['lastCommunicationTime']
	if 'postalCode' in s:
		del s['postalCode']
	if 'statusValue' in s:
		del s['statusValue']
	if 'testStation' in s:
		del s['testStation']
	if 'stAddress1' in s:
		del s['stAddress1']
	if 'landMark' in s:
		del s['landMark']
	if 'statusKey' in s:
		del s['statusKey']
	if 'totalDocks' in s:
		del s['totalDocks']
	if 'availableDocks' in s:
		del s['availableDocks']
	if 'availableBikes' in s:
		del s['availableBikes']

# create js string
io = StringIO()
json.dump(stations, io)
jsonStr = 'var stations_min = ' + io.getvalue()

# save as js file
f = open("stations.js", "w")
f.write(jsonStr)
f.close()

print 'success'

# save as json
# with open('stations.json', 'w') as outfile:
# 	json.dump(stations, outfile)