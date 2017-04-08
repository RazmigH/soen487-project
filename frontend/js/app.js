// Roadtrip planner app
// Main functions

var GMAPS_API_KEY = 'AIzaSyCNrZAoJ8_xVKR7y7jHYPkX_P098AsZf3c'

var backend_base_url = 'https://soen487-project.herokuapp.com'
// var backend_base_url = 'http://localhost:8080'

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
        fetchWeather()
        fetchHospitalRoutine()
        fetchRestaurants()
        fetchGasStations()

    } else {
        // TODO better error message
        console.log(departure +" " + destination)
        alert('You must specify both departure and arrival!')
    }
}

function fetchDirections(departure, destination) {
    console.log('Fetching directions')
    if (departure && destination) {
        calcRoute(departure, destination)
        document.getElementById('directions-col').hidden = false
    }
}

function fetchRestaurants() {
    console.log('Fetching restaurants')
    makeRestaurantRequest(destPlace)
}

function fetchGasStations() {
    console.log('Fetching gas stations')
    makeGasStationsRequest(destPlace)
    document.getElementById('gas-stations-col').hidden = false
}

function fetchWeather() {
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
        $("#weather-row").empty();
        data.daily.data.forEach(function(d) {
            addWeatherDay(d)
        })
    })
}

function makeGasStationsRequest(place) {
    var loc = place.geometry.location
    var url = backend_base_url + '/gas-stations'

    var gasStationsCol = $("#gas-stations-col")

    $.getJSON(url, {
        longitude: loc.lng,
        latitude: loc.lat
    }).done(function(data) {
        gasStationsCol.empty();
        gasStationsCol.append('<h3>Gas Stations</h3>')
        gasStationsCol.append("<p>So you can keep on going</p>")
        gasStationsCol.append('<div class="list-group">')
        data = data.slice(0, 5)
        data.forEach(function(d) {
            var gasStationName = d.name
            var gasStationAdddress = d.vicinity
            var gasItem = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 gas-station-name">${ gasStationName }</h5>
    </div>
    <p class="mb-1">${ gasStationAdddress }</p>
</a>`
            gasStationsCol.append(gasItem)
        })
        gasStationsCol.append('</div>')
    })
}

function makeRestaurantRequest(place) {
    var loc = place.geometry.location
    var url = backend_base_url + '/restaurant'
    var lng = loc.lng()
    var lat = loc.lat()

    console.log(url + '?longitude=' + lat + '&latitude=' + lng + '&topN=3')

    $.getJSON(url, {
        longitude: lng,
        latitude: lat,
        topN: 3
    }).done(function(data) {
        displayRestaurant(data, place.name)
    })
}

function displayRestaurant(data, city) {
    var input = $("#restaurants-col")
    //clear its contents
    input.empty()
    input.append("<h3>Restaurants</h3>")
    input.append("<p>Best rated restaurants near " + city + "</p>")
    input.append('<div class="list-group">')

    console.log(data)

    $.each(data, function(index) {
        console.log(data[index])
        var restaurantName = data[index].name
        var restaurantRating = data[index].rating
        var restaurantVicinity = data[index].vicinity
        var restaurantPriceLevel = data[index].price_level
        var restaurantOpenNow = ''
        if (typeof data[index].opening_hours != 'undefined' && data[index].opening_hours.open_now) {
            restaurantOpenNow = 'Open Now'
        } else {
            restaurantOpenNow = 'Closed Now'
        }
        var restaurantHtml = '';
        if (restaurantPriceLevel) {
            restaurantHtml = `<p class="mb-1">Price level: ${ restaurantPriceLevel }</p>`
        }

        input.append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 restaurant-name">${ restaurantName }</h5>
        <small>${ restaurantOpenNow }</small>
    </div>
    <div class="d-flex w-100 justify-content-between">
        <p class="mb-1">${ restaurantVicinity }</p>
        <small>${ restaurantRating } star rating</small>
    </div>
    ${ restaurantHtml }
    
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
    var emList = $('#emergency-list')
    emList.empty()
    emList.append('<h3>Emergency Services</h3>')
    emList.append("<p>For Your Emergency Needs</p>")
    var url = backend_base_url + '/emergency'
    console.log('Fetching Hospitals')
    //console.log(loc);
    $.getJSON(url, {
        longitude: loc.lng,
        latitude: loc.lat
    },function (data) {
        emList.append('<div class="list-group">');
        $.each(data, function(key, value) {
            if (key == 'listings') {
                $.each(value, function(k, v) {
                    var emergencyName = v.name
                    var emergencyStreet = v.address.street
                    var emergencyCity = v.address.city
                    var emergencyPostalCode = v.address.pcode
                    var emergencyProvince = v.address.prov
                    var emergencyDistance = v.distance
                    emList.append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 emergency-name">${ emergencyName }</h5>
        <small>${ emergencyDistance } from destination</small>
    </div>
    <small>${ emergencyStreet }, ${ emergencyCity }, ${ emergencyPostalCode } ${ emergencyProvince }</small>
</a>`)
                })
            }
        })
        emList.append('</div>');
    })
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

function fetchHospitalRoutine() {
    /*
     * fetchHospital runs before fetchCoordinate can finish, thus timeout
     */
    // var loc = fetchCoordinates(destination);
    var place = destPlace
    var loc = place.geometry.location

    //wrap the function as else if you call a function with parameters, it runs immediately
    fetchHospitals(loc)
}

