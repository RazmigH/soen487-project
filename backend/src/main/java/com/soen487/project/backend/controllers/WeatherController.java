package com.soen487.project.backend.controllers;

import com.soen487.project.backend.models.GasStation;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by jeremybrown on 2017-03-29.
 */
public class WeatherController {

    @RequestMapping(value = "/weather", method = GET)
    public List<GasStation> getWeatherNear(Double longitude, Double latitude) {
        // TODO return weather reports
        return null;
    }

}
