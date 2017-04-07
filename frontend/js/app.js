// Roadtrip planner app
// Main functions

var GMAPS_API_KEY = 'AIzaSyCNrZAoJ8_xVKR7y7jHYPkX_P098AsZf3c'

var backend_base_url = 'https://soen487-project.herokuapp.com'

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"
    ]

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

// Let 'enter' key pressed in destination input box simulate 'GO!' button press
$('#destination-text').keypress(function(event) {
    if (event.keyCode == 13) {  // enter key pressed
        fetchTripInfo();
    }
})

function fetchTripInfo() {
    var departure = document.getElementById('departure-text').value
    var destination = document.getElementById('destination-text').value

    if (departure && destination) {
    
        console.log('Fetching trip info')
        fetchDirections(departure, destination)
        fetchWeather(departure, destination)
        fetchHospitalRoutine(destination)
        fetchRestaurants(departure, destination)
        //fetchGasStations(departure, arrival)

        //Testing Purposes
        //fetchCoordinates(destination)
    } else {
        // TODO better error message
        console.log(departure +" " + destination)
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
    console.log('Fetching restaurants')
    makeRestaurantRequest(destPlace)
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
        $("#weather-row").html('');
        data.daily.data.forEach(function(d) {
            addWeatherDay(d)
        })
    })
}

function makeRestaurantRequest(place) {
    var loc = place.geometry.location
    var url = backend_base_url + '/restaurant'
    //console.log(place.name)

    $.getJSON(url, {
        longitude: loc.lng,
        latitude: loc.lat,
        topN: 3
    }).done(function(data) {
        displayRestaurant(data, place.name)
    })
}

function displayRestaurant(data, city){ //eric
    $("#restaurants-col").html(''); //clear its contents
    var input = $("#restaurants-col");
    input.append("<h3>Restaurants</h3> <p>Best rated restaurants near " + city + "</p>")
    input.append('<div class="list-group">');

    $.each(data, function(index) {
        console.log(data[index])
        var restaurantName = data[index].name
        var restaurantRating = data[index].rating
        var restaurantVicinity = data[index].vicinity
        var restaurantPriceLevel = data[index].price_level
        var restaurantOpenNow = ''
        if (typeof data[index].opening_hours != 'undefined' && data[index].opening_hours.open_now)
            restaurantOpenNow = 'Open Now'
        else
            restaurantOpenNow = 'Closed Now'

        input.append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 restaurant-name">${ restaurantName }</h5>
        <small>${ restaurantOpenNow }</small>
    </div>
    <p class="mb-1">${ restaurantRating } star rating</p>
    <p class="mb-1">Price level: ${ restaurantPriceLevel }</p>
    <small>${ restaurantVicinity }</small>
</a>`)
    })
    input.append('</div>')
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
    var weekday = weekdays[dt.getDay()]
    var date = dt.getDate()
    var month = monthNames[dt.getMonth()]

    var high = Math.round(dayData.temperatureMax)
    var low = Math.round(dayData.temperatureMin)
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
    var str = `
<div class="col-4 col-md-6 col-lg-4 col-xl-3 weather-col">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">${ weekday }</h5>
            <h6 class="card-subtitle">${ month } ${ date }</h6>
        </div>
        <div class="card-block">
            <!--<i class="card-img-top wi wi-fw wi-${ weatherIcon }"></i>-->
            <p class="card-text">${ high } / ${ low }</p>
        </div>
    </div>
</div>`

    var weatherRow = document.getElementById('weather-row')
    weatherRow.innerHTML += str

}

function fetchHospitals(loc) {
        //var loc = fetchCoordinates(Destination)
        $('#emergency-list').empty()
        var url = backend_base_url + '/emergency'
        console.log('Fetching Hospitals')
        //console.log(loc);
        $.getJSON(url, {
            longitude: loc.lng,
            latitude: loc.lat
        },function (data){
            $.each(data, function(key, value) {
                if(key=='listings') {
                    $.each(value, function(k, v) {
                        console.log(v.name + ',' + v.address.city + ',' + v.distance + ',');
                         $('#emergency-list').append('<li><u>'+ v.name + '</u><br>Address: ' + v.address.street + ', '
                             + v.address.city + ', ' + v.address.pcode + v.address.prov + '<br> Distance from Destination: '
                             + v.distance + '</li>')
                    });
                }
            })
        });
}

function fetchCoordinates(place) {
    console.log(place)
    console.log('Fetching Coordinates')
    var myUrl = backend_base_url + '/geocode'
    var obj
    $.ajax({
        url: myUrl,
        dataType: 'json',
        async: false,
        data:{
            address: place
        },
        success: function(data){
            $.each(data.results[0], function(key, value) {
            if (key=='geometry') {
                obj = value.location
            }
        })
    }})
    console.log('TESTING fethCoordinates FUNCTION: ' + obj)
    return obj
}

function fetchHospitalRoutine(destination){
    /*
     * fetchHospital runs before fetchCoordinate can finish, thus timeout
     */
    var loc = fetchCoordinates(destination);

    //wrap the function as else if you call a function with parameters, it runs immediately
    setTimeout(fetchHospitals.bind(null, loc), 1000);
}

