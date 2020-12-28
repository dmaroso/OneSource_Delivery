package com.shopsim.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig { // call this whatever you
    @Bean
    public ObjectMapper objectMapper() {
        Hibernate4Module hbm = new Hibernate4Module();
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(hbm);
        return mapper;
    }
}
