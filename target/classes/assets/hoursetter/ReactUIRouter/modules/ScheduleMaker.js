import React from 'react'

var ScheduleMaker = React.createClass({
    handleClick: function(){
        alert("The Schedule is being made")
    },
    render: function(){
        return(
            <div>
                <h2>Schedule Maker</h2>
                <button id= "button" onClick={this.handleClick}>Make Schedule</button>
            </div>
        );
    }
});

module.exports = ScheduleMaker;