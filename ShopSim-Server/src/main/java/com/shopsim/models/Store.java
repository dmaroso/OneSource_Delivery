package com.shopsim.models;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Stores")
public @Data class Store {

    @Id
    @Column(name = "ID")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "logo")
    private String logoUrl;

    @Column(name = "address")
    private String address;

    @Column(name = "zipcode")
    private int zipcode;
}
