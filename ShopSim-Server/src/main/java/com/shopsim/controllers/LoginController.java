package com.shopsim.controllers;

import com.shopsim.dao.LoginRepo;
import com.shopsim.forms.LoginForm;
import com.shopsim.forms.NewUserForm;
import com.shopsim.forms.Response;
import com.shopsim.forms.ZipCodeForm;
import com.shopsim.models.Store;
import com.shopsim.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "")
@RequestMapping
public class LoginController {
    private static final Logger lcLog = LogManager.getLogger(LoginController.class);

    @Autowired
    private LoginRepo loginRepo;

    /**
     * <h3>zipCodeHandler</h3>
     * <p>
     *     handles post request mapped to localhost:8080/ShopSim/shop/zip and takes in the form parameter 'zip' which is then
     *     checked of null and valid digit count. The 'zip' is then passed into {@link LoginRepo#verifyZip(String) verifyZip}
     *     method, returning a list of {@link Store Store} with matching zipcodes. If empty, or original 'zip' parameter
     *     is invalid, the instantiated {@link Response Response} object has its <code>type</code> set to 'error' with a corresponding
     *     error message set to the <code>message</code> property. The <code>Store</code> list is then set to the <code>Response</code>'s
     *     <code>body</code> property. The handler then returns a <code>ResponseEntity</code> object to the request with its
     *     body set to the initialized <code>Response</code> object and a corresponding <code>HttpStatus</code> code.
     *     The handler is configured to consume only Content-Type: application/x-www-form-urlencoded from the request.
     * </p>
     * @param form User input zipcode for service verification
     * @return ResponseEntity<Response>
     */
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/zip", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Response> zipCodeHandler (ZipCodeForm form) {
        lcLog.info("Received ZipCode Authentication Post Request");
        String zip = form.getZipcode();
        Response resp = new Response();
        if (zip == null || zip.length() != 5) {
            resp.setType("error");
            if (zip == null)
            resp.setMessage("Invalid Zipcode Entered: null");
            else
            resp.setMessage("Invalid Zipcode Entered: " + zip);
            lcLog.warn("Invalid ZipCode Received, Returning Error Response");
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } else {
            lcLog.info("Retrieving Stores with Entered ZipCode...");
            List<Store> availableStores = loginRepo.verifyZip(zip);
            if (availableStores.isEmpty()) {
                resp.setType("error");
                resp.setMessage("No Services Exist for Entered Zipcode");
                lcLog.warn("No Stores Service Entered ZipCode, Returning Error Response");
                return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
            } else {
                resp.setType("data");
                resp.setMessage("Services Found in Your Area");
                resp.setBody(availableStores);
                lcLog.info("Stores Found in ZipCode, Returning Store List in Response");
                return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
            }
        }
    }
    /**
     * <h3>loginHandler</h3>
     * <p>
     *     handles post request mapped to localhost:8080/ShopSim/shop/login and takes in the form parameters 'email' and
     *     'password' which are first checked for validity then passed into the {@link LoginRepo#authenticate(String, String) authenticate}
     *     method. If no user object is returned or form parameters are invalid, a <code>Response</code> object is returned
     *     with type= 'error and a corresponding message. If successful a user object is returned in the <code>Response</code>
     *     body with type='data. The handler is configured to consume only Content-Type: application/x-www-form-urlencoded
     *     from the request.
     * </p>
     * @param loginForm User input form containing email and password
     * @return ResponseEntity<Response>
     */
    @CrossOrigin(origins = "*")
    @PostMapping(path= "/login", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Response> loginHandler(LoginForm loginForm) {
        lcLog.info("Received Login Authentication Post Request");
        Response resp = new Response();
        if (loginForm.getEmail() == null || loginForm.getPassword() == null) {
            resp.setMessage("Incomplete Information");
            resp.setType("error");
            lcLog.warn("Invalid Login Credentials, Returning Error Response");
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } else {
            lcLog.info("Authenticating User...");
            User currentUser = loginRepo.authenticate(loginForm.getEmail(), loginForm.getPassword());
            if (currentUser == null) {
                resp.setMessage("User does not exist");
                resp.setType("error");
                lcLog.warn("User Does not Exist, Returning Error Response");
                return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
            } else {
                resp.setMessage("Authentication Successful");
                resp.setType("data");
                resp.setBody(currentUser);
                lcLog.info("User Authenticated, Returning User Details in Response");
                return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
            }
        }
    }
    /**
     * <h3>creationHandler</h3>
     * <p>
     *     handles post request mapped to localhost:8080/ShopSim/shop/create and takes in the form parameters associated
     *     with the {@link NewUserForm NewUserForm} object, which are then assigned to a newly instantiated {@link User User}
     *     object's corresponding parameters. The new <code>User</code> object is then passed into the {@link LoginRepo#createUser(User) createUser}
     *     method and then consequently verified for persistence byt calling the <code>authenticate method</code>. If an error
     *     occurs, a corresponding <code>Response</code> is sent with type= 'error'. If successful, the newly created User
     *     object is returned in the Response body with type='data'. The handler is configured to consume only Content-Type:
     *     application/x-www-form-urlencoded from the request.
     * </p>
     * @param newUserForm User input form containing all properties mapped to the User object
     * @return ResponseEntity<Response>
     */
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/create", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<Response> creationHandler(NewUserForm newUserForm) {
        lcLog.info("Received User Registration Post Request");
        Response resp = new Response();
        User newUser = new User();
        newUser.setEmail(newUserForm.getEmail());
        newUser.setPassword(newUserForm.getPassword());
        newUser.setFirstName(newUserForm.getFirstName());
        newUser.setLastName(newUserForm.getLastName());
        newUser.setAddress(newUserForm.getAddress());
        newUser.setZipcode(newUserForm.getZipcode());
        try {
            lcLog.info("Saving User to Database...");
            loginRepo.createUser(newUser);
            lcLog.info("Retrieving User from Database...");
            newUser = loginRepo.authenticate(newUser.getEmail(), newUserForm.getPassword());
        } catch (Exception e) {
            newUser = null;
        }
        if (newUser == null) {
            resp.setMessage("Account Creation Failed");
            resp.setType("error");
            lcLog.warn("User Creation Failed, Returning Error Response");
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            resp.setMessage("Account Creation Successful");
            resp.setType("data");
            resp.setBody(newUser);
            lcLog.info("User Registered, Returning User Details in Response");
            return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
        }
    }


}
