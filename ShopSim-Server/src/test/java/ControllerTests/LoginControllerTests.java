package ControllerTests;

import com.shopsim.controllers.LoginController;
import com.shopsim.dao.LoginRepo;
import com.shopsim.forms.ItemListForm;
import com.shopsim.forms.OrderForm;
import com.shopsim.forms.Response;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.Arrays;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/test-application-context.xml"})
@WebAppConfiguration
public class LoginControllerTests {

    @Autowired
    WebApplicationContext wac;

    @Autowired
    LoginController loginController;

    @Autowired
    LoginRepo loginRepo;

    private MockMvc mockMvc;

    @Before
    public void setup(){
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void loadWacLogin() {
        ServletContext servletContext = wac.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(wac.getBean("loginController"));
    }
    // ZipCode Tests
    @Test
    public void postZipAuthenticationFail() throws Exception{

        MvcResult result = this.mockMvc.perform(post("/zip")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("zipcode","23540"))
                .andExpect(jsonPath("$.message").value("No Services Exist for Entered Zipcode"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Zipcode Failed", result.getResponse());
    }

    @Test
    public void postZipAuthenticationInvalid() throws Exception{

        MvcResult result = this.mockMvc.perform(post("/zip")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("zipcode","test"))
                .andExpect(jsonPath("$.message").value("Invalid Zipcode Entered: test"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Zipcode Failed", result.getResponse());
    }

    @Test
    public void postZipAuthenticationSuccess() throws Exception{

        MvcResult result = this.mockMvc.perform(post("/zip")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("zipcode","78201"))
                .andExpect(jsonPath("$.message").value("Services Found in Your Area"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Zipcode Failed", result.getResponse());
    }
    // LoginTests
    @Test
    public void postLoginAuthenticationInvalid() throws Exception {

        MvcResult result = this.mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("email","email"))
                .andExpect(jsonPath("$.message").value("Incomplete Information"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Login Failed", result.getResponse());
    }

    @Test
    public void postLoginAuthenticationFailed() throws Exception {

        MvcResult result = this.mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("email","email").param("password","password"))
                .andExpect(jsonPath("$.message").value("User does not exist"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Login Failed", result.getResponse());
    }

    @Test
    public void postLoginAuthenticationSuccess() throws Exception {

        MvcResult result = this.mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("email","test").param("password","test"))
                .andExpect(jsonPath("$.message").value("Authentication Successful"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Login Failed", result.getResponse());
    }
    // User Creation Tests
    @Test
    public void postUserCreationFail() throws Exception {

        MvcResult result = this.mockMvc.perform(post("/create")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("firstName","test")
                .param("lastName","test")
                .param("email","test")
                .param("password","test")
                .param("address","test")
                .param("zipcode","1234"))
                .andExpect(jsonPath("$.message").value("Account Creation Failed"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Creation Failed", result.getResponse());
    }
    @Test
    public void postUserCreationSuccess() throws Exception {

        MvcResult result = this.mockMvc.perform(post("/create")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("firstName","tempTest")
                .param("lastName","tempTest")
                .param("email","tempTest")
                .param("password","tempTest")
                .param("address","tempTest")
                .param("zipcode","12345"))
                .andExpect(jsonPath("$.message").value("Account Creation Successful"))
                .andDo(print())
                .andReturn();
        loginRepo.deleteTestEntry("tempTest");
        Assert.assertNotNull("Creation Failed", result.getResponse());
    }

}