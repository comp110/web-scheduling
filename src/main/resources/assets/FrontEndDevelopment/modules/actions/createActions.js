var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var createActions = {
    addLA: function(LA){
        AppDispatcher.laAction({
            actionType: appConstants.CREATE_LA,
            data: LA
        });
    }
};

module.exports = createActions;