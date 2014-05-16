$(document).ready(function() {
    //VARIABLES
    var stations_full;
    //FUNCTIONS
    //distance between to points
    function getDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var radlon1 = Math.PI * lon1 / 180;
        var radlon2 = Math.PI * lon2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515; //Miles
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        return dist;
    }
    //get random number in range
    function getRandomArbitary(min, max) {
        return Math.random() * (max - min) + min;
    }
    //get updated station data
    function getStationUpdate() {
        var url = "http://appservices.citibikenyc.com/data2/stations.php?updateOnly=true"; //unofficial citibike data feed
        $.getJSON(url + '&callback=?', function(data) {
            if (data.ok) {
                stations_full = []
                for (var i in data.results) {
                    var one = data.results[i];
                    if (one.status.toLowerCase() === 'active') {
                        for (var j in stations_min) {
                            var two = stations_min[j]
                            if (two.id === one.id) {
                                stations_full.push($.extend(one, two));
                            }
                        }
                    }
                }
                console.log('111111');
                var startStations = getStartStations(getRandomArbitary(40.716821, 40.732530), getRandomArbitary(-74.009347, -73.980293));
                console.log(startStations);
            }
        });
    }
    // get closest start station
    function getStartStations(lat, lon) {
        //assign distance to station
        for (var i in stations_full) {
            var s = stations_full[i];
            if (s.availableBikes > 0) {
                var d = getDistance(lat, lon, s.latitude, s.longitude, 'K');
                s.distance = d;
            } else {
                s.distance = 1000000;
            }
        }
        stations_full.sort(function(a, b) {
            return a.distance - b.distance;
        });
        // three closest station potentially
        var targets = stations_full.slice(0, 3);
        return targets;
        // get walking distance from Google
        // for (var i in targets) {
        //     var s = targets[i];
        //     getRoutes(i, new google.maps.LatLng(lat, lon), new google.maps.LatLng(s.latitude, s.longitude));
        // }
        // console.log('------');
    }
    // get closest end station
    function getEndStations(lat, lon) {
        //assign distance to station
        for (var i in stations_full) {
            var s = stations_full[i];
            if (s.availableDocks > 0) {
                var d = getDistance(lat, lon, s.latitude, s.longitude, 'K');
                s.distance = d;
            } else {
                s.distance = 1000000;
            }
        }
        stations_full.sort(function(a, b) {
            return a.distance - b.distance;
        });
        // three closest station potentially
        var targets = stations_full.slice(0, 3);
        return targets;
    }
    // get route from google maps
    // var directionsService = new google.maps.DirectionsService();
    // function getRoutes(index, start, end) {
    //     var request = {
    //         origin: start,
    //         destination: end,
    //         travelMode: google.maps.TravelMode.WALKING
    //     };
    //     directionsService.route(request, function(response, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             var distance = response.routes[0].legs[0].distance.value;
    //             console.log(index);
    //             console.log(distance);
    //         }
    //     });
    // }

    //PROCESS
    getStationUpdate();
    // var dis = getDistance(40.76727216, -73.99392888, 40.71911552, -74.00666661, 'K');

});