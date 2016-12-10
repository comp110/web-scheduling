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
@Table(name = "LearningAssistants")
@NamedQueries(
	    {
	        @NamedQuery(
	            name = "com.example.helloworld.core.LA.findAll",
	            query = "SELECT p FROM LA p"
	        ),@NamedQuery(
            name = "com.example.helloworld.core.LA.findDate",
            query = "SELECT p FROM LA p where p.weekstartdate = :weekstartdate "
             ),@NamedQuery(
            name = "com.example.helloworld.core.LA.Delete",
            query = "DELETE FROM LA p where p.name = :name"
             )
	    }
	)
public class LA {
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

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "experiencelevel", nullable = false)
    private int experiencelevel;

    @Column(name = "hourscapacity", nullable = false)
    private int hourscapacity;


    public LA() {
    }
    public LA(String name, String day, int start, int end, String weekstartdate,String gender, int experiencelevel, int hourscapacity) {
    this.name = name;
    this.day= day;
    this.end = end;
    this.weekstartdate=weekstartdate;
    this.start = start;
    this.gender = gender;
    this.experiencelevel = experiencelevel;
    this.hourscapacity = hourscapacity;
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
    public String getGender(){
        return gender;
    }
      public void setGender(String gender){
        this.gender= gender;
    }
    public int getHoursCapacity(){
        return hourscapacity;
    }
    public void setHoursCapacity(int hourscapacity){
        this.hourscapacity= hourscapacity;
    }
    public int getExperienceLevel(){
        return experiencelevel;
    }
    public void setExperienceLevel(int experiencelevel){
        this.experiencelevel= experiencelevel;
    }
    public void setWeekStartDate(String weekstartdate) {
        this.weekstartdate = weekstartdate;
    }

    public String getWeekStartDate() {
        return weekstartdate;
    }

    public void setFullName(String fullName) {
        this.name = fullName;
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

    public String toString() {
     return "{" + "\"id\":" + getId() + ",\"name\":" + "\"" + this.name +  "\""+",\"day\":" + "\"" + this.day +  "\""+",\"start\":" + this.start  +",\"end\":"  + this.end +",\"gender\":"+"\"" +this.gender +"\""+",\"weekStartDate\":" + "\"" + this.weekstartdate +  "\"" + ",\"hoursCapacity\":" +  this.hourscapacity + ",\"experienceLevel\":" + this.experiencelevel +"}";
    }
}
