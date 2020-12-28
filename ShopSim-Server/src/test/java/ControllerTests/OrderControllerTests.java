package ControllerTests;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopsim.controllers.LoginController;
import com.shopsim.controllers.OrderController;
import com.shopsim.dao.LoginRepo;
import com.shopsim.dao.OrderRepo;
import com.shopsim.forms.ItemListForm;
import com.shopsim.forms.OrderForm;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/test-application-context.xml"})
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class OrderControllerTests {

    @Autowired
    WebApplicationContext wac;

    @Autowired
    OrderController orderController;

    @Autowired
    OrderRepo orderRepo;

    private MockMvc mockMvc;

    @Before
    public void setup(){
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void a_loadWacOrder() {
        ServletContext servletContext = wac.getServletContext();
        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(wac.getBean("orderController"));
    }
    // Order Submission Tests
    @Test
    public void b_postOrderSubmissionSuccess() throws Exception{
        OrderForm orderForm = new OrderForm();
        ItemListForm firstItem = new ItemListForm();
        ItemListForm secondItem = new ItemListForm();
        orderForm.setUserId(19);
        orderForm.setStoreId(1);
        orderForm.setOrderDate("test");
        orderForm.setDeliveryDate("test");
        orderForm.setPayMethod("test");
        firstItem.setProductId("1");
        firstItem.setQuantity(1);
        secondItem.setProductId("2");
        secondItem.setQuantity(2);
        ItemListForm[] items = {firstItem, secondItem};
        orderForm.setItems(items);

        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(orderForm);

        MvcResult result = this.mockMvc.perform(post("/submit")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(content))
                .andExpect(jsonPath("$.message").value("Order Submission Successful"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Order Submit Failed", result.getResponse());
    }
    @Test
    public void postOrderSubmissionSuccess() throws Exception{
        OrderForm orderForm = new OrderForm();
        ItemListForm firstItem = new ItemListForm();
        ItemListForm secondItem = new ItemListForm();
        orderForm.setUserId(19);
        orderForm.setStoreId(1);
        orderForm.setOrderDate("test");
        orderForm.setDeliveryDate("test");
        orderForm.setPayMethod("test");
        firstItem.setProductId("1");
        firstItem.setQuantity(1);
        secondItem.setProductId("2");
        secondItem.setQuantity(2);
        ItemListForm[] items = {firstItem, secondItem};
        orderForm.setItems(items);

        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(orderForm);

        MvcResult result = this.mockMvc.perform(post("/submit")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(content))
                .andExpect(jsonPath("$.message").value("Order Submission Successful"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Order Submit Failed", result.getResponse());
    }
    @Test
    public void postOrderSubmissionFail() throws Exception{
        OrderForm orderForm = new OrderForm();

        ObjectMapper objectMapper = new ObjectMapper();
        String content = objectMapper.writeValueAsString(orderForm);

        MvcResult result = this.mockMvc.perform(post("/submit")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(content))
                .andExpect(jsonPath("$.message").value("Order Submission Failed"))
                .andDo(print())
                .andReturn();
        Assert.assertNotNull("Order Submit Failed", result.getResponse());
    }

    @Test
    public void c_postRetrieveOrdersSuccess() throws Exception {
        MvcResult result = this.mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("userID", "19"))
                .andExpect(jsonPath("$.message").value("Orders Found For This UserId"))
                .andDo(print())
                .andReturn();
        orderRepo.deleteOrderEntry(19);
        Assert.assertNotNull("Order Submit Failed", result.getResponse());
    }

    @Test
    public void postRetrieveOrdersFail() throws Exception {
        MvcResult result = this.mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).param("userID", "test"))
                .andExpect(jsonPath("$.message").value("No Orders Exist For Entered UserId"))
                .andDo(print())
                .andReturn();
        orderRepo.deleteOrderEntry(19);
        Assert.assertNotNull("Order Submit Failed", result.getResponse());
    }


}
