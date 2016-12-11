package com.example.helloworld.resources;

import com.example.helloworld.core.Person;
import com.example.helloworld.db.PersonDAO;
import io.dropwizard.hibernate.UnitOfWork;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.DELETE;
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
@Path("/officehours/{personId}")
@Produces(MediaType.APPLICATION_JSON)
public class OfficeHourResource {

    private final PersonDAO peopleDAO;

    public OfficeHourResource(PersonDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

    @DELETE
    @UnitOfWork
    public void delete(@PathParam("personId") LongParam personId,@Auth User user) {
         peopleDAO.delete(findSafely(personId.get()));
    }
    private Person findSafely(long personId) {
        return peopleDAO.findById(personId).orElseThrow(() -> new NotFoundException("No such user."));
    }
}
