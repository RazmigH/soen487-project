package com.soen487.project.backend.controllers;

import com.soen487.project.backend.models.GasStation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by jeremybrown on 2017-03-29.
 */
@RestController
public class GasStationContoller {

    @RequestMapping(value = "/gas-stations", method = GET)
    public List<GasStation> getStationsNear(Double longitude, Double latitude, Integer kmRange) {
        List<GasStation> gList = new ArrayList<>();
        gList.add(new GasStation("Ultramar", "1234 St-Laurent Blvd., Montreal", -73.56745, 45.10101));
        gList.add(new GasStation("Petro Canada", "5678 St-Denis Blvd., Montreal", -73.54546, 45.10231));

        return gList;
    }
}
