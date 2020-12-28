package com.shopsim.forms;

import com.shopsim.models.Item;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Set;

public @Data class OrderForm {

    private int userId;
    private int storeId;
    private String orderDate;
    private String deliveryDate;
    private String payMethod;
    private ItemListForm[] items;
}

