/**
 * Created by jeremybrown on 2017-03-30.
 */

var map;
var directionsDisplay;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom:7,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
}

function calcRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}