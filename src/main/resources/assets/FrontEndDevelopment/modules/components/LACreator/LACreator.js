var React = require('react');
var createStore = require('../../stores/createStore');
var createActions = require('../../actions/createActions');

var LACreator = React.createClass({
    getInitialState: function(){
        return {
            LAs: createStore.getLAs(),
            role:  "lA",
            gender: "female",
            experience: 2,
            hoursCapacity: 1
        };
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
            role: this.refs.role.value,
            gender: this.refs.gender.value,
            experience: this.refs.experience.value,
            hoursCapacity: this.refs.hoursCapacity.value
        };

        var jsonLA = JSON.stringify(LA);
        var basicAuthHash = getBasicAuthHash();
        console.log("JSON for post",jsonLA);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        };
        xhttp.open("POST", "/api/userDatabase", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization", "BasicNoAuthPrompt " + basicAuthHash);
        xhttp.send(jsonLA);

        createActions.addLA(LA);

        if(this.refs.username.value!='' && this.refs.password.value!='' && this.refs.role.value!='')
            this.setState({created:true});
        else
            this.setState({created:false});
        
        this.refs.username.value='';
        this.refs.password.value='';
        console.log("State",this.state);
    },
    handleChange: function(event){
        this.setState({role: this.refs.role.value});
        this.setState({gender: this.refs.gender.value});
        this.setState({experience: this.refs.experience.value});
        this.setState({hoursCapacity: this.refs.hoursCapacity.value});
        
    },
    _onChange: function(){
        this.setState({
            LAs: createStore.getLAs()
        })
    },
    render: function(){
        if(this.state.created){
            return(
                <div className="container" style={{
                             backgroundColor: '#3f4144'
                        }}>
                   <form className="form-signin">
                        <h2 className="form-signin-heading" style={{color:"white"}}>Create LA</h2>
                    <label className="sr-only">Username</label>
                    <input  className="form-control" placeholder="Username" ref="username" type="text" autoFocus={true}/>
                    <label  className="sr-only">Password</label>
                    <input style={{margin:0}} ref="password" type="password" className="form-control" placeholder="Password"/>
                    <label  className="sr-only">Role</label>
                    <select  ref="role" style={{height: 40}} value={this.state.role} onChange={this.handleChange} className="form-control">
                        <option value="admin">admin</option>
                        <option value="la">la</option>
                    </select>
                    <select  ref="gender" style={{height: 40}} value={this.state.gender} onChange={this.handleChange} className="form-control">
                        <option value="female">female</option>
                        <option value="non female">non female</option>
                    </select>
                    <select  ref="experience" style={{height: 40}} onChange={this.handleChange} value={this.state.experience} className="form-control">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <select  ref="hoursCapacity" style={{height: 40}} onChange={this.handleChange} value={this.state.hoursCapacity} className="form-control">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>

                   <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleUserCreation}>Submit</button>
                    <div style={{color:"white"}}>An LA has been created</div>
                   </form>

                </div>
            );
        }else{
            return(
                <div className="container" style={{
                             backgroundColor: '#3f4144'
                        }}>
                   <form className="form-signin">
                        <h2 className="form-signin-heading" style={{color:"white"}}>Create LA</h2>
                        <label className="sr-only">Username</label>
                        <input  className="form-control" placeholder="Username" ref="username" type="text" autoFocus={true}/>
                        <label  className="sr-only">Password</label>
                        <input style={{margin:0}} ref="password" type="password" className="form-control" placeholder="Password"/>
                        <label  className="sr-only">Role</label>
                        <select  ref="role" style={{height: 40}} value={this.state.role} onChange={this.handleRoleChange} className="form-control">
                            <option value="ADMIN">ADMIN</option>
                            <option value="LA">LA</option>
                        </select>
                        <select  ref="gender" style={{height: 40}} value={this.state.gender} className="form-control">
                            <option value="female">female</option>
                            <option value="non female">non female</option>
                        </select>
                        <select  ref="experience" style={{height: 40}} value={this.state.experience} className="form-control">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <select  ref="hoursCapacity" style={{height: 40}} value={this.state.hoursCapacity} className="form-control">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>

                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleUserCreation}>Submit</button>
                   </form>
                </div>
            );
        }


    }
});

module.exports = LACreator;