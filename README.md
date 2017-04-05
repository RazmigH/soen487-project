# Roadtrip Planner
Planning your roadtrip from start to finish.

Course project for SOEN 487, Winter 2017

## Functionality
The roadtrip planner application helps users plan their roadtrips by providing a relevant information from various sources in a convenient user interface. It provides information such as directions to the destination, weather at the destination, restaurants and gas stations along the route.

## Installation
### Backend
The backend acts as a proxy to the different APIs used by the application. It requests data from these APIs and presents them to the frontend as a common unified interface.

#### API Keys
You must provide keys for the APIs used by the application. It requires API keys from [DarkSky](https://darksky.net/dev/), and [Google Maps](https://developers.google.com/maps/). Keys can be provided to the application by putting them in `backend/src/main/resources/services.properties`. The file should be of the form:
```
darksky.api.key = 'your-darksky-api-key'
googlemaps.api.key = 'your-googlemaps-api-key'
```
etc.

#### Build
To build the backend, `cd` to the `backend` directory and run `./gradlew build`. This will output a runnnable JAR to `build/libs`, which you can then run as such: `java -jar <jar-name>.jar`. This will start the backend server at `http://localhost:8080`.

### Frontend
The frontend is a collection of static HTML, CSS and JavaScript. It can be used locally or hosted with a webserver such as [Apache](https://httpd.apache.org/) or [nginx](https://www.nginx.com/).

To connect to the backend, simply specify the base url in `frontend/js/app.js` as `backend_base_url`. The default is `http://localhost:8080`.

If you would like to make use of SASS and the CSS bundling, you will need to run the "gulp" script through `npm`.
To do this, you need npm (nodejs package manager) which is included with [NodeJS](https://nodejs.org/en/download/).

 - Once you have npm, open a command prompt window and navigate to the frontend directory. 
 - Run command `npm install`. This installs all of the required packages defined in `package.json`.
 - Run command `gulp` or `npm run gulp` to compile and bundle the css.
 
Note: This is not required, you can still make regular css files and include them in html.

## Built with
 - [Bootstrap](http://getbootstrap.com/)
 - [Spring Boot](http://projects.spring.io/spring-boot/)
 - [Google Maps API](https://developers.google.com/maps/)
 - [DarkSky](https://darksky.net/dev/) & [DarkSky Forecast API](https://github.com/200Puls/darksky-forecast-api)
 - [SASS](http://sass-lang.com/)
 - [Gulp](http://gulpjs.com/)
