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
@Table(name = "people")

@NamedQueries({
        @NamedQuery(
            name = "com.example.helloworld.core.Person.findAll",
            query = "SELECT p FROM Person p"
        )
    })
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "weekstartdate", nullable = false)
    private String weekstartdate;
    
    @Column(name = "day", nullable = false)
    private String day;
    
    @Column(name = "start", nullable = false)
    private int start;
    
    @Column(name = "end", nullable = false)
    private int end;
	
    public Person() {
    }

    public Person(String name, String day, int start, int end, String weekstartdate) {
    this.name = name;
    this.day= day;
	this.end = end;
	this.weekstartdate=weekstartdate;
	this.start = start;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
   public String getName() {
        return name;
    }

    public void setWeekStartDate(String weekstartdate) {
        this.weekstartdate = weekstartdate;
    }

    public String getWeekStartDate() {
        return weekstartdate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }
}
