Meteor.subscribe('getAccidentMap');
Meteor.subscribe('getAccidents');
Meteor.subscribe('getHospitals');
Meteor.subscribe('getPoliceStations');

// if(Roles.userIsInRole(Meteor.userId(),['admin','Hospital','Police']))
// {
// 	console.log("Role");
// 	Meteor.subscribe('getUsers');
// }

if(Roles.userIsInRole(Meteor.userId(),['Normal']))
{
	console.log("User logged in.");
	Meteor.subscribe('userProfile');
}
