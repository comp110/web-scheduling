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
    render: function(){
        console.log("Rendering");
        return(
            <div>
            </div>
        );
    }
});

module.exports = ScheduleMaker;