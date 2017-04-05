package com.soen487.project.backend.controllers;

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

/**
 * Created by Mande on 4/2/2017.
 */
@RestController
public class EmergencyServiceController {

    private ServicesConfig servicesConfig;

    @Autowired
    public EmergencyServiceController(ServicesConfig servicesConfig){
        this.servicesConfig = servicesConfig;
    }

    @RequestMapping(value="/emergency", method = RequestMethod.GET)
    public String getEmergencyInformation(@RequestParam Double longitude, @RequestParam Double latitude) {
        String apiKey = EnvHelper.getSystemPropOrFallback("yellowpages.api.key", servicesConfig.yellowPagesApiKey());
        String url = "http://api.sandbox.yellowapi.com/FindBusiness/";
        try {
            HttpResponse<JsonNode> response = Unirest.get(url)
                    .queryString("what", "Hospital")
                    .queryString("where", "cZ" + longitude + "," + latitude)
                    .queryString("pgLen", "5")
                    .queryString("fmt", "JSON")
                    .queryString("UID", "1")
                    .queryString("apikey", apiKey)
                    .asJson();
            return response.getBody().getObject().toString();
        } catch(Exception e) {
//                e.printStackTrace();
        }
        return null;
    }
}
