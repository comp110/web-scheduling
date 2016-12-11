import React from 'react'

var ScheduleMaker = React.createClass({
    componentWillMount: function(){
        var calendar = document.getElementById('wrapper');
        calendar.setAttribute( 'style','display: block');
    },
    componentWillUnmount: function(){
        var calendar = document.getElementById('wrapper');
        calendar.setAttribute( 'style','display: none');
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