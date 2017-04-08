package com.soen487.project.backend.controllers;

import com.soen487.project.backend.EnvHelper;
import com.soen487.project.backend.ServicesConfig;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by ericl on 4/1/2017.
 */
@RestController
public class RestaurantController {


    private final ServicesConfig servicesConfig;

    @Autowired
    public RestaurantController(ServicesConfig servicesConfig) {
        this.servicesConfig = servicesConfig;
    }

    /**
     * Return json string which contains top N rated restaurants
     * @param longitude
     * @param latitude
     * @param topN
     * @return
     */
    @RequestMapping(value = "/restaurant", method = GET)
    @ResponseBody
    public String getBestRestaurant(@RequestParam Double longitude, @RequestParam Double latitude, @RequestParam int topN) {
        String apiKey = EnvHelper.getSystemPropOrFallback("googlemaps.api.key", servicesConfig.googleMapsApiKey());
        Map<String, String> vars = new HashMap<>();
        vars.put("location", Double.toString(latitude)+","+Double.toString(longitude)); //lat + long
        vars.put("radius", "5000");
        vars.put("types","restaurant");
        vars.put("sensor","true");
        vars.put("key", apiKey); //get google developer api key
        //vars.put("key","xx-xx");
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject("https://maps.googleapis.com/maps/api/place/search/json?location={location}&radius={radius}&types={types}&sensor={sensor}&key={key}", String.class, vars);
        //System.out.println(result);
        JSONArray returnedList = new JSONArray();

        try {
            JSONObject jObject = new JSONObject(result);
            JSONArray restaurantsList = jObject.getJSONArray("results");
            //System.out.println("size:" + restaurantsList.length());
            ArrayList<JSONObject> list = new ArrayList<>();

            for (int i = 0; i < restaurantsList.length(); i++) {
                list.add((JSONObject) restaurantsList.get(i));
            }
            Collections.sort(list, new MyJSONComparator());

            if(topN > restaurantsList.length()) topN = restaurantsList.length(); //boundary limit
            for(int i = 0; i < topN; i++){
                returnedList.put(list.get(i));
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return returnedList.toString();
    }
}

/**
 * JSON Comparator
 */
class MyJSONComparator implements Comparator<JSONObject> {

    @Override
    public int compare(JSONObject o1, JSONObject o2) {
        Double v1 = 0.0;
        Double v2 = 0.0;
        try {
            v1 = Double.parseDouble(o1.get("rating").toString());
            v2 = Double.parseDouble(o2.get("rating").toString());

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return v2.compareTo(v1);
    }
}