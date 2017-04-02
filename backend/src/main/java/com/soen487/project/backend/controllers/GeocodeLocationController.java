package com.soen487.project.backend.controllers;

/**
 * Created by Mande on 4/2/2017.
 */

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
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
    public String getGeocode(@RequestParam String address){
        String input = address.replace(" ", "+");
        System.out.println(address);
        System.out.println(input);
        JSONObject obj = null;
        String url = "https://maps.googleapis.com/maps/api/geocode/json";
        try {
            HttpResponse<JsonNode> response = Unirest.get(url)
                    .queryString("address", input)
                    .queryString("key", servicesConfig.googleGeocodeApiKey())
                    .asJson();
            obj = response.getBody().getObject();
        }catch(Exception e){
            //e.printStackTrace();
        }
        return obj.toString();
    }
}

