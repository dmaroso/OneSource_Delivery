package com.shopsim.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public @Data class ItemId implements Serializable {

    @Column(name = "product_id")
    private String productId;

    @Column(name="order_id")
    private int orderId;

    public ItemId(){};

    public ItemId(String productId, int orderId) {
        this.productId = productId;
        this.orderId = orderId;
    }
}
