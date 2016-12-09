import React from 'react'
var userStore = require('../../stores/userStore');
var userActions = require('../../actions/userActions');
var workhoursStore = require('../../stores/workhoursStore');
var workhoursActions = require('../../actions/workhoursActions');

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
        work_hours[i] = new Array(6);
        work_hours[i][0]={"day": "Sun", "isAvailable": false};
        work_hours[i][1]={"day": "Mon", "isAvailable": false};
        work_hours[i][2]={"day": "Tue", "isAvailable": false};
        work_hours[i][3]={"day": "Wed", "isAvailable": false};
        work_hours[i][4]={"day": "Thu", "isAvailable": false};
        work_hours[i][5]={"day": "Fri", "isAvailable": false};

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
    for(var j=0; j<6; j++){
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
	"week_start_date":getNextSundayDate().toLocaleDateString()
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
        if(this.state.backgroundColor=='#00bcec')
            return(
                 <td onClick={()=>this.handleClick(this.props)} style = {this.state}>
                    {hourMap[this.props.hour]}
                </td>
            );
        else
            return(
                 <td onClick={()=>this.handleClick(this.props)} style = {this.state}>
                    <div dangerouslySetInnerHTML={{__html: '&#10003'}} />
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
            </tr>
        );
    }
});


var HourSetterTable = React.createClass({
    getInitialState: function(){
        return {
            work_hours: workhoursStore.getWorkHours(),
            user: userStore.getUser(),
            profile: userStore.getProfile()
        };
    },
    componentWillMount(){
        this.setState({work_hours: workhours});
        console.log("User Check", this.state.user);
        console.log("Profile Check", this.state.profile);
        userStore.addChangeListener(this._onProfileChange);
        workhoursStore.addChangeListener(this._onWorkHourChange)
    },
    componentWillUnmount: function(){
        userStore.removeChangeListener(this._onProfileChange);
        workhoursStore.removeChangeListener(this._onWorkHourChange);
    },
    handleTDClick: function(i, j){
        //workhours = setWorkHour(i,j, workhours);
        this.setState({work_hours: workhours});
        workhoursActions.setWorkHour({hour:i,day: j});
    },
    handleClick : function(){
        //var shifts = createWorkableShifts(this.state.work_hours);
        var shifts = workhoursStore.getWorkableShifts();
        var basicAuthHash = getBasicAuthHash();
        var reduced_shifts = JSON.stringify(shifts);
            var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(){};
                xhttp.open("POST", "/api/hoursetter",true);
                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhttp.setRequestHeader("Authorization", "BasicNoAuthPrompt " + basicAuthHash);
                xhttp.send(reduced_shifts);
                console.log(reduced_shifts);
        },
        handleProfileClick: function(){
            var profile = {
                gender: this.refs.gender.value,
            experience: this.refs.experience.value,
            hoursCapacity: this.refs.hoursCapacity.value

        };
        userActions.setProfile(profile);
        this.refs.gender.value = '';
        this.refs.experience.value = '';
        this.refs.hoursCapacity.value = '';
        console.log("User Profile Check", userStore.getUserProfile());
    },
    _onProfileChange: function(){
        this.setState({profile: userStore.getProfile()});
    },
    _onWorkHourChange: function(){
        this.setState({work_hours: workhoursStore.getWorkHours()});
    },
    render: function(){
        return(
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6 inline-div profile-div">
                        <div className="row inner-profile">

                                <h2 className="form-signin-heading" style={{color:"white", alignContent: "center"}}>User Profile</h2>
                                <form className="form-signin">
                                    <h5>Name: {this.state.user.username}</h5>

                                    <select  ref="gender" style={{height: 40}} value={this.state.profile.gender} className="form-control">
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="transgender">transgender</option>
                                        <option value="other">other</option>
                                    </select>
                                    <select  ref="experience" style={{height: 40}} value={this.state.profile.experience} className="form-control">
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </select>
                                    <select  ref="hoursCapacity" style={{height: 40}} value={this.state.profile.hoursCapacity} className="form-control">
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>

                                    <h5>Week_Start_Date: {getNextSundayDate().toLocaleDateString()}</h5>
                                </form>


                            <button type="button" onClick={this.handleProfileClick} className="  col-md-4 offset-md-4 btn btn-primary active">Active Primary</button>
                        </div>
                    </div>
                    <div className="col-md-5 inline-div">
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
