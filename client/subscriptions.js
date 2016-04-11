Meteor.subscribe('getAccidentMap');
Meteor.subscribe('getAccidents');
Meteor.subscribe('getHospitals');
Meteor.subscribe('getPoliceStations');
Meteor.subscribe('userProfile');
if(Roles.userIsInRole(Meteor.userId(),['admin','Hospital','Police']))
{
	console.log("Role");
	Meteor.subscribe('getUsers');
}

