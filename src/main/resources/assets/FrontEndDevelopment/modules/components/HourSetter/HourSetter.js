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
    "12pm",
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
            textAlign: 'center'
        };
    },
    handleClick: function(props){
        this.props.handleClick(props.hour, props.day);
    },
    render: function(){
        var available = workhoursStore.checkAvailability(this.props.hour, this.props.day);
        var bgcolor = available ? '#FFB100' : '#00bcec';
        var text = available ? '&#10003' : hourMap[this.props.hour];
        return (
            <td onClick={()=>this.handleClick(this.props)} style = {{backgroundColor: bgcolor,
                borderStyle: 'solid', height: 30, width: 50, textAlign: 'center'}}
                dangerouslySetInnerHTML={{__html: text}}>
            </td>
        )
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
        userStore.addChangeListener(this._onProfileChange);
        workhoursStore.addChangeListener(this._onWorkHourChange)
    },
    componentWillUnmount: function(){
        userStore.removeChangeListener(this._onProfileChange);
        workhoursStore.removeChangeListener(this._onWorkHourChange);
    },
    handleTDClick: function(i, j){
        workhoursActions.setWorkHour({hour:i,day: j});
    },
    handleClick : function(){
        getLoggedInUserProfile(function(profile) {
            userActions.setProfile(profile);
            var shifts = workhoursStore.getWorkableShifts();
            var basicAuthHash = getBasicAuthHash();
            console.log(shifts);
            var reduced_shifts = JSON.stringify(shifts);

            var nextdate = getNextSundayDate().toLocaleDateString()
             //grabs all the data
          $.ajax({
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
                headers: {
                  "Authorization": "BasicNoAuthPrompt " + basicAuthHash
                },
                    type: 'GET',
                    url: '/api/hoursetter/',
                    dataType: 'json',
                      success: function(data) {

                        //get the id
                        for(var i=0;i<data.length;i++){
                            var ID = data[i].id;
                            var weekstartdate = data[i].weekStartDate;
                            if(weekstartdate == nextdate && data[i].name == profile.name){
                                //delete to ensure clean hoursetter schedule
                                $.ajax({
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    headers: {
                                      "Authorization": "BasicNoAuthPrompt " + basicAuthHash
                                    },
                                    type: 'Delete',
                                    url: '/api/hoursetter/' + ID,
                                    dataType: 'json'
                                });
                            }
                        }

                        // Post new data
                        var xhttp = new XMLHttpRequest();

                        xhttp.open("POST", "/api/hoursetter",true);
                        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        xhttp.setRequestHeader("Authorization", "BasicNoAuthPrompt " + basicAuthHash);

                        xhttp.onreadystatechange = function(oEvent){
                            if(xhttp.status === 200 || xhttp.status === 201 || xhttp.status === 204){
                                // Get the snackbar DIV
                                var x = document.getElementById("snackbar")
                                // Add the "show" class to DIV
                                x.className = "show";
                                // After 3 seconds, remove the show class from DIV
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                            } else {
                                // Get the snackbar DIV
                                var x = document.getElementById("snackbarFailed")
                                // Add the "show" class to DIV
                                x.className = "show";
                                // After 3 seconds, remove the show class from DIV
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                            }
                        };

                        xhttp.send(reduced_shifts);
                        console.log(reduced_shifts);

                    }
                  });

        });


    },
    _onProfileChange: function(){
        this.setState({profile: userStore.getProfile()});
    },
    _onWorkHourChange: function(){
        this.setState({work_hours: workhoursStore.getWorkHours()});
    },
    render: function(){
        return(
            <div id="hoursetter" className="col-md-12">
                        <p>Please enter your hours for {getNextSundayDate().toLocaleDateString()}
                        - {getNextWeekEndDate().toLocaleDateString()}</p>
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
                        <button  onClick={this.handleClick}>Submit</button>


            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return(
            <div>
                <HourSetterTable/>
                <div id="snackbar">Success!</div>
                <div id="snackbarFailed">Error Submitting, Please Try Again</div>
            </div>
        );
    }
});

module.exports = App;
