package com.shopsim;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Component
@EnableWebMvc
public class App {

//    private UserRepo userRepo;
//    public App(){
//        System.out.println("Creating App");
//    }
//
//    @Autowired
//    public void setUserRepo(UserRepo userRepo) {
//        this.userRepo = userRepo;
//    }
//
//    public static void main(String[] args) {
//
//        ApplicationContext ac = new ClassPathXmlApplicationContext("WEB-INF/application-context.xml");
//        App app = ac.getBean(App.class);
//
//        System.out.println(app.userRepo.getUsers());
//
//        ((AbstractApplicationContext)ac).close();
//    }
}
