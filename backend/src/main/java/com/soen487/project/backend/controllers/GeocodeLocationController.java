package com.soen487.project.backend.controllers;

/**
 * Created by Mande on 4/2/2017.
 */

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.soen487.project.backend.EnvHelper;
import com.soen487.project.backend.ServicesConfig;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeocodeLocationController {

    private ServicesConfig servicesConfig;

    @Autowired
    public GeocodeLocationController(ServicesConfig servicesConfig){
        this.servicesConfig = servicesConfig;
    }

    @RequestMapping(value="/geocode", method = RequestMethod.GET)
    public String getGeocode(@RequestParam String address) {
        String apiKey = EnvHelper.getSystemPropOrFallback("googlegeocode.api.key", servicesConfig.googleGeocodeApiKey());
        String input = address.replace(" ", "+");
        String url = "https://maps.googleapis.com/maps/api/geocode/json";
        try {
            HttpResponse<JsonNode> response = Unirest.get(url)
                    .queryString("address", input)
                    .queryString("key", apiKey)
                    .asJson();
            return response.getBody().getObject().toString();
        } catch(Exception e) {
            //e.printStackTrace();
        }
        return null;
    }
}

