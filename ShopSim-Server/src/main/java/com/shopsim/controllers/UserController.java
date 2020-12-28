package com.shopsim.controllers;


import com.shopsim.dao.LoginRepo;
import com.shopsim.dao.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserRepo userRepo;

    //what functionality do we need to add here that isn't in the login controller?

}