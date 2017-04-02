package com.soen487.project.backend;

/**
 * Created by ericl on 4/1/2017.
 */

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RestaurantTests {


    @Autowired
    private MockMvc mvc;

    @Test
    public void getRestaurant() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/restaurant?longitude=-73.567&latitude=45.5&topN=3").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

                //.andExpect(content().string(equalTo("Greetings from Spring Boot!")));
        //https://maps.googleapis.com/maps/api/place/search/json?location=45.5016889,-73.56725599999999&radius=5000&types=restaurant&sensor=true&key=AIzaSyBkCd8eym318F-Dpp6-sFGSpdZqwfZ_1B0
    }
}
