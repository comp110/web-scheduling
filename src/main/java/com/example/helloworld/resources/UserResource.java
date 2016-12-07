package com.example.helloworld.resources;

import com.example.helloworld.core.User2;
import com.example.helloworld.db.UserDAO;
import io.dropwizard.hibernate.UnitOfWork;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import io.dropwizard.jersey.params.LongParam;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.List;
import javax.ws.rs.Consumes;

import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

@Path("/userDatabase")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    private final UserDAO userDAO;

    public UserResource(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @POST
    @UnitOfWork
   // @RolesAllowed("ADMIN")
    public User2 createPerson(User2 person) {
            userDAO.create(person);
            return person;
    }
   
    @GET
   // @RolesAllowed("ADMIN")
    @UnitOfWork
    public List<User2> listUser() {
        return userDAO.findAll();
    }   

}
