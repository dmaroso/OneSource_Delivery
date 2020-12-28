package com.shopsim.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="Users")
public @Data class User {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="address")
    private String address;

    @Column(name="zipcode")
    private int zipcode;
}
