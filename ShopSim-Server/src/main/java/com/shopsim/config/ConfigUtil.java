package com.shopsim.config;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.util.Objects;
import java.util.Properties;

@Configuration
@PropertySource("classpath:db.properties")
@EnableTransactionManagement
public class ConfigUtil {
    private static final Logger cuLog = LogManager.getLogger(ConfigUtil.class);

    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() {
        cuLog.info("Setting up datasource bean");
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(env.getProperty("db.url"));
        ds.setUsername(env.getProperty("db.username"));
        ds.setPassword(env.getProperty("db.password"));
        ds.setDriverClassName(org.postgresql.Driver.class.getName());
        return ds;
    }

    @Bean
    public LocalSessionFactoryBean entityManager() {
        cuLog.info("Setting session factory bean");
        LocalSessionFactoryBean sf = new LocalSessionFactoryBean();
        sf.setDataSource(dataSource());
        sf.setPackagesToScan("com.shopsim.models");
        sf.setHibernateProperties(getHibernateProperties());
        return sf;
    }

    @Bean
    public HibernateTransactionManager transactionManager() {
        cuLog.info("Setting up transaction bean");
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(entityManager().getObject());
        return txManager;
    }

    private Properties getHibernateProperties() {
        Properties props = new Properties();
        props.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL9Dialect");
        props.setProperty("hibernate.show_sql", "true");
        props.setProperty("hibernate.format_sql", "true");
        props.setProperty("hibernate.jdbc.lob.non_contextual_creation", "true");
        return props;
    }
}
