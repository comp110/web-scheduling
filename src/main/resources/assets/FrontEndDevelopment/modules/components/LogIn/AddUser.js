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
        return(
            <div>
               <form className="form-signin">
                    <h2 className="form-signin-heading" style={{color:"white"}}>Please sign in</h2>
                <label className="sr-only">Username</label>
                <input  className="form-control" placeholder="Username" ref="username" type="text" autoFocus={true}/>
               <label  className="sr-only">Password</label>
                <input ref="password" type="password" className="form-control" placeholder="Password" required={true}/>
               <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleLogIn}>Submit</button>
               </form>
            </div>
        );
    }
});
        
module.exports= AddUser;