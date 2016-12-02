import React from 'react'

var ScheduleMaker = React.createClass({
    handleClick: function(){
        alert("The Schedule is being made")
    },
    render: function(){
        var calendar = document.getElementById('wrapper');
        if((typeof calendar.style.visibility === undefined)){
            calendar.style.visibility = 'hidden';
            calendar.setAttribute( 'style','visibility: hidden');
        } else if (calendar.style.visibility === 'visible'){
            calendar.style.visibility = 'hidden';
            calendar.setAttribute( 'style','visibility: hidden');
        } else {
            calendar.style.visibility = 'visible';
            calendar.setAttribute( 'style','visibility: visible');
        }
        console.log(calendar.style.visibility);
        
        return(
            <div>
                <h2>Schedule Maker</h2>
                <button id= "button" onClick={this.handleClick}>Make Schedule</button>
            </div>
        );
    }
});

module.exports = ScheduleMaker;