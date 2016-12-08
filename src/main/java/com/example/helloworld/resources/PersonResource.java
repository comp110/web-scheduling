package com.example.helloworld.resources;

import com.example.helloworld.core.Person;
import com.example.helloworld.db.PersonDAO;
import com.example.helloworld.views.PersonView;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.example.helloworld.core.Person;
import com.example.helloworld.db.PersonDAO;
import io.dropwizard.hibernate.UnitOfWork;
import java.util.List;
import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
@Path("/people/{personId}")
@RolesAllowed("la")
@Produces(MediaType.APPLICATION_JSON)
public class PersonResource {
    public final PersonDAO peopleDAO;

    public PersonResource(PersonDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

    @GET
    @UnitOfWork
    public Person getPerson(@PathParam("personId") LongParam personId,@Auth User user) {
        return findSafely(personId.get());
    }


    @PUT
    @UnitOfWork
    public Person updatePerson(@PathParam("personId") LongParam personId,Person person,@Auth User user) { 
        Person oldVersion = findSafely(personId.get());
        oldVersion.setStart(person.getStart());
        oldVersion.setEnd(person.getEnd());
        peopleDAO.saveOrUpdate(oldVersion);
        return oldVersion;
    }

   
    
    @DELETE
    @UnitOfWork
    public void delete(@PathParam("personId") LongParam personId,@Auth User user) {
    	 peopleDAO.delete(findSafely(personId.get()));
    }
    @GET
    @Path("/view_freemarker")
    @UnitOfWork
    @Produces(MediaType.TEXT_HTML)
    public PersonView getPersonViewFreemarker(@PathParam("personId") LongParam personId) {
        return new PersonView(PersonView.Template.FREEMARKER, findSafely(personId.get()));
    }

    @GET
    @Path("/view_mustache")
    @UnitOfWork
    @Produces(MediaType.TEXT_HTML)
    public PersonView getPersonViewMustache(@PathParam("personId") LongParam personId) {
        return new PersonView(PersonView.Template.MUSTACHE, findSafely(personId.get()));
    }

    private Person findSafely(long personId) {
        return peopleDAO.findById(personId).orElseThrow(() -> new NotFoundException("No such user."));
    }
}
