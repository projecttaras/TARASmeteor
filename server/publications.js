Meteor.publish("getAccidentMap",function(){
    user=Meteor.users.findOne({_id:this.userId});
    // console.log(user);
    orgId=user.orgId;
    // console.log(orgId);
    if(user.roles[0] == 'Hospital')
      return AccidentMap.find({'HospitalId':user.orgId});
    else
      return AccidentMap.find({'PoliceId':user.orgId});
});

Meteor.publish("getAccidents",function(){
	return Accidents.find({});
});

Meteor.publish("getHospitals",function(){
	return Hospitals.find({});
});

Meteor.publish("getPoliceStations",function(){
	return PoliceStation.find({});
});

Meteor.publish("getUsers",function(){
	return Meteor.users.find({});
});