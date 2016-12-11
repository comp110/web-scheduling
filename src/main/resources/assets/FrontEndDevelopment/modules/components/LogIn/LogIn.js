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
        userActions.setUser(user);

        // Remove authorization classes
        $('body').removeClass('authorized-la authorized-admin');

        var basicAuthHash = btoa(user.username + ":" + user.password);

        $.ajax({
            headers: {
                "Authorization": "BasicNoAuthPrompt " + basicAuthHash
            },
            type: 'GET',
            url: '/api/protected',
            dataType: 'text',
            success: function(response) {
                // Go back to calendar view
                window.location = '/#/';

                // Set logged in hash
                document.cookie = "auth=" + basicAuthHash;

                // Display appropriate page elements
                getLoggedInUserProfile(function(profile) {
                    updateElementsByUserRole(profile.role);
                });
            },
            error: function(response) {
                    // Get the snackbar DIV
                    var x = document.getElementById("snackbar")

                    // Add the "show" class to DIV
                    x.className = "show";

                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
    },
    render: function(){
       return (<div>
                    <div className="container" style={{
                         backgroundColor: '#3f4144'
                    }}>
                        <AddUser setUser={this.handleSetUser}/>
                    </div>
                    <div id="snackbar">Invalid Username/Password!</div>
               </div>);
   }
});

module.exports = LogIn;