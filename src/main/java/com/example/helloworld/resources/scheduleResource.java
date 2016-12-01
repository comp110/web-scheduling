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

import comp110.FXCrew.FXAlgo;
import comp110.KarenBot;
import comp110.Schedule;
//import javax.ws.rs.container;

@Path("/schedule/{date}")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class scheduleResource {
   // @Context ResourceContext rc;
    @GET
    @UnitOfWork
    public String getSchedule(@PathParam("date") String dateId) {
    dateId = dateId.replace('-', '/');
    KarenBot karenBot = new KarenBot(new FXAlgo());
    return  karenBot.run(dateId, 100, false);
    }

}
