package com.soen487.project.backend;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import org.aeonbits.owner.ConfigFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
                // Allow all from anywhere
                registry.addMapping("/*");
			}
		};
	}

	@Bean
    ServicesConfig servicesConfig() {
        return ConfigFactory.create(ServicesConfig.class);
    }

    @Autowired
    @Bean
    GeoApiContext geoApiContext(ServicesConfig config) {
        String apiKey = EnvHelper.getSystemPropOrFallback("googlemaps.api.key", config.googleMapsApiKey());
        return new GeoApiContext().setApiKey(apiKey);
    }
}
