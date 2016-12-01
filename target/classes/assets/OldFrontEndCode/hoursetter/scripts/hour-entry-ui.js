var workableHours =
    {
	"name":"COMP 110 LA",
	"gender": "male",
	"experience_level": 3,
	"hours_capacity": 4,
	"week_start_date":"11/13/2016",
	"day":"Mon",
	"start":11,
	"end":13};

var Profile = {
    "name":"COMP 110 LA",
	"gender": "male",
	"experience_level": 3,
	"hours_capacity": 4,
	"week_start_date":"11/6/2016",
};

var Profile = React.createClass({
    getInitialState : function() {
        return {
    "name":"COMP 110 LA",
	"gender": "male",
	"experience_level": 3,
	"hours_capacity": 4,
	"week_start_date":"11/6/2016",
        };
    },

    render: function(){
        return (
            <div id = "profile">
                Name: {this.state.name} <br/>
                Gender: {this.state.gender} <br/>
                Experience: {this.state.experience_level} <br/>
                Hours Capacity: {this.state.hours_capacity}
            </div>
        );
    }
});

var HourSelectTableData = React.createClass({
    getInitialState: function(){
        return {
            id: 0,
            borderStyle: 'solid',
            height: 30,
            width: 50,
            textAlign: 'center'
        };
    },
    handleClick: function(day, time){
        this.setState({
            backgroundColor: (this.state.backgroundColor=='#FFB100') ? '#00bcec' : '#FFB100'
        });
        this.props.handleClick(day, time);
    },
    render: function(){
        return(
             <td onClick={()=>this.handleClick(this.props.day, this.props.time)} style = {this.state}>
             {this.props.time}
            </td>
        );
    }
});

//This:
//<td onClick={()=>this.props.handleClick(this.state.id)} style = {this.state}>
//is just syntactic sugar for this:
//<td onClick={this.props.handleClick.bind(this,this.state.id)} style = {this.state}>

var TimeRow = React.createClass({
    render: function(){
        return(
            <tr>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Sun" time={this.props.time}/>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Mon" time={this.props.time}/>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Tue" time={this.props.time}/>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Wed" time={this.props.time}/>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Thu" time={this.props.time}/>
                <HourSelectTableData handleClick={this.props.handleClick} day = "Fri" time={this.props.time}/>
            </tr>
        );
    }
});
var calendarHours =
        {"Sun":{"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false},
            "Mon": {"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false},
            "Tue": {"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false},
            "Wed": {"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false},
        "Thu": {"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false},
        "Fri": {"_8am": false, "_9am": false, "_10am": false, "_11am": false, "_12pm": false, "_1pm":false,
              "_2pm": false, "_3pm": false, "_4pm": false, "_5pm": false, "_6pm":false, "_7pm":false,"_8pm":false}};

var HourSelectTable = React.createClass({
    getInitialState: function(){
        return {
            calendarHours
        };
    },
    handleTDClick: function(day, time){
            this.state.calendarHours[day.toString()]["_"+time.toString()]  =
                (this.state.calendarHours[day.toString()]["_"+time.toString()])? false: true;
            this.forceUpdate();
            //alert(this.state.calendarHours[day.toString()]["_"+time.toString()]);
    },
    clickHelper: function(i,day){
        if(i<12){
            return this.state.calendarHours[day.toString()]["_"+i.toString()+"am"];
//                     //alert(day.toString() + ": " + this.state.calendarHours[day.toString()]["_"+i.toString()+"am"]
//                          + " Hour: " + i +"am");
                } else if(i==12){
                    return this.state.calendarHours[day.toString()]["_"+(i).toString()+"pm"];
//                    //alert(day.toString() + ": " + this.state.calendarHours[day.toString()]["_"+(i).toString()+"pm"]
//                          + " Hour: " + (i)+"pm" );
                }else if(i<21){
                    return this.state.calendarHours[day.toString()]["_"+(i-12).toString()+"pm"];
//                    //alert(day.toString() + ": " + this.state.calendarHours[day.toString()]["_"+(i-12).toString()+"pm"]
//                          + " Hour: " + (i-12)+"pm" );
                }
    },
    handleClick : function(){
        var shifts=[];
        var _start, _past, _end;
        for(var day in this.state.calendarHours){
            for(var i= 8; i<22;i++){
                if(i<21){
                    if(this.clickHelper(i,day)){
                        if(!this.clickHelper((i-1),day)){
                            _start=i;
                            //alert("I am the alpha: " + _start);
                        }
                        if(!this.clickHelper(i+1,day)){
                            _end = ++i;
                            //alert("I am the omega: " + _end);
                            shifts.push({
                                //id: workableHours.id,
                                name: workableHours.name,
                                gender: workableHours.gender,
                                experienceLevel: workableHours.experience_level,
                                hoursCapacity: workableHours.hours_capacity,
                                weekStartDate: workableHours.week_start_date,
                                day: day.toString(),
                                start:_start,
                                end:_end
                            });
                        }

                    }
                }
            }
        }
        console.log(shifts);
        $.ajax({
        	headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json'
        	},
        	type: 'POST',
        	url: '/api/hoursetter',
        	data: JSON.stringify(shifts),
        	dataType: 'json',
        	success: function() {
        		alert('Success');
        	}
        });
        //alert("The day is: " + shifts[0].day);
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
                    <TimeRow handleClick={this.handleTDClick} time="8am"/>
                    <TimeRow handleClick={this.handleTDClick} time="9am"/>
                    <TimeRow handleClick={this.handleTDClick} time="10am"/>
                    <TimeRow handleClick={this.handleTDClick} time="11am"/>
                    <TimeRow handleClick={this.handleTDClick} time="12pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="1pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="2pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="3pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="4pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="5pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="6pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="7pm"/>
                    <TimeRow handleClick={this.handleTDClick} time="8pm"/>
                </table>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return(
            <div>
                <Profile/>
                <HourSelectTable/>
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('container'));
