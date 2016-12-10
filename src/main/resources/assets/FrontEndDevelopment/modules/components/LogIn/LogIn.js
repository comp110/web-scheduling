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

        var basicAuthHash = btoa(user.username + ":" + user.password);
        document.cookie = "auth=" + basicAuthHash;

        // Remove authorization classes
        $('body').removeClass('authorized-la authorized-admin');

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            headers: {
                "Authorization": "BasicNoAuthPrompt " + basicAuthHash
            },
            type: 'GET',
            url: '/api/protected',
            dataType: 'text',
            success: function(response) {
                // Go back to calendar view
                window.location = '/#/';

                // Display appropriate page elements
                getLoggedInUserProfile(function(profile) {
                    var admin = profile.role == 'admin';
                    $('body').addClass('authorized-la');
                    if (admin) $('body').addClass('authorized-admin');
                });
            },
            error: function(response) {
                alert('Invalid username/password!');
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
               </div>);
   }
});

module.exports = LogIn;