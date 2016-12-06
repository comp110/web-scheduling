package com.example.helloworld.resources;

import com.example.helloworld.core.LA;
import com.example.helloworld.db.LADAO;
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
import java.util.List;


import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
@Path("/hoursetter/{personId}")
@Produces(MediaType.APPLICATION_JSON)
public class LAResourceID {
    public final LADAO laDAO;

    public LAResourceID(LADAO laDAO) {
        this.laDAO = laDAO;
    }

    @GET
    @RolesAllowed("BASIC_GUY")
    @UnitOfWork
    public LA getPerson(@PathParam("personId") LongParam personId, @Auth User user) {
        return findSafely(personId.get());
    }


    @PUT
    @RolesAllowed("BASIC_GUY")
    @UnitOfWork
    public LA updatePerson(@PathParam("personId") LongParam personId,LA person,@Auth User user) { 
  //   return peopleDAO.update(personId.get(),person);

        LA oldVersion = findSafely(personId.get());
        oldVersion.setStart(person.getStart());
        oldVersion.setEnd(person.getEnd());
        oldVersion.setDay(person.getDay());
        oldVersion.setHoursCapacity(person.getHoursCapacity());
        laDAO.saveOrUpdate(oldVersion);
        return oldVersion;
    }

   
    
    @DELETE
    @RolesAllowed("ADMIN")
    @UnitOfWork
    public void delete(@PathParam("personId") LongParam personId) {
        // peopleDAO.delete(person);
         laDAO.delete(findSafely(personId.get()));
    }
   

    private LA findSafely(long personId) {
        return laDAO.findById(personId).orElseThrow(() -> new NotFoundException("No such user."));
    }
}