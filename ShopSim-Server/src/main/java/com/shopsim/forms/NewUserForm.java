package com.shopsim.forms;

import lombok.Data;

public @Data class NewUserForm {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String address;

    private int zipcode;
}
