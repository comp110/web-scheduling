import React from 'react'

var ScheduleMaker = React.createClass({
    componentWillMount: function(){
        var calendar = document.getElementById('wrapper');
        calendar.style.visibility = 'visible';
        calendar.setAttribute( 'style','visibility: visible');
        console.log("Mounting: " +calendar.style.visibility);  
    },
    componentWillUnmount: function(){
        var calendar = document.getElementById('wrapper');
        calendar.style.visibility = 'hidden';
        calendar.setAttribute( 'style','visibility: hidden');
        console.log("Unmounting: " +calendar.style.visibility);   
    },
    handleClick: function(){
        alert("The Schedule is being made")
    },
    render: function(){
        console.log("Rendering");
        return(
            <div>
                <h2>New Schedule Maker</h2>
                <button id= "button" onClick={this.handleClick}>Make Schedule</button>
            </div>
        );
    }
});

module.exports = ScheduleMaker;