package com.shopsim.dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Repository
@Transactional
public class UserRepo {
    private SessionFactory sessionFactory;

    @PostConstruct
    public void initDB() {
        Session session = sessionFactory.openSession();
    }

    @Autowired
    public UserRepo(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
