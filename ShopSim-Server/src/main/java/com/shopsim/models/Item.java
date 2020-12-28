package com.shopsim.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties(value= {"items"})
@Table(name="item_list")
public @Data class Item {

    @EmbeddedId
    private ItemId itemId;

    @Column(name = "quantity")
    private int quantity;

}
