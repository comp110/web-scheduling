package com.example.helloworld.db;

import com.example.helloworld.core.LA;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;
import java.util.Optional;

public class LADAO extends AbstractDAO<LA> {
 

    public LADAO(SessionFactory factory) {
        super(factory);
    }

    public Optional<LA> findById(Long id) {
        return Optional.ofNullable(get(id));
    }	

    public LA create(LA la) {
        return persist(la);
    }
    
 
 
    public LA saveOrUpdate(LA person) {
    return persist(person);
}
    public void delete(LA person) {
		if (person != null) {
			currentSession().delete(person);
		}
	}

    public List<LA> findAll() {
        return list(namedQuery("com.example.helloworld.core.LA.findAll"));
    }

 public List<LA> deletebyName(String name) {
        return list(namedQuery("com.example.helloworld.core.LA.Delete")   
                     .setParameter("name", name));
    }

 public List<LA> findDate(String date) {
           return  list(
                        namedQuery("com.example.helloworld.core.LA.findDate")
                        .setParameter("weekstartdate", date)
               );
    }


}
