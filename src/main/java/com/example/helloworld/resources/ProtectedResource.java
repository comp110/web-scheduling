package com.example.helloworld.resources;

import com.example.helloworld.core.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import io.dropwizard.hibernate.UnitOfWork;
@Path("/protected")
@Produces(MediaType.TEXT_PLAIN)
public class ProtectedResource {

    @PermitAll
    @GET
    @UnitOfWork
    public String showSecret(@Auth User user) {
        return "true";
    }

    @RolesAllowed("ADMIN")
    @GET
    @UnitOfWork
    @Path("admin")
    public String showAdminSecret(@Auth User user) {
        return "true";
    }
}
