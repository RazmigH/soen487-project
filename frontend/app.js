// Roadtrip planner app
// Main functions

var GMAPS_API_KEY = 'AIzaSyCNrZAoJ8_xVKR7y7jHYPkX_P098AsZf3c'

var backend_base_url = 'http://localhost:8080'

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"
    ]

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]


function fetchTripInfo() {
    var departure = document.getElementById('departure-text').value
    var destination = document.getElementById('destination-text').value

    console.log('Fetching trip info')
    //fetchDirections(departure, destination)
    fetchWeather(departure, destination)
    //fetchHospitals(destination)
    //fetchCoordinates(destination)
    // /fetchRestaurants(departure, arrival)
    //fetchGasStations(departure, arrival)

}

function fetchDirections(departure, destination) {
    console.log('Fetching directions')
    if (departure && destination) {
        calcRoute(departure, destination)
    } else {
        // TODO better
        alert('must specify both departure and arrival!')
    }
}

function fetchRestaurants(departure, destination) {
    // TODO
    console.log('Fetching restaurants')
}

function fetchGasStations(departure, destination) {
    // TODO
    console.log('Fetching gas stations')
}

function fetchWeather(departure, destination) {
    // TODO
    console.log('Fetching weather')
    makeWeatherRequest(destPlace)
    setWeatherDest(destPlace)

    document.getElementById('weather-col').hidden = false

}


function makeWeatherRequest(place) {
    var loc = place.geometry.location
    var url = backend_base_url + '/weather'

    $.getJSON(url, {
        longitude: loc.lng,
        latitude: loc.lat
    }).done(function(data) {
        data.daily.data.forEach(function(d) {
            addWeatherDay(d)
        })

    })
}

function setWeatherDest(place) {
    var locality = place.address_components.find(function (c) {
        return c.types.find(function t(t) {
                return t === 'locality'
            }) !== undefined
    })

    var weatherDest = document.getElementById('weather-dest');
    weatherDest.textContent = locality.short_name;
}

function addWeatherDay(dayData) {
    console.log(dayData)

    var dt = new Date(dayData.time * 1000);

    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var dateString = dt.toLocaleDateString('en-US', options)

    var high = dayData.temperatureMax
    var low = dayData.temperatureMin
    var icon = dayData.icon // TODO make real icon

    // Messy I know
    var str = `
<div class="col-xs-4 col-sm-3 col-md-4 col-lg-3 weather-col">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">${ dateString }</h3>
        </div>
        <div class="panel-body">
            High: ${ high }
            <br>
            Low: ${ low }
        </div>
    </div>
</div>`

    var weatherRow = document.getElementById('weather-row');
    weatherRow.innerHTML += str

}
function fetchHospitals(destination) {
    //var loc = destination.geometry.location
    console.log(destination);
    var url = backend_base_url + '/emergency'

    $.getJSON(url, {
        longitude:-79.00248100000002,
        latitude:43.8554579
    },function (data){
        $.each(data, function(key,value){
            if(key=='listings'){
                $.each(value, function(k, v){
                    console.log(v.name + ',' + v.address.city + ',' + v.distance + ',');
                    $('#emergency-col').append('<li>'+ v.name + '<br> Address: ' + v.address.street + ', '
                        + v.address.city + ', ' + v.address.pcode + v.address.prov + '<br> Distance from Destination: '
                        + v.distance + '</li>');
                });
            }
        })
    });
}

function fetchCoordinates(place){
    console.log(place);
    console.log('Fetching Coordinates');
    var url = backend_base_url + '/geocode';
    $.getJSON(url,{
        address: place
    },function(data){
        $.each(data.results[0], function(key, value){
            if(key=='geometry'){
                console.log(value.location);
                //return value.location;
            }
        })
    });
}
