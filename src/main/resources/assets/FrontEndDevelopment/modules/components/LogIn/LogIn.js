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

        console.log("Loggin in as " + user.username + "; hash= " + basicAuthHash);

        // Override authorization in 3rd parameter
        GET('/api/protected', function() {
            // Go back to calendar view
            window.location = '/#/';

            // Set logged in hash
            document.cookie = "auth=" + basicAuthHash;

            // Load weeksetter/hoursetter
            $(document).trigger('loadHours');

            // Display appropriate page elements
            getLoggedInUserProfile(function(profile) {
                $('#username').text("Good to see you " +profile.name);
                $('#username').css("visibility", "visible");
                updateElementsByUserRole(profile.role);
            });
        }, {auth: basicAuthHash}); // Auth override

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