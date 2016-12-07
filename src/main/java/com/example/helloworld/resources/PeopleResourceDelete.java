package com.example.helloworld.resources;

import com.example.helloworld.core.Person;
import com.example.helloworld.db.PersonDAO;
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
import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
@Path("/people/{date}")
   @RolesAllowed("BASIC_GUY")
@Produces(MediaType.APPLICATION_JSON)
public class PeopleResource {

    private final PersonDAO peopleDAO;

    public PeopleResource(PersonDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

   
    
    @GET
    @UnitOfWork
    public List<Person> listPeople(@PathParam("date") String dateId,@Auth User user) {
        return peopleDAO.findAll();
    }   
  

}
