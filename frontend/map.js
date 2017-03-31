/**
 * Created by jeremybrown on 2017-03-30.
 */

var map;
var directionsDisplay;
var startMarker;
var endMarker;
var startInfoWindow;
var endInfoWindow;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 7,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions'));

    var startInput = document.getElementById('departure-text');
    var endInput = document.getElementById('destination-text');
    initAutocomplete(map, startInput, startMarker, startInfoWindow, 'start');
    initAutocomplete(map, endInput, endMarker, endInfoWindow, 'end');
}

function initAutocomplete(map, input, marker, infoWindow, se) {
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    infoWindow = new google.maps.InfoWindow();
    var infoWindowContent = document.getElementById(se + '-infowindow-content');
    infoWindow.setContent(infoWindowContent);
    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infoWindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infoWindowContent.hidden = false;
        if (se === 'start') {
            infoWindowContent.children['start-place-icon'].src = place.icon;
            infoWindowContent.children['start-place-name'].textContent = place.name;
            infoWindowContent.children['start-place-address'].textContent = address;
        } else if (se === 'end') {
            infoWindowContent.children['end-place-icon'].src = place.icon;
            infoWindowContent.children['end-place-name'].textContent = place.name;
            infoWindowContent.children['end-place-address'].textContent = address;
        }

        infoWindow.open(map, marker);
    })
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

    startMarker.setVisible(false);
    endMarker.setVisible(false);
}