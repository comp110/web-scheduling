package com.example.helloworld.db;

import com.example.helloworld.core.Master;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;
import java.util.Optional;

public class MasterDAO extends AbstractDAO<Master> {
 

    public MasterDAO(SessionFactory factory) {
        super(factory);
    }

    public Optional<Master> findById(Long id) {
        return Optional.ofNullable(get(id));
    }	

    public Master create(Master person) {
        return persist(person);
    }
    
  /* public  List<Person>  update(Long id, Person person) {
      return  list(namedQuery("com.example.helloworld.core.Person.update").setParameter("id",id)
                                                                          .setParameter("start",person.getStart())
                                                                          .setParameter("end",person.getEnd()));
    }*/
 
    public Master saveOrUpdate(Master person) {
    return persist(person);
}
    public void delete(Master person) {
		if (person != null) {
			currentSession().delete(person);
		}
	}

    public List<Master> findAll() {
        return list(namedQuery("com.example.helloworld.core.Master.findAll"));
    }

    public List<Master> findDate(String date) {
        return  list(
                        namedQuery("com.example.helloworld.core.Master.findDate")
                        .setParameter("weekStartDate", date)
               );
    }
}
