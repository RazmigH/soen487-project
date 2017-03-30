// Roadtrip planner app
// Main functions

var API_KEY = 'AIzaSyCNrZAoJ8_xVKR7y7jHYPkX_P098AsZf3c'

function fetchDirections(departure, arrival) {
    // TODO
    console.log('Fetching directions')
    var start = document.getElementById('departure-text').value
    var end = document.getElementById('destination-text').value
    if (start && end) {
        calcRoute(start, end)
    } else {
        // TODO better
        alert('must specify both departure and arrival!')
    }

}

function fetchRestaurants(departure, arrival) {
    // TODO
    console.log('Fetching restaurants')
}

function fetchGasStations(departure, arrival) {
    // TODO
    console.log('Fetching gas stations')
}

function fetchWeather(departure, arrival) {
    // TODO
    console.log('Fetching weather')
}

function fetchTripInfo() {
    console.log('Fetching trip info')
    fetchDirections()
    //fetchRestaurants(departure, arrival)
    //fetchGasStations(departure, arrival)
    //fetchWeather(departure, arrival)
}
