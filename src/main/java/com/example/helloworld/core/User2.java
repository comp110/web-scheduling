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
@Table(name = "userTable")
@NamedQueries(
        {
            @NamedQuery(
                name = "com.example.helloworld.core.User2.findAll",
                query = "SELECT p FROM User2 p"
            ),@NamedQuery(
                name = "com.example.helloworld.core.User2.nameandpassword",
                query = "SELECT p FROM User2 p where p.name = :name "+ "and p.password = :password"
            )
        }
    )
public class User2  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "name", nullable = false)
    private  String name;
    @Column(name = "role", nullable = false)
    private  String role;
    @Column(name = "password", nullable = false)
    private  String password;

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

    public User2(){

    }
    public User2(String name, String role,String password,String day, int start, int end, String gender, int experiencelevel, int hourscapacity) {
        this.name = name;
        this.role = role;
        this.password = password;
        this.day= day;
    this.end = end;
    this.start = start;
    this.gender = gender;
    this.experiencelevel = experiencelevel;
    this.hourscapacity = hourscapacity;
    }

    public void setPassword(String password){
        this.password= password;
    }

    public String getPassword(){
        return password;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

     public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setRole(String role) {
        this.role= role;
    }
    public String getRole() {
        return role;
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
