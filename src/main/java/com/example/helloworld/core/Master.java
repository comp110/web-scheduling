package com.example.helloworld.core;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "master")

@NamedQueries({
        @NamedQuery(
            name = "com.example.helloworld.core.Master.findAll",
            query = "SELECT p FROM Master p"
        ),@NamedQuery(
            name = "com.example.helloworld.core.Master.findDate",
            query = "SELECT p FROM Master p where p.weekStartDate = :weekStartDate "
        )
    })
public class Master {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "day", nullable = false)
    private String day;
    
    @Column(name = "hour", nullable = false)
    private int hour;

    @Column(name = "numPeople", nullable = false)
    private int numPeople;

    @Column(name = "weekStartDate", nullable = false)
    private String weekstartdate;
	
    public Master() {
    }

    public Master( String day, int hour, int numPeople, String weekstartdate) {
       
    this.day= day;
	this.hour = hour;
    this.numPeople= numPeople;
	this.weekstartdate=weekstartdate;
	
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
 
    public void setWeekStartDate(String weekstartdate) {
        this.weekstartdate = weekstartdate;
    }

    public String getWeekStartDate() {
        return weekstartdate;
    }


    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getnumPeople() {
        return numPeople;
    }

    public void setnumPeople(int numPeople) {
        this.numPeople = numPeople;
    }

    public String toString(){
          return "{" + "\"day\":" + "\"" + this.day + "\""+",\"hour\":" + this.hour  +",\"numPeople\":"  + this.numPeople +",\"weekStartDate\":" + "\"" + this.weekstartdate +  "\"" +"}";
    }
}
