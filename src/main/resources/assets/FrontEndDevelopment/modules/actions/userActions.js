var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var userActions = {
    setUser: function(user){
        AppDispatcher.userAction({
            actionType: appConstants.ADD_USER,
            data: user
        });
    },
    setProfile: function(profile){
        AppDispatcher.profileAction({
            actionType: appConstants.ADD_PROFILE,
            data: profile
        });
    }
};

module.exports = userActions;