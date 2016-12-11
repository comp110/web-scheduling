var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var objectAssign = require("object-assign");
var EventEmitter = require('events').EventEmitter;
var userStore = require('./userStore.js');

var CHANGE_EVENT = 'change';



var initializeWorkHours = function(){
    var work_hours =new Array(23);
    for(var i=0; i<23; i++){
        work_hours[i] = new Array(6);
        work_hours[i][0]={"day": "Sun", "isAvailable": false};
        work_hours[i][1]={"day": "Mon", "isAvailable": false};
        work_hours[i][2]={"day": "Tue", "isAvailable": false};
        work_hours[i][3]={"day": "Wed", "isAvailable": false};
        work_hours[i][4]={"day": "Thu", "isAvailable": false};
        work_hours[i][5]={"day": "Fri", "isAvailable": false};

    }
    return work_hours;
};

var setWorkHour= function(hour,day){
    _store.work_hours[hour][day].isAvailable = (checkAvailability(hour,day))? false: true;
};

var checkAvailability = function(hour,day){
    return _store.work_hours[hour][day].isAvailable;
};

var getDay = function(hour,day){
    return _store.work_hours[hour][day].day;
};

var createWorkableShifts = function(){
    //_store.profile= userStore.getUserProfile();
    updateStore();
    var weekStartDate = getNextSundayDate().toLocaleDateString();
    var start_time = -1;
    var end_time=0;
    var workable_shifts = [];
    for(var j=0; j<6; j++){
        start_time=-1;
        end_time=0;
        for(var i = 0; i<23; i++){
            if(start_time==-1 && checkAvailability(i,j)==true){
                start_time=i;
            } else if(start_time!=-1 && (checkAvailability(i,j)==true && checkAvailability(i+1,j)==false)){
                end_time=i+1;
                workable_shifts.push({
                    "name": _store.profile.name,
                    "gender": _store.profile.gender,
                    "experienceLevel": _store.profile.experienceLevel,
                    "hoursCapacity": _store.profile.hoursCapacity,
                    "weekStartDate": weekStartDate,
                    "day":getDay(i,j),
                    "start":start_time,
                    "end": end_time
                });
                start_time=-1;
                end_time=0;
            } else if(start_time!=-1 && (checkAvailability(i,j)==false && checkAvailability(i-1,j)==true)){
                end_time=i;
                workable_shifts.push({
                    "name": _store.profile.name,
                    "gender": _store.profile.gender,
                    "experienceLevel": _store.profile.experienceLevel,
                    "hoursCapacity": _store.profile.hoursCapacity,
                    "weekStartDate": weekStartDate,
                    "day":getDay(i,j),
                    "start":start_time,
                    "end": end_time
                });
                start_time=-1;
                end_time=0;
            }
        }
    }
    return workable_shifts;
};

var _store = {
    work_hours: initializeWorkHours(),
    profile: userStore.getUserProfile()
};

$(document).on('loadHours', function() {
    // Set work hours based on hours in database
    GET('/api/hoursetter', function(data) {
        getLoggedInUserProfile(function(profile) {
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
            for (var i = 0; i < data.length; i++) {
                var shift = data[i];
                if (profile.name != shift.name) continue;
                var day = days.indexOf(shift.day);
                for (var hour = shift.start; hour < shift.end; hour++) {
                    _store.work_hours[hour][day].isAvailable = true;
                }
            }
            workhoursStore.emit(CHANGE_EVENT);
        });
    }, {error: null});
});

$(document).on('reset', function() {
    _store.work_hours = initializeWorkHours();
});

function updateStore(){
    _store.profile = userStore.getUserProfile();
};

var workhoursStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT,cb);
    },
    getWorkHours: function(){
        return _store.work_hours;
    },
    getWorkableShifts: function(){
        var shifts = createWorkableShifts();
        console.log(_store.profile);
        return shifts;
    },
    checkAvailability: checkAvailability
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.ADD_WORK_HOURS:
            setWorkHour(action.data.hour, action.data.day);
            workhoursStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = workhoursStore;