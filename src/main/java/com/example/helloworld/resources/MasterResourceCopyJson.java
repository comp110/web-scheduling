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
@Path("/master/copytoJson/{date}")
@Produces(MediaType.APPLICATION_JSON)
public class MasterResourceCopyJson {

    private final MasterDAO peopleDAO;

    public MasterResourceCopyJson(MasterDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

    @GET
    @UnitOfWork
    
    public List<Master> listPeople(@PathParam("date") String dateId) {
        dateId =    dateId.replace('-', '/');
       String arr = peopleDAO.findDate(dateId).toString();   
       try{
         PrintWriter writer = new PrintWriter("data/week.json");
         writer.println(arr);
         writer.close();
     }catch (IOException e) {
        e.printStackTrace();
    }

    return peopleDAO.findDate(dateId);
}   


}