package com.soen487.project.backend;

import org.aeonbits.owner.ConfigFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
    ServicesConfig init() {
        return ConfigFactory.create(ServicesConfig.class);
    }
}
