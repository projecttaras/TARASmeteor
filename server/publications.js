Meteor.publish("getAccidentMap",function(){
	if(this.userId)
	{
	    user=Meteor.users.findOne({_id:this.userId});
	    // console.log(user);
	    if(user.orgId){
		    orgId=user.orgId;
		    // console.log(orgId);
		    if(user.roles[0] == 'Hospital')
		      return AccidentMap.find({'HospitalId':user.orgId});
		    else
		      return AccidentMap.find({'PoliceId':user.orgId});
	}
   }
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

Meteor.publish("userProfile",function(){
	userprofile=UserProfile.find({UserId: this.userId});
	if(userprofile.count())
		return userprofile;
	else{
		console.log("Empty user profile list");
		return;
	}
})