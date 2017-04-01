# Roadtrip Planner Backend
Spring Boot Gradle project for the Roadtrip Planner backend.

## API Keys
The application looks for API keys for remote services in ```src/main/resources/services.properties```.
This file is ignored in Git for the purpose of not sharing the API keys with the world.

For our project team, you can find the default file in Slack.

For anyone else wanting to use this project, create the file in this form:
```
darksky.api.key = 'your-darksky-api-key'
googlemaps.api.key = 'your-googlemaps-api-key'
```

## Running
To run the dev server, simply go to the backend directory and run ```./gradlew bootRun```.
This will build the application and start the embedded Tomcat server at ```http://localhost:8080```.


## Built with
 - [Spring Boot](http://projects.spring.io/spring-boot/)
 - [Aeonbits Owner](http://owner.aeonbits.org)
 - [DarkSky](https://darksky.net/dev/)
 - [DarkSky Forecast Java API](https://github.com/200Puls/darksky-forecast-api)