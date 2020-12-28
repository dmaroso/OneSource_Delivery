package com.shopsim.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="item_list2")
public @Data class ItemList {
    @Id
    @Column(name = "orderId")
    private int orderId;

    @Column(name = "productId")
    private int productId;

    @Column(name = "quantity")
    private int quantity;

}
