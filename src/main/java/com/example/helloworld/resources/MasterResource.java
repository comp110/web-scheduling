package com.example.helloworld.resources;

import com.example.helloworld.core.Master;
import com.example.helloworld.db.MasterDAO;
import io.dropwizard.hibernate.UnitOfWork;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import com.example.helloworld.views.PersonView;
import io.dropwizard.jersey.params.LongParam;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PathParam;
import java.io.*;
import java.io.PrintWriter;

import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
@Path("/master")
@RolesAllowed("ADMIN")
@Produces(MediaType.APPLICATION_JSON)
public class MasterResource {
    private final MasterDAO peopleDAO;
    public MasterResource(MasterDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

    @POST
    @UnitOfWork
    public void createPerson(Master[] person,@Auth User user) {
        for(int i =0 ; i < person.length; i ++){
            peopleDAO.create(person[i]);
        }
    }
    @GET
    @UnitOfWork
    public List<Master> listPeople(@Auth User user) {
    return peopleDAO.findAll();
}   


}