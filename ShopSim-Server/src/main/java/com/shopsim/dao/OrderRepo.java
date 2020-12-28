package com.shopsim.dao;


import com.shopsim.controllers.OrderController;
import com.shopsim.models.Item;
import com.shopsim.models.ItemList;
import com.shopsim.models.User;
import com.shopsim.models.Order;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Hibernate;
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
public class OrderRepo {
    private SessionFactory sessionFactory;
    private static final Logger orLog = LogManager.getLogger(OrderRepo.class);

    @PostConstruct
    public void initDB() {
        Session session = sessionFactory.openSession();
    }

    @Autowired
    public OrderRepo(SessionFactory sessionFactory) {
        orLog.info("Creating OrderRepo");
        this.sessionFactory = sessionFactory;
    }

    /**
     * Saves passed in order to database via calling the session.save method
     * @param order
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public void submitOrder(Order order) {
        orLog.info("Saving Order to Database...");
        Session session = sessionFactory.getCurrentSession();
        session.save(order);
    }

    /**
     * Selects list of orders sorted by order id descending, and returns a single mapped order object with the most recent ID
     * @param id Target User's ID
     * @return Order Object
     */
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public Order getOrderById (int id) {
        Session session = sessionFactory.getCurrentSession();
        orLog.info("Selecting User's Most Recent Order...");
        String hql = "from Order where userId =:id order by id DESC";
        Query query = session.createQuery(hql);
        query.setInteger("id", id);
        query.setMaxResults(1);
        Order order = (Order) query.list().get(0);
        Hibernate.initialize(order.getItems());
        return order;
    }

    /**
     * Selects all orders associated with passed in User's ID, and returns as a list of mapped Orders. Each order Item
     * is initialized via the Hibernate method to prevent lazy fetch errors.
     * @param id Target User's ID
     * @return List of mapped Order objects
     */
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public List<Order> getOrdersByUserId (String id) {
        Session session = sessionFactory.getCurrentSession();
        orLog.info("Selecting All User's Orders...");
        String hql = "from Order where userId =:id order by id DESC";
        Query query = session.createQuery(hql);
        query.setInteger("id", Integer.parseInt(id));
        List<Order> orders = query.list();
        for (int i = 0; i < orders.size(); i++) {
            Hibernate.initialize(orders.get(i).getItems());
        }
        return orders;
    }

    /**
     * Saves passed in mapped Item object to the database via the session.save method
     * @param item Single Item object associated with an order
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public void saveItem(Item item) {
        orLog.info("Saving Item to Database...");
        Session session = sessionFactory.getCurrentSession();
        session.save(item);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public void deleteOrderEntry(int id) {
        Session session = sessionFactory.getCurrentSession();
        orLog.info("Deleting Test Order Entry from Database...");
        String hql = "delete from Order o where o.userId = :id";
        Query query = session.createQuery(hql);
        query.setInteger("id", id);
        query.executeUpdate();
    }
}
