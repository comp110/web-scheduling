package com.example.helloworld.resources;

import com.example.helloworld.core.LA;
import com.example.helloworld.db.LADAO;
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
import java.io.*;
import java.io.PrintWriter;
import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
@Path("/hoursetter")
@Produces(MediaType.APPLICATION_JSON)
public class LAResource {

    private final LADAO laDAO;

    public LAResource(LADAO laDAO) {
        this.laDAO = laDAO;
    }

    @POST
    @RolesAllowed("BASIC_GUY")
    @UnitOfWork
    public void createPerson(LA[] person, @Auth User user) {
        for(int i =0 ; i < person.length; i ++){
            laDAO.create(person[i]);
        }
       // return peopleDAO.create(person);
    }


    @GET
    @RolesAllowed("BASIC_GUY")
    @UnitOfWork
    public List<LA> listLA(@Auth User user) {
    return  laDAO.findAll(); 
} 


}
