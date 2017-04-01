package com.soen487.project.backend.controllers;

import com.soen487.project.backend.ServicesConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.plogitech.darksky.api.jackson.DarkSkyJacksonClient;
import tk.plogitech.darksky.forecast.*;
import tk.plogitech.darksky.forecast.model.Forecast;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by jeremybrown on 2017-03-29.
 */
@RestController
public class WeatherReportController {

    private final ServicesConfig servicesConfig;

    @Autowired
    public WeatherReportController(ServicesConfig servicesConfig) {
        this.servicesConfig = servicesConfig;
    }

    @RequestMapping(value = "/weather", method = GET)
    public Forecast getWeatherNear(@RequestParam Double longitude, @RequestParam Double latitude) {
        ForecastRequest request = new ForecastRequestBuilder()
                .key(new APIKey(servicesConfig.darkskyApiKey()))
                .exclude(ForecastRequestBuilder.Block.minutely)
                .exclude(ForecastRequestBuilder.Block.alerts)
                .location(new GeoCoordinates(new Longitude(longitude), new Latitude(latitude))).build();

        DarkSkyJacksonClient client = new DarkSkyJacksonClient();
        Forecast forecast = null;
        try {
             forecast = client.forecast(request);
        } catch (ForecastException e) {
            // TODO handle error
            e.printStackTrace();
        }
        return forecast;
    }
}
