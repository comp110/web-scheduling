var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
 var objectAssign = require("object-assign");
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    user: {}
};

var setUser = function(user){
    _store.user = user;
};

var userStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT,cb);
    },
    getUser: function(){
        return _store.user;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.ADD_USER:
            setUser(action.data)
            userStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = userStore;