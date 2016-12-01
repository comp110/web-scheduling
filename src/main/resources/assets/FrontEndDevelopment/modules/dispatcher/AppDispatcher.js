var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();


//ToDoList Actions
AppDispatcher.handleAction = function(action){
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

//User Actions
AppDispatcher.userAction = function(action){
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

module.exports = AppDispatcher;