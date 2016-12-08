var React = require('react');
var createStore = require('../../stores/createStore');
var createActions = require('../../actions/createActions');

var LACreator = React.createClass({
    getInitialState: function(){
        return {LAs: createStore.getLAs()};
    },
    componentDidMount: function(){
        createStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        createStore.removeChangeListener(this._onChange);
    },
    handleUserCreation: function(e){
        var LA = {
            name: this.refs.username.value,
            password: this.refs.password.value,
            role: this.refs.role.value
            
        };
        
        var jsonLA = JSON.stringify(LA);
        console.log(jsonLA);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        };
        xhttp.open("POST", "/api/userDatabase", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(jsonLA);
        
        createActions.addLA(LA);
        this._onChange();
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.refs.role.value='';
    },
    _onChange: function(){
        this.setState({
            LAs: createStore.getLAs()
        })
    },
    render: function(){
        return(
            <div className="container" style={{
                         backgroundColor: '#3f4144'
                    }}>
               <form className="form-signin">
                    <h2 className="form-signin-heading" style={{color:"white"}}>Create LA</h2>           
                <label className="sr-only">Username</label>
                <input  className="form-control" placeholder="Username" ref="username" type="text" autoFocus={true}/>       
               <label  className="sr-only">Password</label>
                <input style={{margin:0}} ref="password" type="password" className="form-control" placeholder="Password" required={true}/>          
                 <label  className="sr-only">Password</label>
                <input style={{margin:0}} ref="role" type="text" className="form-control" placeholder="Role" required={true}/>         
               <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleUserCreation}>Submit</button>
               </form>
            </div>
        );
    }
});

module.exports = LACreator;