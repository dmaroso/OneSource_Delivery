package com.shopsim.models;


import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Orders")
public @Data class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "store_id")
    private int storeId;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "delivery_date")
    private String deliveryDate;

    @Column(name = "payment_method")
    private String payMethod;

    @OneToMany(mappedBy = "itemId.orderId")
    private Set<Item> items;
}
