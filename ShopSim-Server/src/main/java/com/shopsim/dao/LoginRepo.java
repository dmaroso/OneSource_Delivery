package com.shopsim.dao;

import com.shopsim.models.Store;
import com.shopsim.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

@Repository
@Transactional
public class LoginRepo {
    private SessionFactory sessionFactory;
    private static final Logger lrLog = LogManager.getLogger(LoginRepo.class);

    @PostConstruct
    public void initDB() {
        Session session = sessionFactory.openSession();
    }

    @Autowired
    public LoginRepo(SessionFactory sessionFactory) {
        lrLog.info("Creating Login Repo");
        this.sessionFactory = sessionFactory;
    }

    /**
     * Selects a list of stores that match passed in zipcode and returns the list of mapped Store objects
     * @param zip Target zipcode
     * @return List of mapped Store objects
     */
    @SuppressWarnings("unchecked")
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public List<Store> verifyZip(String zip) {
        Session session = sessionFactory.getCurrentSession();
        lrLog.info("Selecting Stores...");
        String hql = "from Store where zipcode =:zip";
        Query query = session.createQuery(hql);
        query.setInteger("zip", Integer.parseInt(zip));
        return query.list();
    }

    /**
     * Selects a User from the users table whose record matches the specified email and password parameters, and returns
     * the resulting mapped User object
     * @param email
     * @param password
     * @return User object
     */
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public User authenticate(String email, String password) {
        Session session = sessionFactory.getCurrentSession();
        lrLog.info("Selecting User...");
        String hql = "from User where email = :email and password = :password";
        Query query = session.createQuery(hql);
        query.setString("email", email);
        query.setString("password", password);
        List user = query.list();
        if (user.isEmpty()){
            return null;
        } else {
            return (User) query.list().get(0);
        }
    }

    /**
     * Saves passed in User object to database
     * @param user User object
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public void createUser(User user) {
        Session session = sessionFactory.getCurrentSession();
        lrLog.info("Saving New User...");
        session.save(user);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public void deleteTestEntry(String target) {
        Session session = sessionFactory.getCurrentSession();
        lrLog.info("Deleting Test User Entry from Database...");
        String hql = "delete from User u where u.email = :target";
        Query query = session.createQuery(hql);
        query.setString("target", target);
        query.executeUpdate();
    }
}
