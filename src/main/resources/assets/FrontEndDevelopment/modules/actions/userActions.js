var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var userActions = {
    setUser: function(user){
        AppDispatcher.userAction({
            actionType: appConstants.ADD_USER,
            data: user
        });
    }
};

module.exports = userActions;