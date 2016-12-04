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

@Path("/hoursetter/copytoJson")

@Produces(MediaType.APPLICATION_JSON)
public class LAResourceCopyJson {

    private final LADAO laDAO;

    public LAResourceCopyJson(LADAO laDAO) {
        this.laDAO = laDAO;
    }

  
    @GET
    @UnitOfWork
    @RolesAllowed("ADMIN")
    public String copylistLA(@PathParam("copy") final String copy, @Auth User user) {
       String arr = laDAO.findAll().toString();   
       try{
           PrintWriter writer = new PrintWriter("data/staff.json");
           writer.println(arr);
           writer.close();
       }catch (IOException e) {
        e.printStackTrace();
    }

    return  "success"; 
}   



}
