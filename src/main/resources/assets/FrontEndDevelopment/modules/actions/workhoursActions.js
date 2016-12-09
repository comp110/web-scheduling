var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var workhoursActions = {
    setWorkHour: function(data){
        AppDispatcher.workhoursAction({
            actionType: appConstants.ADD_WORK_HOURS,
            data: data
        });
    }
};

module.exports = workhoursActions;