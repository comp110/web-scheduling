var NameArea = React.createClass({
    render: function(){
        return (
            <div>
               Name:<br/>
               <input type="text" placeholder="Enter your name here..."></input>
                
            </div>
        );
    }
});

var GenderArea = React.createClass({
    render: function(){
        return(
            <div id="gender">
                Gender: <br/>
                <table>
                    <tr>
                    <input  type="radio"/>Male 
                    <input type="radio"/>Female
                    <input type="radio"/>Other 
                    <input type="radio"/>Wish not to Disclose <br/>
                    </tr>
                </table>
            </div>
        );
    }
});

var ExperienceLevelSelectTableData = React.createClass({
    getInitialState: function(){
        return {
            borderStyle: 'solid',
//            height: 30,
//            width: 50,
            textAlign: 'center',
//            backgroundColor: 'white'
        };
    },
    handleClick: function(){
        this.setState({
            backgroundColor: (this.state.backgroundColor=='#FFB100') ? '#00bcec': '#FFB100'
        });
    },
    render: function(){
        return(
            <td onClick={()=>this.handleClick()} style = {this.state}>
             {this.props.level}
            </td>
        );
    }
});

var ExperienceLevelArea = React.createClass({
    render: function(){
        return(
            <div id="level">
                <table>
                    <caption>Experience Level</caption>
                    <tr>
                        <ExperienceLevelSelectTableData level="Novice"/>
                        <ExperienceLevelSelectTableData level="Intermediate"/>
                        <ExperienceLevelSelectTableData level="Advanced"/>
                    </tr>
                </table>
            </div>
        );
    }
});
var UserInfoBox = React.createClass({
    render: function(){
        return (
            <div id="userArea">
                <h3>User Info Area</h3>
                <NameArea/>
                <GenderArea/>
                <ExperienceLevelArea/>
            </div>
        );
    }
});
var HourCapacityArea = React.createClass({
    getInitialState: function(){
        return {value:0}
    },
    lowerCap: function(){
        if(this.state.value>0)
            this.setState(function(previousState, currentProps) {
                    return {value: previousState.value - 1};
                });
        
    },
    raiseCap: function(){
        if(this.state.value<10)
            this.setState(function(previousState, currentProps) {
                    return {value: previousState.value + 1};
                });
        
    },
    render: function(){
        return(
            <div>
                <button id="button" onClick={this.lowerCap}><b>-</b></button>
                <h4>{this.state.value}</h4>
                <button id="button" onClick={this.raiseCap}><b>+</b></button>
            </div>
        );
    }
});

var DaySelectTableData = React.createClass({
    getInitialState: function(){
        return {
            borderStyle: 'solid',
            height: 30,
            width: 50,
            textAlign: 'center',
            //backgroundColor: 'white'
        };
    },
    handleClick: function(){
        this.setState({
//            backgroundColor: (this.state.backgroundColor=='white') ? '#42ebf4': 'white'
            backgroundColor: (this.state.backgroundColor=='#FFB100') ? '#00bcec' : '#FFB100'
        });
    },
    render: function(){
        return(
            <td onClick={()=>this.handleClick()} style = {this.state}>
             {this.props.time}
            </td>
        );
    }
});

var WeekTable = React.createClass({
    render: function(){
        return(
            <div>
                <table>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                    <tr id="time">
                        <DaySelectTableData time="8am"/>
                        <DaySelectTableData time="8am"/>
                        <DaySelectTableData time="8am"/>
                        <DaySelectTableData time="8am"/>
                        <DaySelectTableData time="8am"/>
                        <DaySelectTableData time="8am"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="9am"/>
                        <DaySelectTableData time="9am"/>
                        <DaySelectTableData time="9am"/>
                        <DaySelectTableData time="9am"/>
                        <DaySelectTableData time="9am"/>
                        <DaySelectTableData time="9am"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="10am"/>
                        <DaySelectTableData time="10am"/>
                        <DaySelectTableData time="10am"/>
                        <DaySelectTableData time="10am"/>
                        <DaySelectTableData time="10am"/>
                        <DaySelectTableData time="10am"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="11am"/>
                        <DaySelectTableData time="11am"/>
                        <DaySelectTableData time="11am"/>
                        <DaySelectTableData time="11am"/>
                        <DaySelectTableData time="11am"/>
                        <DaySelectTableData time="11am"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="12pm"/>
                        <DaySelectTableData time="12pm"/>
                        <DaySelectTableData time="12pm"/>
                        <DaySelectTableData time="12pm"/>
                        <DaySelectTableData time="12pm"/>
                        <DaySelectTableData time="12pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="1pm"/>
                        <DaySelectTableData time="1pm"/>
                        <DaySelectTableData time="1pm"/>
                        <DaySelectTableData time="1pm"/>
                        <DaySelectTableData time="1pm"/>
                        <DaySelectTableData time="1pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="2pm"/>
                        <DaySelectTableData time="2pm"/>
                        <DaySelectTableData time="2pm"/>
                        <DaySelectTableData time="2pm"/>
                        <DaySelectTableData time="2pm"/>
                        <DaySelectTableData time="2pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="3pm"/>
                        <DaySelectTableData time="3pm"/>
                        <DaySelectTableData time="3pm"/>
                        <DaySelectTableData time="3pm"/>
                        <DaySelectTableData time="3pm"/>
                        <DaySelectTableData time="3pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="4pm"/>
                        <DaySelectTableData time="4pm"/>
                        <DaySelectTableData time="4pm"/>
                        <DaySelectTableData time="4pm"/>
                        <DaySelectTableData time="4pm"/>
                        <DaySelectTableData time="4pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="5pm"/>
                        <DaySelectTableData time="5pm"/>
                        <DaySelectTableData time="5pm"/>
                        <DaySelectTableData time="5pm"/>
                        <DaySelectTableData time="5pm"/>
                        <DaySelectTableData time="5pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="6pm"/>
                        <DaySelectTableData time="6pm"/>
                        <DaySelectTableData time="6pm"/>
                        <DaySelectTableData time="6pm"/>
                        <DaySelectTableData time="6pm"/>
                        <DaySelectTableData time="6pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="7pm"/>
                        <DaySelectTableData time="7pm"/>
                        <DaySelectTableData time="7pm"/>
                        <DaySelectTableData time="7pm"/>
                        <DaySelectTableData time="7pm"/>
                        <DaySelectTableData time="7pm"/>
                    </tr>
            <tr id="time">
                        <DaySelectTableData time="8pm"/>
                        <DaySelectTableData time="8pm"/>
                        <DaySelectTableData time="8pm"/>
                        <DaySelectTableData time="8pm"/>
                        <DaySelectTableData time="8pm"/>
                        <DaySelectTableData time="8pm"/>
                    </tr>
                </table>
            </div>
        );
    }
});

var ScheduleBox = React.createClass({
    render: function(){
        return(
            <div id="scheduleArea">
                <h3>Scheduler Area</h3>
                <HourCapacityArea/>
                <WeekTable/>
            </div>
        );
    }
});
var LAForm = React.createClass({
    render: function(){
        return (
                <div id="container" class="LAForm">
                    <h1>Work Schedule Submission</h1>
                    <UserInfoBox/>
                    <ScheduleBox/>
                    <button id="button">Submit</button>
                </div>
               );
    }
});
ReactDOM.render(
    <LAForm/>,
    document.getElementById('container')
);
