package com.soen487.project.backend.controllers;

import com.google.maps.GeoApiContext;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.soen487.project.backend.models.GasStation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by jeremybrown on 2017-03-29.
 */
@RestController
public class GasStationContoller {

    private GeoApiContext geoApiContext;

    @Autowired
    public GasStationContoller(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    @RequestMapping(value = "/gas-stations", method = GET)
    public PlacesSearchResult[] getStationsNear(@RequestParam Double longitude, @RequestParam Double latitude,
                                                @RequestParam(required = false, defaultValue = "2000") Integer mRange) {
        NearbySearchRequest req = PlacesApi.nearbySearchQuery(geoApiContext, new LatLng(latitude, longitude));
        req = req.radius(mRange);
        req = req.type(PlaceType.GAS_STATION);

        try {
            return req.await().results;
        } catch (ApiException | InterruptedException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
