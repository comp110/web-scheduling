import React from 'react'
import NavLink from './NavLink'

//var divStyle = {
//    backgroundColor: "#00bcec"
//};

var Login = React.createClass({
    getInitialState: function(){
        return {Onyen: '', Password:''};
    },
    handleClick: function(){
        alert("Logged In As ".concat(this.state.Onyen).concat(" ").concat(this.state.Password));
    },
    handleOnyenChange: function(e){
        this.setState({Onyen:e.target.value});
    },
    handlePasswordChange: function(e){
        this.setState({Password:e.target.value});
    },
    render: function(){
        return (
//            <div style = {divStyle}>
            <div>
                <h2>Login</h2>
                Onyen<input value={this.state.Onyen} onChange={this.handleOnyenChange}></input><br/>
                Password<input value={this.state.Password} onChange={this.handlePasswordChange}></input><br/>
                <button id= "button" onClick={this.handleClick}>Log In</button>
            </div>
        );
    }
});

module.exports = Login;
