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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
function initializeWorkHours(){
    var work_hours =new Array(23);
    for(var i=0; i<23; i++){
        work_hours[i] = new Array(7);
        work_hours[i][0]={"day": "Sunday", "isAvailable": false};
        work_hours[i][1]={"day": "Monday", "isAvailable": false};
        work_hours[i][2]={"day": "Tuesday", "isAvailable": false};
        work_hours[i][3]={"day": "Wednesday", "isAvailable": false};
        work_hours[i][4]={"day": "Thursday", "isAvailable": false};
        work_hours[i][5]={"day": "Friday", "isAvailable": false};
        work_hours[i][6]={"day": "Saturday", "isAvailable": false};

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
	"week_start_date":"11/27/2016",
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
        
        console.log(shifts);
//        $.ajax({
//        	headers: {
//        		'Accept': 'application/json',
//        		'Content-Type': 'application/json'
//        	},
//        	type: 'POST',
//        	url: 'http://localhost:8080/hoursetter',
//        	data: JSON.stringify(shifts),
//        	dataType: 'json',
//        	success: function() {
//        		alert('Success');
//        	}
//        });
//                               
    },
    render: function(){
        return(
            <div>
                <table>
                    <thead>
                        <th>Sun  </th>
                        <th>Mon  </th>
                        <th>Tue  </th>
                        <th>Wed  </th>
                        <th>Thu  </th>
                        <th>Fri  </th>
                    </thead>
                    <HourSetterRow handleClick={this.handleTDClick} hour={8} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={9} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={10} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={11} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={12} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={13} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={14} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={15} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={16} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={17} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={18} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={19} />
                    <HourSetterRow handleClick={this.handleTDClick} hour={20} />
                </table>
                <button id= "button" onClick={this.handleClick}>Submit</button>
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
