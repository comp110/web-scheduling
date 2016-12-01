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
    },
    _onChange: function(){
        this.setState({
            user: userStore.getUser()
        })
    },
    test: function(){
        console.log(this.state.user);
    },
    render: function(){
       return (<div>
                <AddUser setUser={this.handleSetUser}/>
                <button onClick={this.test}>Test</button>
               </div>);
   } 
});

module.exports = LogIn;