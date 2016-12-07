import React from 'react'

var hourMap = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12am",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm"    
];
var dayMap = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
function initializeWorkHours(){
    var work_hours =new Array(23);
    for(var i=0; i<23; i++){
        work_hours[i] = new Array(7);
        work_hours[i][0]={"day": "Sun", "isAvailable": false};
        work_hours[i][1]={"day": "Mon", "isAvailable": false};
        work_hours[i][2]={"day": "Tue", "isAvailable": false};
        work_hours[i][3]={"day": "Wed", "isAvailable": false};
        work_hours[i][4]={"day": "Thu", "isAvailable": false};
        work_hours[i][5]={"day": "Fri", "isAvailable": false};
        work_hours[i][6]={"day": "Sat", "isAvailable": false};

    }
    return work_hours;
}

function setWorkHour(i,j, work_hours){
    work_hours[i][j].isAvailable = (checkAvailability(i,j, work_hours))? false: true;
    return work_hours;
}

function checkAvailability(i,j,work_hours){
    return work_hours[i][j].isAvailable;
}
function getDay(i,j,work_hours) {
    return work_hours[i][j].day;
}
function createWorkableShifts(work_hours){
    var start_time = -1;
    var end_time=0;
    var workable_shifts = [];
    for(var j=0; j<7; j++){
        start_time=-1;
        end_time=0;
        for(var i = 0; i<23; i++){
            if(start_time==-1 && checkAvailability(i,j,work_hours)==true){
                start_time=i;
            } else if(start_time!=-1 && (checkAvailability(i,j,work_hours)==true && checkAvailability(i+1,j,work_hours)==false)){
                end_time=i+1;
                workable_shifts.push({
                    "name": Profile.name,
                    "gender": Profile.gender,
                    "experienceLevel": Profile.experience_level,
                    "hoursCapacity": Profile.hours_capacity,
                    "weekStartDate": Profile.week_start_date,
                    "day":getDay(i,j,work_hours), 
                    "start":start_time, 
                    "end": end_time
                });
                start_time=-1;
                end_time=0;
            } else if(start_time!=-1 && (checkAvailability(i,j,work_hours)==false && checkAvailability(i-1,j,work_hours)==true)){
                end_time=i;
                workable_shifts.push({
                    "name": Profile.name,
                    "gender": Profile.gender,
                    "experienceLevel": Profile.experience_level,
                    "hoursCapacity": Profile.hours_capacity,
                    "weekStartDate": Profile.week_start_date,
                    "day":getDay(i,j,work_hours), 
                    "start":start_time, 
                    "end": end_time
                });
                start_time=-1;
                end_time=0;
            }
        }
    }
    return workable_shifts;
}

var workhours = initializeWorkHours();
var Profile = {
    "name":"COMP 110 LA",
	"gender": "male",
	"experience_level": 3,
	"hours_capacity": 4,
	"week_start_date":"12/04/2016",
};

var HourSetterTableData = React.createClass({
    getInitialState: function(){
        return {
            id: 0,
            borderStyle: 'solid',
            height: 30,
            width: 50,
            textAlign: 'center',
            backgroundColor:'#00bcec'
        };
    },
    handleClick: function(props){
        this.setState({
            backgroundColor: (this.state.backgroundColor=='#FFB100') ? '#00bcec' : '#FFB100'
        });
        this.props.handleClick(props.hour, props.day);
    },
    render: function(){
        return(
             <td onClick={()=>this.handleClick(this.props)} style = {this.state}>
                {dayMap[this.props.day]}
                <br></br>
                {hourMap[this.props.hour]}
            </td>
        );
    }
});

//This:
//<td onClick={()=>this.props.handleClick(this.state.id)} style = {this.state}>
//is just syntactic sugar for this:
//<td onClick={this.props.handleClick.bind(this,this.state.id)} style = {this.state}>

var HourSetterRow = React.createClass({
    render: function(){
        return(
            <tr>
                <HourSetterTableData handleClick={this.props.handleClick} day = {0} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {1} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {2} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {3} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {4} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {5} hour={this.props.hour}/>
                <HourSetterTableData handleClick={this.props.handleClick} day = {6} hour={this.props.hour}/>
            </tr>
        );
    }
});


var HourSetterTable = React.createClass({
    getInitialState: function(){
        return {
            work_hours: workhours
        };
    },
    componentWillMount(){
//        workhours = initializeWorkHours();
        this.setState({work_hours: workhours});
    }, 
    handleTDClick: function(i, j){
        workhours = setWorkHour(i,j, workhours);
        this.setState({work_hours: workhours});
    },
    handleClick : function(){
        var shifts = createWorkableShifts(this.state.work_hours);
        
        
        var reduced_shifts = JSON.stringify(shifts);
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){};
            xhttp.open("POST", "/api/hoursetter",true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(reduced_shifts);
            console.log(reduced_shifts);
        
//        for(var shift of shifts){
//            reduced_shift= JSON.stringify(shift);
//            
//        }
        

        
                     
    },
    render: function(){
        return(
            <div>
                <div className="col-md-12">
        <div className="row">
            <div className="col-md-6 inline-div profile-div">
                <div className="row inner-profile">
                    <div className="col-md-3 offset-md-4">
                    <h3>User Profile</h3>
                    Username: Sally<br></br>
                    Gender: Female<br></br>
                    Experience: 3<br></br>
                    Hours Capacity: 3<br></br>
                    Week_Start_Date: 12/05/2016<br></br>
                    </div>
                    <button type="button" className="  col-md-4 offset-md-4 btn btn-primary active">Active Primary</button>
                </div>
            </div>
            <div className="col-md-5 inline-div">
                <table className="table table-striped table-bordered table-inverse hourSetTable">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">8 am</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">9 am</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">10 am</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">11 am</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">12 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">1 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">2 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">3 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">4 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">5 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">6 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">7 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                        <tr>
                            <th scope="row">8 pm</th>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                            <td><div dangerouslySetInnerHTML={{__html: '&#10003'}} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return(
            <div>
                <HourSetterTable/>
            </div>
        );
    }
});

module.exports = App;
