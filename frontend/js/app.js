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

$('#destination-text').keypress(function(event) {
    if (event.keyCode == 13) {  // enter key pressed
        fetchTripInfo();
    }
})

function fetchTripInfo() {
    if (departure && destination) {
        var departure = document.getElementById('departure-text').value
        var destination = document.getElementById('destination-text').value
    
        console.log('Fetching trip info')
        fetchDirections(departure, destination)
        fetchWeather(departure, destination)
        fetchHospitalRoutine(destination)
    // /fetchRestaurants(departure, arrival)
        //fetchGasStations(departure, arrival)

        //Testing Purposes
        //fetchCoordinates(destination)
    } else {
        // TODO better error message
        alert('must specify both departure and arrival!')
    }
}

function fetchDirections(departure, destination) {
    console.log('Fetching directions')
    if (departure && destination) {
        calcRoute(departure, destination)
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

    var weatherDest = document.getElementById('weather-dest')
    weatherDest.textContent = locality.long_name
}

function addWeatherDay(dayData) {
    console.log(dayData)

    var dt = new Date(dayData.time * 1000)

    var options = { weekday: 'long', month: 'long', day: 'numeric' }
    var dateString = dt.toLocaleDateString('en-US', options)

    var high = dayData.temperatureMax
    var low = dayData.temperatureMin
    var icon = dayData.icon
    var weatherIcon
    switch (icon) {
        case 'clear-day':
            weatherIcon = 'day-sunny'
            break
        case 'clear-night':
            weatherIcon = 'night-clear'
            break
        case 'snow':
            weatherIcon = 'snow'
            break
        case 'rain':
            weatherIcon = 'rain'
            break
        case 'sleet':
            weatherIcon = 'sleet'
            break
        case 'wind':
            weatherIcon = 'strong-wind'
            break
        case 'fog':
            weatherIcon = 'fog'
            break
        case 'cloudy':
            weatherIcon = 'cloudy'
            break
        case 'partly-cloudy-day':
            weatherIcon = 'day-cloudy'
            break
        case 'partly-cloudy-night':
            weatherIcon = 'night-alt-cloudy'
            break
        default:
            break

    }

    // Messy I know
//     var str = `
// <div class="col-xs-4 col-sm-3 col-md-4 col-lg-3 weather-col">
//     <div class="panel panel-default">
//         <div class="panel-heading">
//             <h3 class="panel-title">${ dateString }</h3>
//         </div>
//         <div class="panel-body">
//             <i class="wi wi-fw wi-${ weatherIcon }"></i>
//             <br>
//             High: ${ high }
//             <br>
//             Low: ${ low }
//         </div>
//     </div>
// </div>`

    var str = `
<div class="col-4 col-md-6 col-lg-4 col-xl-3 weather-col">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">${ dateString }</h5>
        </div>
        <div class="card-block">
            <p class="card-text">High: ${ high }</p>
            <p class="card-text">Low: ${ low }</p>
        <!--</div>-->
        <!--<div class="card-block">-->
            <!--<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->
            <!--<i class="card-img-top wi wi-fw wi-${ weatherIcon }"></i>-->
            <!--<ul class="list-group list-group-flush">-->
                <!--<li class="list-group-item">High: ${ high }</li>-->
                <!--<li class="list-group-item">Low: ${ low }</li>-->
            <!--</ul>-->
        </div>
    </div>
</div>`

    var weatherRow = document.getElementById('weather-row')
    weatherRow.innerHTML += str

}

function fetchHospitals(loc) {
        //var loc = fetchCoordinates(Destination);
        var url = backend_base_url + '/emergency'
        console.log('Fetching Hospitals');
        //console.log(loc);
        $.getJSON(url, {
            longitude: loc.lng,
            latitude: loc.lat
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
    var myUrl = backend_base_url + '/geocode';
    var obj;
    $.ajax({
        url: myUrl,
        dataType: 'json',
        async: false,
        data:{
            address: place
        },
        success: function(data){
            $.each(data.results[0], function(key, value){
            if(key=='geometry'){
                obj = value.location
            }
        })
    }});
    console.log('TESTING fethCoordinates FUNCTION: ' + obj);
    return obj;
}

function fetchHospitalRoutine(destination){
    /*
     * fetchHospital runs before fetchCoordinate can finish, thus timeout
     */
    var loc = fetchCoordinates(destination);

    //wrap the function as else if you call a function with parameters, it runs immediately
    setTimeout(fetchHospitals.bind(null, loc), 5000);
}

