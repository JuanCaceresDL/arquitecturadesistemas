package com.ventas.ventas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class VentasApplication extends SpringBootServletInitializer{

    public static void main(String[] args) {
        SpringApplication.run(VentasApplication.class, args);
    }

}
