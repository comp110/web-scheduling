var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
 var objectAssign = require("object-assign");
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    la: []
};

var addLA = function(la){
  _store.la.push(la);
};

var createStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT,cb);
    },
    getLAs: function(){
        return _store.la;
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.CREATE_LA:
            addLA(action.data);
            createStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = createStore;