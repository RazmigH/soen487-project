package com.soen487.project.backend;

import org.aeonbits.owner.Config;
import static org.aeonbits.owner.Config.Sources;

/**
 * Created by jeremybrown on 2017-04-01.
 */
@Sources({"classpath:services.properties"})
public interface ServicesConfig extends Config {

    @Key("darksky.api.key")
    String darkskyApiKey();

    @Key("googlemaps.api.key")
    String googleMapsApiKey();
}