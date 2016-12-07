var React = require('react');
var AddUser = require('./AddUser.js');
var userStore = require('../../stores/userStore');
var userActions = require('../../actions/userActions');

var LogIn = React.createClass({
    getInitialState: function(){
        return {user: userStore.getUser()};
    },
    componentDidMount: function(){
        userStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        userStore.removeChangeListener(this._onChange);
    },
    handleSetUser: function(user){
//        userActions.setUser(user);
//        console.log(this.state.user);
//        this.forceUpdate();
        alert(user.username);
//        var username ="ervin";
//	    var password = "123";

//        var date = "11-13-2016";
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            headers: {
        "Authorization": "Basic " + btoa(user.username + ":" + user.password)
      },
            type: 'GET',
            url: '/api/protected',
            dataType: 'text',
            success: function(response) {
                alert(response);
               
            }
        });
        
    },
    _onChange: function(){
        this.setState({
            user: userStore.getUser()
        })
    },
    test: function(){
        console.log(this.state.user)
//        var xhttp = new XMLHttpRequest();
//        xhttp.onreadystatechange = function() {
//            if (xhr.readyState == XMLHttpRequest.DONE) {
//                alert(xhr.responseText);
//            }
//        };
//        xhttp.setRequestHeader ("Authorization", "Basic " + btoa(this.state.user + ":" + password));
         
    },
    render: function(){
       return (<div>
                <AddUser setUser={this.handleSetUser}/>
               </div>);
   } 
});

module.exports = LogIn;