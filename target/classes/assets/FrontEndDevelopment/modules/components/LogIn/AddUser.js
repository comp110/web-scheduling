var React = require('react');

var AddUser = React.createClass({
    handleLogIn: function(e){
        var user = {
            username: this.refs.username.value,
            password: this.refs.password.value
            
        };
        this.props.setUser(user);
        this.refs.username.value = '';
        this.refs.password.value = '';
    },
    render: function(){
        return(<div>
                UserName: <br></br>
               <input type="text" ref="username" placeholder="John Doe"/>
               <br></br>
               Password: <br></br>
               <input type="text" ref="password" placeholder="********"/>
               <br></br>
               <button onClick={this.handleLogIn}>Submit</button>
              </div>);
    }
});
        
module.exports= AddUser;