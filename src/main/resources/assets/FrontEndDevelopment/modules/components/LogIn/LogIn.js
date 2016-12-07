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