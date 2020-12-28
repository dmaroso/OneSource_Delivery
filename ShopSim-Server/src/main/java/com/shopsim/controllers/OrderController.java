package com.shopsim.controllers;


import com.shopsim.config.ConfigUtil;
import com.shopsim.dao.LoginRepo;
import com.shopsim.dao.OrderRepo;
import com.shopsim.forms.*;
import com.shopsim.models.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin
public class OrderController {
    private static final Logger ocLog = LogManager.getLogger(OrderController.class);

    @Autowired
    private OrderRepo orderRepo;
    /**
     * <h3>orderSubmissionHandler</h3>
     * <p>
     *     handles post request mapped to localhost:8080/ShopSim/shop/submit and takes in the form parameters associated
     *     with the {@link OrderForm OrderForm} object, which are then assigned to a newly instantiated {@link Order Order}
     *     object's corresponding parameters. Each item associated with the order is subsequently mapped to a {@link ItemListForm ItemListForm}
     *     which is then mapped to a {@link Item Item} object. The order details are first persisted by passing the new <code>Order</code>
     *     into the {@link OrderRepo#submitOrder(Order)}  submitOrder} method. The order's persistence is then verified
     *     by calling the {@link OrderRepo#getOrderById(int) getOrderById} passing in the associated user Id with the submission.
     *     If successful, the list of associated ItemListForms are iterated over, mapping each to an Item object and then
     *     persisting via the {@link OrderRepo#saveItem(Item) saveItem} method. The order items are verified for persistence
     *     by calling the getOrderById method again and ensuring the Items property returned is not empty. If successful,
     *     The order details are returned in the Response body with typ='data' and corresponding message. The handler is
     *     configured to consume only Content-Type: application/json from the request.
     * </p>
     * @param orderForm order submission form containing all relevant properties of a mapped Order object
     * @return ResponseEntity<Response>
     */
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/submit", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Response> orderSubmissionHandler(@RequestBody OrderForm orderForm) {
        ocLog.info("Received Order Submission Post Request");
        Response resp = new Response();
        Order order = new Order();
        order.setUserId(orderForm.getUserId());
        order.setStoreId(orderForm.getStoreId());
        order.setOrderDate(orderForm.getOrderDate());
        order.setDeliveryDate(orderForm.getDeliveryDate());
        order.setPayMethod(orderForm.getPayMethod());
        try {
            orderRepo.submitOrder(order);
            ocLog.info("Saving Order to Database");
            order = orderRepo.getOrderById(order.getUserId());
            ocLog.info("Retrieving Saved Order");
        } catch (Exception e) {
            order = null;
            ocLog.warn("Order Submission Failed, Encountered: " + e);
        }
        if (order == null) {
            resp.setMessage("Order Submission Failed");
            resp.setType("error");
            ocLog.info("Returning Failed Order Submission Response");
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            int orderID = order.getId();
            for (ItemListForm item : orderForm.getItems()) {
                Item orderItem = new Item();
                ItemId itemId = new ItemId();
                itemId.setOrderId(orderID);
                itemId.setProductId(item.getProductId());
                orderItem.setItemId(itemId);
                orderItem.setQuantity(item.getQuantity());
                orderRepo.saveItem(orderItem);
                ocLog.info("Saving Order Item to Database");
            }
            ocLog.info("Retrieving Saved Items for Order");
            Order newOrder = orderRepo.getOrderById(order.getUserId());
            if (newOrder.getItems() == null) {
                resp.setMessage("Order Submission Failed");
                resp.setType("error");
                ocLog.info("Returning Failed Order Submission Response");
                return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                resp.setMessage("Order Submission Successful");
                resp.setType("data");
                resp.setBody(newOrder);
                ocLog.info("Order Submission Success, Returning Order Details in Response");
                return new ResponseEntity<>(resp, HttpStatus.CREATED);
            }
        }
    }
    /**
     * <h3>getAllUserOrders</h3>
     * <p>
     *     handles post request mapped to localhost:8080/ShopSim/shop/orders and takes in the form parameter userID which
     *     passed into the {@link OrderRepo#getOrdersByUserId(String) getOrdersById} returning a list of orders associated
     *     with specified ID. If successful, the list of orders are returned in the Response body with type= 'data'.
     *     he handler is configured to consume only Content-Type: application/x-www-form-urlencoded from the request.
     * </p>
     * @param userID User ID of requested orders
     * @return ResponseEntity<Response>
     */
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/orders", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Response> getAllUserOrders(UserIDForm userID) {
        ocLog.info("Received Order Retrieval Post Request");
        Response resp = new Response();
        String userId = userID.userID;
        List<Order> userOrders;
        try {
            userOrders = orderRepo.getOrdersByUserId(userId);
        } catch (Exception e) {
            resp.setType("error");
            resp.setMessage("No Orders Exist For Entered UserId");
            ocLog.warn("Order Submission Failed, Encountered: " + e);
            ocLog.info("Returning Failed Order Retrieval Response");
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        resp.setType("data");
        resp.setMessage("Orders Found For This UserId");
        resp.setBody(userOrders);
        ocLog.info("Order Retrieval Success, Returning Orders for User: " + userId + " in Response");
        return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
    }
}

